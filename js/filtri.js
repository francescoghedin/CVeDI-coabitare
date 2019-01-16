const data = [{
  title: "Chiacchiere da bar",
  place: "Via baltea 3, Torino",
  date: "2019-01-29T19:00",
  content: "Un incontro conviviale per discutere liberamente sui diversi modi di abitare in città, come consumare meno energia, tempo libero e lavoro.",
  link:"evento-chiacchiere.html",
  tags: ["Cohousing", "Chiacchiere"]
},
{
  title: "Cohousing \"Spazio Verde\"",
  place: "Via baltea 3, Torino",
  date: "2019-02-04T18:30",
  content: "Vieni a scoprire il nostro nuovissimo progetto di cohousing nella zona di Moncalieri.",
  link:"evento-spazioverde.html",
  tags: ["Cohousing", "Presentazioni"]
},
{
  title: "Vivere in modo differente",
  place: "Via baltea 3, Torino",
  date: "2019-02-07T14:30",
  content: "Sostenibilità, qualità della vita e banca del tempo, confrontiamoci insieme.",
  link:"evento-viveredifferente.html",
  tags: ["Sostenibilità", "Presentazioni"]
},
{
  title: "Raduno invernale RIVE",
  place: "Comune di Vidracco",
  date: "2019-02-20T10:30",
  content: "Conoscere, confrontare e trovare ispirazione tra chi ha scelto uno stile di vita ecologico.",
  link:"evento-raduno.html",
  tags: ["Cohousing", "Raduni"]
},
 {
   title: "Festa dei vicini",
   place: "Piazza della Repubblica, Torino",
   date: "2019-04-06T19:30",
   content: "Ceniamo insieme? Vieni a mangiare con i tuoi amici e vicini di casa di Porta Palazzo.",
   link:"evento-festa.html",
   tags: ["Feste"]
}];

let filter = { tags: [], date: [] };

const printMainArticle = (item, element) => {
  const date = new Date(item.date)
  const code = `
  <div id="evento-contenuto" class="evento-principale m-top-l d-none d-md-block">
      <img src="immagini/vieni/immagine.jpg" alt="immagine evento tè">
      <div id="contenuto-principale" class="d-flex align-items-center">
        <div class="col-2 d-flex flex-column justify-content-center">
            <div class="cal">
              <div class="header-cal d-flex align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {month: 'short'}).format(date)}</span></div>
              <div class="corpo-cal d-flex flex-column align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {day: 'numeric'}).format(date)}</span>
              <span>${new Intl.DateTimeFormat('it-IT', {weekday: 'long'}).format(date)}</span></div>
            </div>
            <span class="text-center ora">${new Intl.DateTimeFormat('it-IT', {hour: '2-digit', minute: '2-digit'}).format(date)}</span>
          </div>
          <div class="col-10">
            <a href="${item.link}"><h2>${item.title}</h2></a>
            <h3>${item.place}</h3>
            <p>${item.content}</p>
            <div class="tag-list">${item.tags.map(printTagArticle).join('')}</div>
          </div>
        </div>
      </div>
    </div>

  <div class="d-inline d-md-none m-top-l">
    <div id="contenuto-principale" class="d-flex align-items-center sezionegrigia p-tb-s">
    <div class="d-flex d-lg-none flex-column align-items-center ">
     <div class="d-flex">
      <div class=" d-flex flex-column align-items-center cal-mobile">
        <div class="cal">
          <div class="header-cal d-flex align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {month: 'short'}).format(date)}</span></div>
          <div class="corpo-cal d-flex flex-column align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {day: 'numeric'}).format(date)}</span>
          </div>
        </div>
        <span class="text-center ora">${new Intl.DateTimeFormat('it-IT', {hour: '2-digit', minute: '2-digit'}).format(date)}</span>
      </div>
      <div class="col-9">
        <a href="${item.link}"><h2>${item.title}</h2></a>
        <h3>${item.place}</h3>
      </div>
     </div>
     <div class="d-flex flex-column col-12">
       <p>${item.content}</p>
       <div class="tag-list">${item.tags.map(printTagArticle).join('')}</div>
     </div>
    </div>
    </div>
  </div>`
  element.insertAdjacentHTML('beforeend', code);
}

const printListHTML = (list, element) => {
  const articles = list.map((item) => {
  const date = new Date(item.date)
   return `
   <div class="d-none d-md-flex align-items-center m-top-l">
     <div class="col-2 d-flex flex-column justify-content-center">
       <div class="cal">
         <div class="header-cal d-flex align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {month: 'short'}).format(date)}</span></div>
         <div class="corpo-cal d-flex flex-column align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {day: 'numeric'}).format(date)}</span>
         <span>${new Intl.DateTimeFormat('it-IT', {weekday: 'long'}).format(date)}</span></div>
       </div>
       <span class="text-center ora">${new Intl.DateTimeFormat('it-IT', {hour: '2-digit', minute: '2-digit'}).format(date)}</span>
     </div>
     <div class="col-10">
       <a href="${item.link}"><h2>${item.title}</h2></a>
       <h3>${item.place}</h3>
       <p>${item.content}</p>
       <div class="tag-list">${item.tags.map(printTagArticle).join('')}</div>
     </div>
   </div>

   <div class="d-flex d-md-none flex-column m-top-l">
    <div class="d-flex">
     <div class=" d-flex flex-column align-items-center cal-mobile">
       <div class="cal">
         <div class="header-cal d-flex align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {month: 'short'}).format(date)}</span></div>
         <div class="corpo-cal d-flex flex-column align-items-center justify-content-center"><span>${new Intl.DateTimeFormat('it-IT', {day: 'numeric'}).format(date)}</span></div>
       </div>
       <span class="text-center ora">${new Intl.DateTimeFormat('it-IT', {hour: '2-digit', minute: '2-digit'}).format(date)}</span>
     </div>
     <div class="col-9">
       <a href="${item.link}"><h2>${item.title}</h2></a>
       <h3>${item.place}</h3>
     </div>
    </div>
    <div class="d-flex flex-column">
      <p>${item.content}</p>
      <div class="tag-list">${item.tags.map(printTagArticle).join('')}</div>
    </div>
   </div>
   `
  });

  element.insertAdjacentHTML('beforeend', articles.join(''));
}

const printTagArticle = (tag) => {
  return `
    <div class="tag">
      <a href="#" onClick="filterSingleTag('${tag}', this)">${tag}</a>
    </div>`
}
const printTagItem = (tag) => {
 return `
  <div class="tag">
    <a href="javascript:;" onClick="toggleTagOnFilter('${tag}', this)">${tag}</a>
  </div>`
}
const filterSingleTag = (tag, element)=> {
  filter.tags=[tag];
  const filteredList = filterList(data, filter);
  nextEvent.classList.add('invisibile');
  articlesContainer.classList.remove('m-top-l');
  articlesContainer.innerHTML=`
    <h1>Tag: ${tag}</h1>`;
  printListHTML(filteredList, articlesContainer);
}

const filterList = (list, filters) => {
  const [startDate, endDate] = filters.date;
  console.log(startDate, endDate);
  console.log(filters.tags);
  if(startDate!=null){
    startDate.hour(1);
    startDate.minute(0);
    startDate.second(0);
    startDate.millisecond(0);
    endDate.hour(23);
    endDate.minute(59);
    endDate.second(59);
    endDate.millisecond(999);
  }
  const matchesFilterDates = (date) => startDate && endDate ? moment(date).isBetween(startDate, endDate, null, '[]') : true
  const matchesFilterTags =(item) => item.tags.some(articleTag => filters.tags.includes(articleTag))
  if(filter.date==null || filters.tags.length == 0){
    return list.filter(item => matchesFilterTags(item) || matchesFilterDates(item.date))
  }else{
    return list.filter(item => matchesFilterTags(item) && matchesFilterDates(item.date))
  }
//  return list.filter(item => matchesFilterTags(item) || matchesFilterDates(item.date))

}

const printTagList = (list, element) => {
  const allTags = list.reduce((acc, item) => acc = acc.concat(item.tags), []);
  allTags.push("Workshop");
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
const tagFilterContainers = document.getElementsByClassName('tag-filter');
const filterButtons = document.getElementsByClassName('filter');
const filterCancelButtons = document.getElementsByClassName('filter-cancel');
const eventsListContainer = document.getElementById('lista-eventi');
const nextEvent = document.getElementById('prossimo-evento')

const [head, ...rest] = data;
printMainArticle(head, nextEvent);
printListHTML(rest, articlesContainer);
printTagList(data, tagFilterContainers[0]);
printTagList(data, tagFilterContainers[1]);

filterButtons[0].addEventListener('click', () => {
  const { startDate, endDate } = eventCalendarM.state;

  filter.date = [startDate, endDate];

  const filteredList = filterList(data, filter);
  nextEvent.classList.add('invisibile');
  articlesContainer.innerHTML=`
    <h1>Eventi filtrati</h1>`;
    $("#filtri-mobile").collapse('toggle');
  printListHTML(filteredList, articlesContainer);
});
filterButtons[1].addEventListener('click', () => {
  const { startDate, endDate } = eventCalendarD.state;
  filter.date = [startDate, endDate];
//  console.log(startDate, endDate);
  const filteredList = filterList(data, filter);
  //console.log(filteredList)
  nextEvent.classList.add('invisibile');
  articlesContainer.classList.remove('m-top-l');
  articlesContainer.innerHTML=`
    <h1>Eventi filtrati</h1>`;
  printListHTML(filteredList, articlesContainer);
});

filterCancelButtons[0].addEventListener('click', () => {
  filter = {tags: [], date: [] };
  nextEvent.classList.remove('invisibile');
  articlesContainer.innerHTML=`
    <h1>Eventi in programma</h1>`;
  const [head, ...rest] = data;
  $("#filtri-mobile").collapse('toggle');
  eventCalendarM.setState({startDate: null, endDate: null});

  printListHTML(rest, articlesContainer);
  printTagList(data, tagFilterContainers[0]);

});
filterCancelButtons[1].addEventListener('click', () => {
  filter = {tags: [], date: [] };
  nextEvent.classList.remove('invisibile');
  articlesContainer.classList.add('m-top-l');
  articlesContainer.innerHTML=`
    <h1>Eventi in programma</h1>`;
  const [head, ...rest] = data;
//  const articlesContainer = document.getElementById('eventi');
//  const mainArticleContainer = document.getElementById('evento-contenuto');

  eventCalendarD.setState({startDate: null, endDate: null});

  //printMainArticle(head, mainArticleContainer);
  printListHTML(rest, articlesContainer);
  printTagList(data, tagFilterContainers[1]);

});
