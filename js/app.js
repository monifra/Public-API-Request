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
    .then( data=> console.log(data) )
    .then( data=>generateHTML(data.message) )

// ------------------------------------------
//  HELP FUNCTION
// ------------------------------------------

function generateHTML(data){
    data.map( person=> {
        const card = document.createElement('div.card');
        gallery.appendChild(card);
        card.innerHTML=`
            <div class="card-img-container">
            
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">first last</h3>
                <p class="card-text">email</p>
                <p class="card-text cap">city, state</p>
            </div>
        `;

    } );
}
