const gallery = document.querySelector('#gallery');
const search = document.querySelector('.search-container');

// ------------------------------------------
//  FUNCTIONS FROM API REQUEST WORKSHOP
// ------------------------------------------
// ------------------------------------------
//  FETCH FUNCTIONS
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
