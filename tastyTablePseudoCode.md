
*Tasty Table *

A landing page with the app's heading, "Tasty Table" and a welcome message "WELCOME TO YOUR KITCHEN". 

Under the welcome message, there will be an anchor tag (that looks like a button) that says "Start Cooking". When the user clicks on the anchor tag, it scrolls down to the recipe section of the index.html page.

The recipe section contains a form, with an input element, label and a submit button. As the user types in the input element, add a keydown event listener to make an AJAX request to the Tasty API's recipes/auto-complete endpoint. 

Return the auto-complete results to a dropdown menu for the user to click. Then when the user clicks the submit button, add a submit event listener to make an AJAX request to the Tasty API's recipes/list endpoint. 

Return the first 100 recipes, and then use an random number function to randomly select one recipe. Then look through that recipe object to find the name, description and image of the recipe, then append that to the page. 

Also, the include an anchor tag in the description that links to the corresponding website for that recipe, so the user can click on that link and go to a page to see the recipe. 

Stretch Goals
1. Allow users to filter the results using the tags (type of cuisine, recipes under 20 mins, etc.)
2. Load next x amount of recipes as the user scrolls down the page
3. The form contains 2 fields to search from: search by ingredients, search by dish name
4. Each description/text box is the same size with a clickable "...read more" (i.e. anchor tag). When the user clicks "read more", it shows the full description.
11:10
4. Each description/text box is the same size with a clickable "...read more" (i.e. anchor tag). When the user clicks "read more", it shows the full description.
5. add JS function to make the background image load before the rest of the app’s content
6. update CSS to fix the background image height on larger monitors.

TECHNICAL CHALLENGES

- limits to our API calls (500/month). Mostly affects our app.autoComplete method which makes an API request everytime a user presses a letter in the search bar (eventListener ‘keydown’)
    - Tried to look for other food APIs that had auto-complete but the few ones that had an auto-complete endpoint (Yummly) were limited as well or required a credit card.
    - the search data were not related to Tasty’s recipes
- On key down, the API call to the auto-complete endpoint appends all results to our drop-down, which results in duplicates as the user types more letters.
    - tried to remove the previously appended results for each key down before new results are added: this resulted in some search values not showing in our drop-down. The console log of our second .then would show more values than our drop-down. ex: watercress.
- Background image loads after the HTML:
    - we compressed the image to half its size - using tinypng.com. The image now seems to load a bit faster but still after the html.
    - added to our stretch goals.
        
TECHNICAL WINS

- Issue: The recipe/list endpoint did not return only recipes but also mash-ups of recipes that were not related to the user search (app.displayRecipe).
    - Solution: we were able to parse our results and filter out all the mash-ups using a do/while loop: as long as the random number generated a mash-up, then generate another new random recipe)
- app.getRecipes: the search results would look at ingredients that contain the word that was searched (ie searched for apple, would get recipes that contained no apples but contained apple cider vinegar)
    - Compare the values using if/else/else if: 1. in the recipe name: to check that the name of the recipe contained the words in the search values, using includes() method. 2. run a forEach loop through the ingredients array to check that one ingredient matches the search value exactly
