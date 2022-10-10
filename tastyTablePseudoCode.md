
*Tasty Table *

A landing page with the app's heading, "Tasty Table" and a welcome message "WELCOME TO YOUR KITCHEN". 

Under the welcome message, there will be an anchor tag (that looks like a button) that says "Start Cooking". When the user clicks on the anchor tag, it scrolls down to the recipe section of the index.html page.

The recipe section contains a form, with an input element, label and a submit button. As the user types in the input element, add a keydown event listener to make an AJAX request to the Tasty API's recipes/auto-complete endpoint. 

Return the auto-complete results to a dropdown menu for the user to click. Then when the user clicks the submit button, add a submit event listener to make an AJAX request to the Tasty API's recipes/list endpoint. 

Return the first 100 recipes, and then use an random number function to randomly select one recipe. Then look through that recipe object to find the name, description and image of the recipe, then append that to the page. 

Also, the include an anchor tag in the description that links to the corresponding website for that recipe, so the user can click on that link and go to a page to see the recipe. 
