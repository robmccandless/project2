$(document).ready(function() {
    // Getting jQuery references to the recipe body, title, form, and Chef select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var cmsForm = $("#cms");
    var chefSelect = $("#chef");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a Recipe)
    var url = window.location.search;
    var recipeId;
    var chefId;
    // Sets a flag for whether or not we're updating a recipe to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the recipe id from the url
    // In '?recipe_id=1', recipeId is 1
    if (url.indexOf("?recipe_id=") !== -1) {
        recipeId = url.split("=")[1];
        getRecipeData(recipeId, "recipe");
    }
    // Otherwise if we have an chef_id in our url, preset the chef select box to be our chef
    else if (url.indexOf("?chef_id=") !== -1) {
        chefId = url.split("=")[1];
    }

    // Getting the chefs, and their recipes
    getChefs();

    // A function for handling what happens when the form to create a new recipe is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the recipe if we are missing a body, title, or Chef
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !chefSelect.val()) {
            return;
        }
        // Constructing a newRecipe object to hand to the database
        var newRecipe = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            chefId: chefSelect.val()
        };

        // If we're updating a Recipe run updateRecipe to update a Recipe
        // Otherwise run submitRecipe to create a whole new Recipe
        if (updating) {
            newRecipe.id = recipeId;
            updateRecipe(newRecipe);
        } else {
            submitRecipe(newRecipe);
        }
    }

    // Submits a new Recipe and brings user to recipes page upon completion
    function submitRecipe(recipe) {
        $.post("/api/recipes", recipe, function() {
            window.location.href = "/recipes";
        });
    }

    // Gets recipe data for the current recipe if we're editing, or if we're adding to an chef's existing recipes
    function getRecipeData(id, type) {
        var queryUrl;
        switch (type) {
            case "recipe":
                queryUrl = "/api/recipes/" + id;
                break;
            case "chef":
                queryUrl = "/api/chefs/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function(data) {
            if (data) {
                console.log(data.ChefId || data.id);
                // If this recipe exists, prefill our cms forms with its data
                titleInput.val(data.title);
                bodyInput.val(data.body);
                chefId = data.ChefId || data.id;
                // If we have a recipe with this id, set a flag for us to know to update the recipe
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get Chefs and then render our list of Chefs
    function getChefs() {
        $.get("/api/chefs", renderChefList);
    }
    // Function to either render a list of Chefs, or if there are none, direct the user to the page
    // to create an Chef first
    function renderChefList(data) {
        if (!data.length) {
            window.location.href = "/chefs";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createChefRow(data[i]));
        }
        chefSelect.empty();
        console.log(rowsToAdd);
        console.log(chefSelect);
        chefSelect.append(rowsToAdd);
        chefSelect.val(chefId);
    }

    // Creates the chef options in the dropdown
    function createChefRow(chef) {
        var listOption = $("<option>");
        listOption.attr("value", chef.id);
        listOption.text(chef.name);
        return listOption;
    }

    // Update a given recipe, bring user to the recipes page when done
    function updateRecipe(recipe) {
        $.ajax({
                method: "PUT",
                url: "/api/recipes",
                data: recipe
            })
            .then(function() {
                window.location.href = "/recipes";
            });
    }
});