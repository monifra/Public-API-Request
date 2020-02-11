// ------------------------------------------
//  RANDOM USER GENERATOR
// ------------------------------------------
// ------------------------------------------
//  GLOBAL VARIABLES
// ------------------------------------------
const gallery = document.querySelector('#gallery');
const search = document.querySelector('.search-container');
const scriptTag = document.querySelector('script');
const body = document.querySelector('body');
const modalButtonsParent = document.querySelector('.modal-btn-container');
let userInfo = [];
let cardIndex;
const searchBar = document.createElement('form');
let visibleCards=[];
let visibleCardsIndex;
// ------------------------------------------
//  FETCH FUNCTIONS WRITTEN DURING API REQUEST WORKSHOP TREEHOUSE
// ------------------------------------------
//function for fetching data from given url. It checks status of response with checkStatus function, returns a promise and handles errors. 
function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then( res => res.json() )
      .catch( err => console.log('Looks like there was a problem', err) )
  }
  //function for checking the status of response from fetching data
  function checkStatus(response){
    if (response.ok){
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText) );
    }
  }
// ------------------------------------------
//  CALLING FETCH FUNCTION
// ------------------------------------------
fetchData('https://randomuser.me/api/?results=12&nat=us') //fetches 12 random users from US
  .then( data=> {
    generateHTML( Object.values( data ) ); //calls function that will generate html on the page
    data.results.map( data=> { 
       userInfo.push(data); // pushes user data into userInfo array
    })
  })
// ------------------------------------------
//  HELP FUNCTIONS
// ------------------------------------------
  // ------------------------------------------
  //  GENERATE HTML
  // ------------------------------------------
  //function that generates HTML Cards for 12 random users that takes data from fetch
function generateHTML(data){ 
    data[0].map( person=> { 
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML=`
          <div class="card-img-container">
            <img class='card-img' src=${person.picture.large} alt='profile picture'>
          </div>
          <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}</p>
          </div>
        `;
        gallery.appendChild(card); //appends html card for every user
    } );
}
  // ------------------------------------------
  //  MODAL WINDOW
  // ------------------------------------------
  //function that generates a modal for a user it takes one argument: user data
function generateModal(user){
    const cardGallery = document.createElement('div');
    const birthday = `${user.dob.date}`;
    //converts birthday data for the right format xx/xx/xx
    let regexBirthday = birthday.replace(/\D/g, '');
    const birthdayPattern = /^(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/gm;
    const secondBirthday = regexBirthday.replace(birthdayPattern, '$7$8/$5$6/$3$4 ');
    const thirdBirthday = secondBirthday.split(' ')[0];
    //converts the format of telephone data into (000) 000-0000
    const telephoneNumber = `${user.phone}`;
    const rightNumber = telephoneNumber.replace( '-' , ' ');
    //creates html for modal and give it the right user data
    cardGallery.className = 'modal-container';
    cardGallery.innerHTML=`
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong class='close'>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${user.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${rightNumber}</p>
            <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state}, ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${thirdBirthday}</p>
        </div>
      </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    `;
    body.insertBefore(cardGallery,scriptTag); //appends modal to a page
}
// ------------------------------------------
//  SEARCH
// ------------------------------------------
//creates search html and append it to a page
searchBar.setAttribute('action','#'); 
searchBar.setAttribute('method','get');
searchBar.innerHTML=`
  <input type="text" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
`;
search.appendChild(searchBar);
//function that search trought user names on the page and displays matches it takes two arguments: search input and the list of users
function searchIt(input, list){
  [...list].forEach(user=>{ //for each user in the users list
    const card = user.parentNode.parentNode;
    const name = user.textContent;
    if(name.toLowerCase().includes(input.value.toLowerCase())){ //checks if user name is included in the value of input
      card.style.display = ''; //displays cards in which user name is included
    }else{
      card.style.display = 'none'; //hides cards in which user name isn't included
    }
    if(input.value.length === 0){ //when there isn't any value inside the search input 
      card.style.display =''; //it shows all cards
    }
  });
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
gallery.addEventListener('click', (e)=> {
  const cards = document.getElementsByClassName('card');
  [...cards].forEach( (card)=>{
    if( e.composedPath().includes(card) ){
      cardIndex = [...cards].indexOf(card);
      console.log(cardIndex, card);
      generateModal(userInfo[cardIndex]);
    } 
  } );
});

body.addEventListener('click', (e)=> {
  const clicked = e.target;
  const cardGallery = document.querySelector('.modal-container');
  if(clicked.className.includes('close')){
    body.removeChild(cardGallery);
  }
} );

//An idea for a part of next prev that depends on display of cards
// [...cards].forEach(card=>{
//   if(card.style.display !== "none"){
//     // visibleCards.push(card);
//     visibleCardsIndex = [...cards].indexOf(card);
//   }
//   });

//NEEDS WORK! TO HANDLE NEXT PREV AFTER THE SEARCH 
body.addEventListener('click',(e)=> {
  const cards = document.getElementsByClassName('card');
  const cardsLength = cards.length;
  const clicked = e.target;
  const existingModal = document.querySelector('.modal-container');
  const prevButton = document.querySelector('#modal-prev');
  const nextButton = document.querySelector('#modal-next');

    if( clicked === prevButton ){
      if(cardIndex === 0){
        body.removeChild(existingModal);
        generateModal(userInfo[cardsLength-1]);
        cardIndex=cardsLength-1;
      }else{
        body.removeChild(existingModal);
        generateModal(userInfo[cardIndex-1]);
        cardIndex-=1;
      }
    } else if( clicked === nextButton ){
      if(cardIndex === cardsLength-1){
        body.removeChild(existingModal);
        generateModal(userInfo[0]);
        cardIndex=0;
      }else{
        body.removeChild(existingModal);
        generateModal(userInfo[cardIndex+1]);
        cardIndex+=1;
      }
    }
} );

search.addEventListener('keyup',(e)=> {
  const allUsersNames = document.querySelectorAll('#name');
  const input = document.querySelector('.search-input');
  searchIt(input, allUsersNames);
} );


search.addEventListener('click',(e)=> {
  const allUsersNames = document.querySelectorAll('#name');
  const input = document.querySelector('.search-input');
  searchIt(input, allUsersNames);  
} );