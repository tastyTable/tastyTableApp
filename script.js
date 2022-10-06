// Test Tasty API

// API Key (Charlotte): c03cc9a000msha3fe9d73a2d9dfdp16bddfjsn7cf0888a090e
// API Key (Anjalee): 3d98be6ce0mshbad421f97ff1ba1p1f94acjsnc1505c33d623

const app = {};

app.apiKey = 'c03cc9a000msha3fe9d73a2d9dfdp16bddfjsn7cf0888a090e';
app.inputElement = document.querySelector('#search');
app.dataList = document.querySelector('#searchList');

app.getAutoComplete = function(ingredient){
    const url = new URL('https://tasty.p.rapidapi.com/recipes/auto-complete')
    url.search = new URLSearchParams ({
        prefix: ingredient
    });

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': app.apiKey,
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
        // .catch(err => console.error(err));

}

app.displayDropDown = function(arrayofResults){
    arrayofResults.forEach((result)=>{
        const searchValue = result.search_value;
        const option = document.createElement('option')
        option.setAttribute("value", searchValue)
        // add if/else function to not append if the option value is equal to whats already there 
        app.dataList.append(option)
        // console.log(dataList)
    });

}

app.events = function () {
    app.inputElement.addEventListener('keydown',function(event){
        app.dataList.innerHTML = '';
        const userSearch = event.target.value;
        if (userSearch) {
            app.getAutoComplete(userSearch);
        } 
    })
}

app.getRecipes = function(recipe){
    const url = new URL('https://tasty.p.rapidapi.com/recipes/list')
    url.search = new URLSearchParams ({
        from: 0,
        size: 1,
        q: recipe
    });

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': app.apiKey,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch(url, options)
        .then(response => response.json())
        .then(jsonData => {
            // console.log(jsonData) //check to see the name of the array to use in the app.displayDropdown method i.e. 'results'
            console.log(jsonData.results)
            app.displayRecipe(jsonData.results)
        })
}

app.displayRecipe = function(recipe){
    const name = recipe[0].name
    const description = recipe[0].description
    const imageSrc = recipe[0].thumbnail_url
    const imageAlt = recipe[0].name
    const cookTime = recipe[0].cook_time_minutes
    const prepTime = recipe[0].prep_time_minutes

    console.log(name, description)
    const recipeContainer = document.createElement('div')
    recipeContainer.classList.add("recipe")
    recipeContainer.innerHTML = `
    <h3>${name}</h3>
    <div class="flexContainer">
        <div class="imgContainer">
            <img src=${imageSrc} alt=${imageAlt}>
        </div>
        <div class="textContainer">
            <div class="iconFlexContainer">
                <div class="icon">
                    <i class="fa-regular fa-clock"></i>
                    <p>Prep Time: ${prepTime} mins</p>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-fire-burner"></i>
                    <p>Cooking Time: ${cookTime} mins</p>
                </div>
            </div>
            <p>${description}</p>
        </div>
    </div>
    `
    const main = document.querySelector('#main')
    main.appendChild(recipeContainer)
}

app.init = function () {
    app.events()
    app.getRecipes('chicken')
};

app.init();