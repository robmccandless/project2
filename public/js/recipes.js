$(document).ready(function() {
    /* global moment */

    // recipesContainer holds all of our Recipes
    var recipesContainer = $(".recipes-container");
    var recipeCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleRecipeDelete);
    $(document).on("click", "button.edit", handleRecipeEdit);
    // Variable to hold our Recipes
    var recipes;

    // The code below handles the case where we want to get recipes recipes for a specific chef
    // Looks for a query param in the url for chef_id
    var url = window.location.search;
    var chefId;
    if (url.indexOf("?chef_id=") !== -1) {
        chefId = url.split("=")[1];
        getRecipes(chefId);
    }
    // If there's no chefId we just get all Recipes as usual
    else {
        getRecipes();
    }


    // This function grabs Recipes from the database and updates the view
    function getRecipes(chef) {
        chefId = chef || "";
        if (chefId) {
            chefId = "/?chef_id=" + chefId;
        }
        $.get("/api/recipes" + chefId, function(data) {
            console.log("Recipes", data);
            recipes = data;
            if (!recipes || !recipes.length) {
                displayEmpty(chef);
            } else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete recipes
    function deleteRecipe(id) {
        $.ajax({
                method: "DELETE",
                url: "/api/recipes/" + id
            })
            .then(function() {
                getRecipes(recipeCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed recipe HTML inside recipesContainer
    function initializeRows() {
        recipesContainer.empty();
        var recipesToAdd = [];
        for (var i = 0; i < recipes.length; i++) {
            recipesToAdd.push(createNewRow(recipes[i]));
        }
        recipesContainer.append(recipesToAdd);
    }

    // This function constructs a recipe's HTML
    function createNewRow(recipe) {
        var formattedDate = new Date(recipe.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newRecipeCard = $("<div>");
        newRecipeCard.addClass("card");
        var newRecipeCardHeading = $("<div>");
        newRecipeCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        // var upVoteBtn = $("<button>");
        // upVoteBtn.text("Thumbs Up Vote");
        // upVoteBtn.addClass("upvote");
        // $('#title').upvote();
        var newRecipeTitle = $("<h2>");
        var newRecipeDate = $("<small>");
        var newRecipeChef = $("<h5>");
        newRecipeChef.text("Written by: " + recipe.Chef.name);
        newRecipeChef.css({
            float: "right",
            color: "blue",
            "margin-top": "-10px"
        });
        var newRecipeCardBody = $("<div>");
        newRecipeCardBody.addClass("card-body");
        var newRecipeBody = $("<p>");
        var newRecipeCook = $("<p>");
        newRecipeTitle.text(recipe.title + " ");
        newRecipeBody.text(recipe.body);
        newRecipeCook.text(recipe.cookTime);
        newRecipeDate.text(formattedDate);
        newRecipeTitle.append(newRecipeDate);
        newRecipeCardHeading.append(deleteBtn);
        newRecipeCardHeading.append(editBtn);
        newRecipeCardHeading.append(newRecipeTitle);
        newRecipeCardHeading.append(newRecipeChef);
        newRecipeCardBody.append(newRecipeBody);
        newRecipeCardBody.append(newRecipeCook);
        newRecipeCard.append(newRecipeCardHeading);
        newRecipeCard.append(newRecipeCardBody);
        newRecipeCard.data("recipe", recipe);
        return newRecipeCard;
    }

    // This function figures out which Recipe we want to delete and then calls deleteRecipe
    function handleRecipeDelete() {
        var currentRecipe = $(this)
            .parent()
            .parent()
            .data("recipe");
        deleteRecipe(currentRecipe.id);
    }

    // This function figures out which Recipe we want to edit and takes it to the appropriate url
    function handleRecipeEdit() {
        var currentRecipe = $(this)
            .parent()
            .parent()
            .data("recipe");
        window.location.href = "/cms?recipe_id=" + currentRecipe.id;
    }

    // This function displays a message when there are no recipes
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Chef #" + id;
        }
        recipesContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No recipes yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        recipesContainer.append(messageH2);
    }

});