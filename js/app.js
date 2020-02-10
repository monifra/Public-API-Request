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
// ------------------------------------------
//  FUNCTIONS FROM API REQUEST WORKSHOP
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then( res => res.json() )
      .catch( err => console.log('Looks like there was a problem', err) )
  }
  function checkStatus(response){
    if (response.ok){
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText) );
    }
  }
// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetchData('https://randomuser.me/api/?results=12&nat=us')
  .then( data=> {
    generateHTML( Object.values( data ) );
    // userInfo = data.results; // store data in var
    data.results.map( data=> {
       userInfo.push(data);
    })
  })
// ------------------------------------------
//  HELP FUNCTION
// ------------------------------------------
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
        gallery.appendChild(card);
    } );
}
// ------------------------------------------
//  MODAL WINDOW
// ------------------------------------------
function generateModal(user){
    const cards = document.querySelectorAll('.card');
    const cardGallery = document.createElement('div');
    const birthday = `${user.dob.date}`;
    let regexBirthday = birthday.replace(/\D/g, '');
    const birthdayPattern = /^(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/gm;
    const secondBirthday = regexBirthday.replace(birthdayPattern, '$7$8/$5$6/$3$4 ');
    const thirdBirthday = secondBirthday.split(' ')[0];
    const telephoneNumber = `${user.phone}`;
    const rightNumber = telephoneNumber.replace( '-' , ' ');
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
    body.insertBefore(cardGallery,scriptTag);
}
// ------------------------------------------
//  SEARCH
// ------------------------------------------
const searchBar = document.createElement('form');
searchBar.setAttribute('action','#');
searchBar.setAttribute('method','get');
searchBar.innerHTML=`
  <input type="text" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
`;
search.appendChild(searchBar);

function searchIt(input, list){

  [...list].forEach(user=>{
    const card = user.parentNode.parentNode;
    const name = user.textContent;
    if(name.toLowerCase().includes(input.value.toLowerCase())){ //check if our student name is included in the value of input
      card.style.display = '';
    }else{
      card.style.display = 'none';
    }
    if(input.value.length === 0){
      card.style.display ='';
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