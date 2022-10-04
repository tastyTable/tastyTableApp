// Test Tasty API

// API Key (Charlotte): c03cc9a000msha3fe9d73a2d9dfdp16bddfjsn7cf0888a090e
// API Key (Anjalee): 3d98be6ce0mshbad421f97ff1ba1p1f94acjsnc1505c33d623

const app = {};

app.apiKey = 'c03cc9a000msha3fe9d73a2d9dfdp16bddfjsn7cf0888a090e';

app.getAutoComplete = function(ingredient){
    const url = new URL('https://tasty.p.rapidapi.com/recipes/auto-complete')
    url.search = new URLSearchParams ({
        prefix: ingredient
    });

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3d98be6ce0mshbad421f97ff1ba1p1f94acjsnc1505c33d623',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch(url, options)
        .then(response => response.json())
        .then(jsonData => {
            // console.log(jsonData) //check to see the name of the array to use in the app.displayDropdown method i.e. 'results'
            app.displayDropDown(jsonData.results);
            console.log(jsonData.results)
        })
        .catch(err => console.error(err));

}

app.displayDropDown = function(arrayofResults){
    arrayofResults.forEach((result)=>{
        const searchValue = result.search_value;

        const dataList = document.querySelector('#searchList');

        dataList.innerHTML = `<option value="${searchValue}">`;
 
        console.log(searchValue)
    })

}


// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '3d98be6ce0mshbad421f97ff1ba1p1f94acjsnc1505c33d623',
//         'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
//     }
// };

// fetch('https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

app.init = function () {
    app.getAutoComplete('r');
};

app.init();