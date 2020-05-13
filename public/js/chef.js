$(document).ready(function() {
    // Getting references to the name input and chef container, as well as the table body
    var nameInput = $("#chef-name");
    var chefList = $("tbody");
    var chefContainer = $(".chef-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an chef
    $(document).on("submit", "#chef-form", handleChefFormSubmit);
    $(document).on("click", ".delete-chef", handleDeleteButtonPress);

    // Getting the initial list of chefs
    getChefs();

    // A function to handle what happens when the form is submitted to create a new Chef
    function handleChefFormSubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        // Calling the upsertChef function and passing in the value of the name input
        upsertChef({
            name: nameInput
                .val()
                .trim()
        });
    }

    // A function for creating an Chef. Calls getChefs upon completion
    function upsertChef(chefData) {
        $.post("/api/chefs", chefData)
            .then(getChefs);
    }

    // Function for creating a new list row for Chefs
    function createChefRow(chefData) {
        var newTr = $("<tr>");
        newTr.data("chef", chefData);
        newTr.append("<td>" + chefData.name + "</td>");
        if (chefData.Recipes) {
            newTr.append("<td> " + chefData.Recipes.length + "</td>");
        } else {
            newTr.append("<td>0</td>");
        }
        newTr.append("<td><a href='/blog?chef_id=" + chefData.id + "'>Go to Recipes</a></td>");
        newTr.append("<td><a href='/cms?chef_id=" + chefData.id + "'>Create a Recipe</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-chef'>Delete Chef</a></td>");
        return newTr;
    }

    // Function for retrieving Chefs and getting them ready to be rendered to the page
    function getChefs() {
        $.get("/api/chefs", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createChefRow(data[i]));
            }
            renderChefList(rowsToAdd);
            nameInput.val("");
        });
    }

    // A function for rendering the list of chefs to the page
    function renderChefList(rows) {
        chefList.children().not(":last").remove();
        chefContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            chefList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no chefs
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create an Chef before you can create a Recipe.");
        chefContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("chef");
        var id = listItemData.id;
        $.ajax({
                method: "DELETE",
                url: "/api/chefs/" + id
            })
            .then(getChefs);
    }
});