const gallery = document.querySelector('#gallery');
const search = document.querySelector('.search-container');
let userInfo;
// ------------------------------------------
//  RANDOM USER GENERATOR
// ------------------------------------------
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
fetchData('https://randomuser.me/api/?results=12&?nat=us')
  .then( data=> {
    generateHTML( Object.values( data ) );
    userInfo = data.results; // store data in var
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
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
          </div>
        `;
        gallery.appendChild(card);
    } );
}

// ------------------------------------------
//  MODAL WINDOW
// ------------------------------------------
function generateModal(e){
  const cards = document.querySelectorAll('.card');
  console.log(cards[0].textContent);
  console.log(userInfo);
  const clickedUser = e.target;
   //for(let i = 0; i<userInfo.length; i++){
    //if(){
    

    const cardGallery = document.createElement('div');
    cardGallery.className = 'modal-container';
    cardGallery.innerHTML=`
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong class='btn'>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
      </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    `;
    gallery.appendChild(cardGallery);
    //}
  //}
}
// ------------------------------------------
//  SEARCH
// ------------------------------------------

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

gallery.addEventListener('click', (e)=> {
  const clickedElement = e.target;
    if( clickedElement.className.includes('card') ){
      console.log('everything is fine');
      console.log(clickedElement);
      generateModal(e);
    } 
});

//Still need a solution for closing modal when you clicked on the background

gallery.addEventListener('click', (e)=> {
  const clicked = e.target;
  const cardGallery = document.querySelector('.modal-container');
  if(clicked.className.includes('btn')){
    gallery.removeChild(cardGallery);
  }
} );

