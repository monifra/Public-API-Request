const gallery = document.querySelector('#gallery');
const search = document.querySelector('.search-container');
let userInfoArr =[];
// ------------------------------------------
//  RANDOM USER GENERATOR
// ------------------------------------------
// ------------------------------------------
//  FUNCTIONS FROM API REQUEST WORKSHOP
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then( res=> res.json() )
      .catch( err=> console.log('Looks like there was a problem', err) )
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
  .then( data=>
    generateHTML( Object.values( data ) ) //converting object to an array
  )



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

const cardGallery = document.createElement('div');
cardGallery.className = 'modal-container';
cardGallery.innerHTML=`
  <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
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

// ------------------------------------------
//  SEARCH
// ------------------------------------------

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

//Still need a solution for closing modal when you clicked on the background

const modalWindow = document.querySelector('.modal');
const closeButton = document.querySelector('.modal-close-btn'); //selects modal closing button
modalWindow.addEventListener('click', (e)=> {
  const clicked = e.target;
  const modalWindowInfo = document.querySelector('.modal-info-container');
  if(clicked === closeButton || clicked === closeButton.firstChild){
    gallery.removeChild(cardGallery);
  }
} );
