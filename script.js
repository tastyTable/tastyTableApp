// Test Tasty API

// API Key (Charlotte): c03cc9a000msha3fe9d73a2d9dfdp16bddfjsn7cf0888a090e
// API Key (Anjalee): 3d98be6ce0mshbad421f97ff1ba1p1f94acjsnc1505c33d623
// API Key (Charlotte2): 180120784fmsh53e5419d8e55e13p1e8b89jsn0210d2e0e838
// API Key (Anjalee2): 6aab796937msh786ae70d84925b3p16c2dbjsn00d2aa969bd7

const app = {};

app.apiKey = '180120784fmsh53e5419d8e55e13p1e8b89jsn0210d2e0e838';
app.inputElement = document.querySelector('#search');
app.dataList = document.querySelector('#searchList');
app.form = document.querySelector('form');

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
        console.log(response);
        if(response.ok){
            return response.json();
        }else{
            throw new Error(response.statusText)
        }
    })
        .then(jsonData => {
            // console.log(jsonData) //check to see the name of the array to use in the app.displayDropdown method i.e. 'results'
            app.displayDropDown(jsonData.results);
            console.log(jsonData.results)
        })
        .catch((err) => {
            console.error(err)
            alert("Something is broken, try again later...")
        })
}

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

app.events = function () {
    app.inputElement.addEventListener('keydown',function(eventInput){
        const userSearch = eventInput.target.value;
        if (userSearch) {
            app.getAutoComplete(userSearch);
        } 
    })

    app.form.addEventListener('submit', function(eventButton){
        eventButton.preventDefault();
        const userSelection = app.inputElement.value;
        console.log(userSelection)
        app.getRecipes(userSelection)
    })
}

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
            console.log(response);
            if(response.ok){
                return response.json();
            }else{
                throw new Error(response.statusText)
            }
        })
            .then(jsonData => {
                app.displayRecipe(jsonData.results)
                console.log(jsonData.results)
            })
            .catch((err) => {
                console.error(err)
                alert("Something is broken, try again later...")
            })
}

app.displayRecipe = function(recipe){
    const indexRandom = Math.floor(Math.random() * recipe.length);
    let indexRandom2;
    let name;
    let description;
    let imageSrc;
    let imageAlt;
    let cookTime;
    let prepTime;
    let recipeSlug;
    let recipeContainer;
    if (recipe[indexRandom].recipes){
        indexRandom2 = Math.floor(Math.random() * recipe[indexRandom].recipes.length);
        name = recipe[indexRandom].recipes[indexRandom2].name
        description = recipe[indexRandom].recipes[indexRandom2].description
        imageSrc = recipe[indexRandom].recipes[indexRandom2].thumbnail_url
        imageAlt = recipe[indexRandom].recipes[indexRandom2].name
        cookTime = recipe[indexRandom].recipes[indexRandom2].cook_time_minutes
        prepTime = recipe[indexRandom].recipes[indexRandom2].prep_time_minutes
        recipeSlug= recipe[indexRandom].recipes[indexRandom2].slug
    } else {
        name = recipe[indexRandom].name
        description = recipe[indexRandom].description
        imageSrc = recipe[indexRandom].thumbnail_url
        imageAlt = recipe[indexRandom].name
        cookTime = recipe[indexRandom].cook_time_minutes
        prepTime = recipe[indexRandom].prep_time_minutes
        recipeSlug= recipe[indexRandom].slug
    }
    if (cookTime === null) {
        cookTime = "N/A";
    }
    if (prepTime === null) {
        prepTime = "N/A";
    }
    if (description === null) {
        description = "";
    }
    console.log(cookTime);
    console.log(prepTime);
    recipeContainer = document.createElement('div')
    console.log("test",recipe[indexRandom])
    console.log("test recipe mashup", recipe[indexRandom].recipes[indexRandom2])
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
            <p>${description} <a href="https://tasty.co/recipe/${recipeSlug}">See full recipe here</a></p>
        </div>
    </div>
    `
    const main = document.querySelector('#main')

        if (main.childElementCount === 1){
        main.appendChild(recipeContainer);
    } else{
        main.removeChild(main.lastElementChild);
        main.appendChild(recipeContainer);
    }
}



app.init = function () {
    app.events()
};

app.init();