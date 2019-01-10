const data = [{
  title: "Chiacchere da bar",
  place: "Via baltea 3, Torino",
  date: "2019-01-27T19:00",
  content: "Un incontro conviviale per discutere liberamente sui diversi modi di abitare in città, come consumare meno energia, tempo libero e lavoro.",
  tags: ["Cohousing", "Chiacchere"]
},
{
  title: "Cohousing \"Spazio Verde\"",
  place: "Via baltea 3, Torino",
  date: "2019-02-04T18:30",
  content: "Vieni a scoprire il nostro nuovissimo progetto di cohousing nella zona di Moncalieri.",
  tags: ["Cohousing", "Presentazioni"]
},
{
  title: "Vivere in modo differente",
  place: "Via baltea 3, Torino",
  date: "2019-02-07T14:30",
  content: "Sostenibilità, qualità della vita e banca del tempo, confrontiamoci insieme.",
  tags: ["Sostenibilità", "Presentazioni"]
},
{
  title: "Raduno invernale RIVE",
  place: "Comune di Vidracco",
  date: "2019-02-20T10:30",
  content: "Conoscere, confrontare e trovare ispirazione tra chi ha scelto uno stile di vita ecologico.",
  tags: ["Cohousing", "Raduni"]
},
 {
   title: "Festa dei vicini",
   place: "Piazza della Repubblica, Torino",
   date: "2019-03-06T19:30",
   content: "Ceniamo insieme? Vieni a mangiare con i tuoi amici e vicini di casa di Porta Palazzo.",
   tags: ["Festa"]
}];

let filter = { tags: [], date: [] };

const printMainArticle = (item, element) => {
  const date = new Date(item.date)
  const code = `
  <div class="col-2 d-flex flex-column justify-content-center">
      <div class="cal">
        <div class="header-cal d-flex align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {month: 'short'}).format(date)}</span></div>
        <div class="corpo-cal d-flex flex-column align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {day: 'numeric'}).format(date)}</span>
        <span>${new Intl.DateTimeFormat('it-IT', {weekday: 'long'}).format(date)}</span></div>
      </div>
      <span class="text-center ora">${new Intl.DateTimeFormat('it-IT', {hour: '2-digit', minute: '2-digit'}).format(date)}</span>
    </div>
    <div class="col-10">
      <a href="#"><h2>${item.title}</h2></a>
      <h3>${item.place}</h3>
      <p>${item.content}</p>
      <div class="tag-list">${item.tags.map(printTagArticle).join('')}</div>
    </div>
  </div>`
  element.innerHTML= code;
}

const printListHTML = (list, element) => {
  const articles = list.map((item) => {
  const date = new Date(item.date)
   return `
   <div class="d-flex align-items-center m-top-l">
     <div class="col-2 d-flex flex-column justify-content-center">
       <div class="cal">
         <div class="header-cal d-flex align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {month: 'short'}).format(date)}</span></div>
         <div class="corpo-cal d-flex flex-column align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {day: 'numeric'}).format(date)}</span>
         <span>${new Intl.DateTimeFormat('it-IT', {weekday: 'long'}).format(date)}</span></div>
       </div>
       <span class="text-center ora">${new Intl.DateTimeFormat('it-IT', {hour: '2-digit', minute: '2-digit'}).format(date)}</span>
     </div>
     <div class="col-10">
       <a href="#"><h2>${item.title}</h2></a>
       <h3>${item.place}</h3>
       <p>${item.content}</p>
       <div class="tag-list">${item.tags.map(printTagArticle).join('')}</div>
     </div>
   </div>`
  });

  element.insertAdjacentHTML('beforeend', articles.join(''));
}

const printTagArticle = (tag) => {
  return `
    <span class="tag">
      <a href="#">${tag}</a>
    </span>`
}
const printTagItem = (tag) => {
 return `
  <span class="tag">
    <a href="javascript:;" onClick="toggleTagOnFilter('${tag}', this)">${tag}</a>
  </span>`
}

const filterList = (list, filters) => {
  const [startDate, endDate] = filters.date;
  const matchesFilterDates = (date) => startDate && endDate ? moment(date).isBetween(startDate, endDate) : true
  const matchesFilterTags =(item) => item.tags.some(articleTag => filters.tags.includes(articleTag))

  return list.filter(item => matchesFilterTags(item)  && matchesFilterDates(item.date))
}

const printTagList = (list, element) => {
  const allTags = list.reduce((acc, item) => acc = acc.concat(item.tags), []);
  allTags.push("Workshop", "Progetti");
  const allUniqueTags = allTags.filter((value, index, all) => all.indexOf(value) === index);

  element.innerHTML = `
  ${allUniqueTags.map(printTagItem).join('')}`;
}

const toggleTagOnFilter = (tag, element) => {
  const parent = element.parentElement;

  if (filter.tags.includes(tag)) {
    filter.tags = filter.tags.filter(item => item !== tag)
    parent.classList.remove('active');
  } else {
    filter.tags.push(tag);
    parent.classList.add('active');
  }
}

const articlesContainer = document.getElementById('eventi');
const mainArticleContainer = document.getElementById('evento-contenuto');
const tagFilterContainer = document.getElementById('tag-filter');
const filterButton = document.getElementById('filter');
const filterCancelButton = document.getElementById('filter-cancel');
const eventsListContainer = document.getElementById('lista-eventi');

const [head, ...rest] = data;
printMainArticle(head, mainArticleContainer);
printListHTML(rest, articlesContainer);
printTagList(data, tagFilterContainer);

filterButton.addEventListener('click', () => {
  const { startDate, endDate } = eventCalendar.state;

  filter.date = [startDate, endDate];
  const filteredList = filterList(data, filter);
  eventsListContainer.innerHTML=`
  <h1>Eventi filtrati</h1>`;
  printListHTML(filteredList, eventsListContainer);
});

filterCancelButton.addEventListener('click', () => {
  filter = {tags: [], date: [] };
  eventsListContainer.innerHTML=`
  <div id="prossimo-evento p-top-l">
    <h1>Il prossimo evento</h1>
    <p class="m-top-s">I nostri incontri sono un momento di confronto, ascolto e discussione su tematiche
      e proposte di Cohousing.</p>
    <p>Sia che tu voglia proporre uno spazio, un’idea o semplicemente informarti
      sull’argomento, sei il benvenuto!</p>
    <p>Non perderti il nostro prossimo incontro, sarà l’occasione giusta anche per
      conoscersi! </p>
    <div class="evento-principale m-top-l">
      <img class="d-none d-lg-block" src="immagini/vieni/immagine.jpg" alt="immagine evento the">
      <div id="evento-contenuto" class="d-flex align-items-center">
      </div>
    </div>
  </div>
  <div id="eventi" class=" m-top-l">
    <h1>Eventi in programma</h1>
  </div>`;
  const [head, ...rest] = data;
  const articlesContainer = document.getElementById('eventi');
  const mainArticleContainer = document.getElementById('evento-contenuto');

  eventCalendar.setState({startDate: null, endDate: null});

  printMainArticle(head, mainArticleContainer);
  printListHTML(rest, articlesContainer);
  printTagList(data, tagFilterContainer);

});
