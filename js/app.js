const gallery = document.querySelector('#gallery');
const search = document.querySelector('.search-container');

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

fetchData('https://randomuser.me/api/?results=12')
  //  .then( data=> console.log(data) )
  // .then( data=> console.log( Object.values(data) ) )
  .then( data=> generateHTML( Object.values( data ) ) ) //converting object to an array

// ------------------------------------------
//  HELP FUNCTION
// ------------------------------------------

function generateHTML(data){
    data[0].map( person=> {
        const card = document.createElement('div');
        card.className = 'card';
        gallery.appendChild(card);
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

    } );
}
