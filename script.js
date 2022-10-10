// Test Tasty API

// API Key (Charlotte): c03cc9a000msha3fe9d73a2d9dfdp16bddfjsn7cf0888a090e
// API Key (Anjalee): 3d98be6ce0mshbad421f97ff1ba1p1f94acjsnc1505c33d623
// API Key (Charlotte2): 180120784fmsh53e5419d8e55e13p1e8b89jsn0210d2e0e838
// API Key (Anjalee2): 6aab796937msh786ae70d84925b3p16c2dbjsn00d2aa969bd7

// namespace object
const app = {};

// namespace variables
app.apiKey = '180120784fmsh53e5419d8e55e13p1e8b89jsn0210d2e0e838';
app.inputElement = document.querySelector('#search');
app.dataList = document.querySelector('#searchList');
app.form = document.querySelector('form');
app.menuIcon = document.querySelector('.navIcon');
app.closeIcon = document.querySelector('.buttonContainer');
app.slideOut = document.getElementById('slideOutNavElement');

// create event listener for the search bar and for the form submit
app.events = function () {
    app.inputElement.addEventListener('keydown', function (eventInput) {
        const userSearch = eventInput.target.value;
        if (userSearch) {
            app.getAutoComplete(userSearch);
        }
    })

    app.form.addEventListener('submit', function (eventButton) {
        eventButton.preventDefault();
        const userSelection = app.inputElement.value;
        app.getRecipes(userSelection);
    })
}

// method to fetch data from Tasty API auto-complete endpoint (using user's input)
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
        .then((response) => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error(response.statusText);
        }
    })
        .then(jsonData => {
            app.displayDropDown(jsonData.results);
        })
        .catch((err) => {
            alert("Something is broken, try again later...");
        })
}

// method to display search value to the search bar's dropdown
app.displayDropDown = function(arrayofResults){
    arrayofResults.forEach((result)=>{
        const searchValue = result.search_value;
        const option = document.createElement('option')
        option.setAttribute("value", searchValue)
        if (app.dataList.childElementCount = 0){
            app.dataList.append(option)
        } else{
            while(app.dataList.firstChild){
                app.dataList.removeChild(app.dataList.firstChild);
            }
            app.dataList.append(option)
        }
    });
}

// method to fetch recipe data from Tasty API recipe/list endpoint
app.getRecipes = function(recipe){
    const url = new URL('https://tasty.p.rapidapi.com/recipes/list')
    url.search = new URLSearchParams ({
        from: 0,
        size: 100,
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
        .then((response) => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error(response.statusText)
            }
        })
        .then(jsonData => {
            const listOfRecipes = [];
            jsonData.results.forEach(function (result) {
                recipeLowerCase = recipe.toLowerCase();
                if (result.name.toLowerCase().includes(recipeLowerCase)) {
                    listOfRecipes.push(result);
                } else if (result.sections) {
                    result.sections.forEach((section)=>{
                        section.components.forEach((component)=>{
                            if (component.ingredient.name === recipeLowerCase) { 
                                listOfRecipes.push(result); 
                            }
                        })
                    })
                }
            })
            app.displayRecipe(listOfRecipes);
        })
        .catch((err) => {
            alert("That is not an ingredient we have, try another one")
        })
}

// method to generate random number and display recipe to the page
app.displayRecipe = function(recipe){
    let indexRandom = Math.floor(Math.random() * recipe.length);
    if (recipe[indexRandom].recipes) {
        do {
            indexRandom = Math.floor(Math.random() * recipe.length);
        } while (recipe[indexRandom].recipes);
    }
    let name = recipe[indexRandom].name
    let description = recipe[indexRandom].description
    let imageSrc = recipe[indexRandom].thumbnail_url
    let imageAlt = recipe[indexRandom].name
    let cookTime = recipe[indexRandom].cook_time_minutes
    let prepTime = recipe[indexRandom].prep_time_minutes
    let recipeSlug = recipe[indexRandom].slug

    if (cookTime === null) {
        cookTime = "N/A";
    }
    if (prepTime === null) {
        prepTime = "N/A";
    }
    if (description === null) {
        description = "";
    }
    
    let recipeContainer = document.createElement('div');
    recipeContainer.classList.add("recipe");
    recipeContainer.innerHTML = `
    <h3>${name}</h3>
    <div class="flexContainer">
        <div class="imgContainer">
            <img src=${imageSrc} alt=${imageAlt}>
        </div>
        <div class="textContainer">
            <div class="iconFlexContainer">
                <div class="icon">
                    <i class="fa-regular fa-clock" aria-hidden = "true"></i>
                    <p>Prep Time: ${prepTime} mins</p>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-fire-burner" aria-hidden = "true"></i>
                    <p>Cooking Time: ${cookTime} mins</p>
                </div>
            </div>
            <p>${description} <a href="https://tasty.co/recipe/${recipeSlug}" class="recipeLink">See full recipe here</a></p>
        </div>
    </div>
    `
    const main = document.querySelector('#main');

    if (main.childElementCount === 1){
        main.appendChild(recipeContainer);
    } else{
        main.removeChild(main.lastElementChild);
        main.appendChild(recipeContainer);
    }
}

// function that will show slide out menu
app.showClass = () => {
    app.menuIcon.addEventListener('click', () => {
        app.slideOut.classList.remove('hide');
        app.slideOut.classList.add('show');
    });
}

// function that will hide slide out menu
app.hideClass = () => {
    app.closeIcon.addEventListener('click', () => {
        app.slideOut.classList.remove('show');
        app.slideOut.classList.add('hide');
    });
}

// initiation method
app.init = function () {
    app.events();
    app.showClass();
    app.hideClass();
};

// calling the initiation method
app.init();