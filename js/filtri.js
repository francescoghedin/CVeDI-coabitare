const data = [{
  title: "test",
  date: "2019-01-06T15:26:19.600Z",
  content: "ciao amorino",
  tags: ["tag1", "tag2", "tag3"]
},
 {
   title: "altro test",
   date: "2019-01-06T15:26:19.600Z",
   content: "ciao amorino",
   tags: ["tag2"]
}];

let filter = { tags: [], date: [] };

const printListHTML = (list, element) => {
  const articles = list.map((item) => {
   return `<article>
      <h2>${item.title}</h2>
      <div class="content">${item.content}</div>
      <div class="tag-list">${item.tags.join(', ')}</div>
    </article>`
  });

  element.insertAdjacentHTML('beforeend', articles.join(''));
}

const printTagItem = (tag) => {
 return `
  <li>
    <a href="#" onClick="toggleTagOnFilter('${tag}')">${tag}</a>
  </li>`
}

const filterList = (list, filters) => list.filter(item => item.tags.some(articleTag => filters.tags.includes(articleTag)))

const printTagList = (list, element) => {
  const allTags = list.reduce((acc, item) => acc = acc.concat(item.tags), []);
  const allUniqueTags = allTags.filter((value, index, all) => all.indexOf(value) === index);

  element.innerHTML = `
  <ul>${allUniqueTags.map(printTagItem).join('')}</ul>`;
}

toggleTagOnFilter = (tag) => {
  if (filter.tags.includes(tag)) {
    filter.tags = filter.tags.filter(item => item !== tag)
  } else {
    filter.tags.push(tag);
  }
}

const articlesContainer = document.getElementById('eventi');
const tagFilterContainer = document.getElementById('tag-filter');
const filterButton = document.getElementById('filter');
const filterCancelButton = document.getElementById('filter-cancel');

printListHTML(data, articlesContainer);
printTagList(data, tagFilterContainer);

filterButton.addEventListener('click', () => {
  const filteredList = filterList(data, filter);

  printListHTML(filteredList, articlesContainer);
});

filterCancelButton.addEventListener('click', () => {
  filter = {tags: [], date: [] };
  printListHTML(data, articlesContainer);
});
