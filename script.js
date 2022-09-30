// Test Tasty API

// API Key (Charlotte): c03cc9a000msha3fe9d73a2d9dfdp16bddfjsn7cf0888a090e
// API Key (Anjalee): 3d98be6ce0mshbad421f97ff1ba1p1f94acjsnc1505c33d623

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3d98be6ce0mshbad421f97ff1ba1p1f94acjsnc1505c33d623',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

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

