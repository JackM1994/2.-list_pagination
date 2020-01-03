
   
//DOM Variables

const list = document.getElementsByClassName('student-item cf');
console.log(list);
const num = 10;

//search function
const searchs = document.getElementsByTagName('h3');

//create search bar
const searchBar = document.getElementsByClassName('page-header cf')[0];

const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';

const input = document.createElement('input');
input.setAttribute('placeholder', "Search...");

const button = document.createElement('button');
button.textContent = 'Search';
searchDiv.appendChild(input);
searchDiv.appendChild(button);
searchBar.appendChild(searchDiv);

//Search bar function
const search = (input, listName) => {
  const parentDiv = document.querySelector('.page');
  const paginationDiv = document.querySelector('.pagination');
  const h2 = document.getElementsByTagName('h2')[0];
  let resultsArray = [];

  for(let i = 0; i<listName.length; i++){
    list[i].style.display = 'none';

    if(input.value.length != 0 && listName[i].textContent.toLowerCase().includes(input.value.toLowerCase())){
      list[i].style.display = '';
      resultsArray.push(list[i]);
    }
    if(resultsArray.length === 0){
      h2.textContent = 'no results are found';
    }else{
      h2.textContent = 'students';
    }
  }
  parentDiv.removeChild(paginationDiv);
  showPage(resultsArray, 1);
  appendPageLinks(resultsArray);
};



/*** 
   create showpage function to show 10 students at a time
   
*/
const showPage = (list, page) => {


 let startIndex = (page * num) - num;
  let endIndex = page * num ;

 for(let i =0; i<list.length; i++){
   if(i >= startIndex && i < endIndex){
     list[i].style.display = '';
   
 } else{
   list[i].style.display = 'none';
 }
 
}
};




//create page links
const appendPageLinks = (list) => {
  const firstDiv = document.getElementsByClassName('page')[0];
  //page numbers
  let buttonNum = Math.ceil(list.length / num);
  //create a div to store new lists
  const div = document.createElement('div');
  div.className = 'pagination';
  const ul = document.createElement('ul');

  //create li link
  for(let i = 0; i< buttonNum; i ++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#');

    a.textContent = i + 1;
    if(i === 0){
      a.className = 'active';
    }
    li.appendChild(a);
    ul.appendChild(li);

  }
  div.appendChild(ul);
  firstDiv.appendChild(div);

  //add event listener to every element
  let a = document.getElementsByTagName('a');
  for(let i = 0; i < a.length; i++){

    a[i].addEventListener('click', (event)=> {
      let pageNumber = event.target.textContent;
      for(let i = 0; i < a.length; i++){
        a[i].classList.remove('active');
      }
      event.target.className = 'active';
      showPage(list, pageNumber);
    });
  }
};

//call search function
button.addEventListener('click', (event) =>{
  event.preventDefault();
  search(input, searchs);
});
//searchfield
input.addEventListener('keyup', ()=>{
  search(input, searchs);
});

appendPageLinks(list);
showPage(list, 1);



