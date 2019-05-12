
$(document).ready(function () {
    /* global moment */
    var previouscConfessionContainer = $(".previous-post");
var previouscConfessions;
function postPreviousConfession(){

var loggedInUser = {
    id: sessionStorage.getItem("UserId"),
    username: sessionStorage.getItem("UserName"),
    email: sessionStorage.getItem("UserEmail")
}
getRandomConfessions(loggedInUser);
}
postPreviousConfession();

function getRandomConfessions(user) {
    $.get("api/confessions", function (data) {
        // console.log("Confessions", data);
        confessions = data;
        if (!confessions || !confessions.length) {
            displayPreviousPostEmpty(user);
        } else {
            initializeRandomRows();
        }
    });
}

function initializeRandomRows() {
    previouscConfessionContainer.empty();
    var confessionsToAdd = [];
    for (var i = 0; i < confessions.length; i++) {
        confessionsToAdd.push(createPreviousPost(confessions[i]));
    }
    previouscConfessionContainer.append(confessionsToAdd);
}

function createPreviousPost(confession) {
    var formattedDate = new Date(confession.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newConfessionCard = $("<div>");
    newConfessionCard.addClass("card");
    var newConfessionCardHeading = $("<div>");
    newConfessionCardHeading.addClass("card-header");
    var newConfessionTitle = $("<h2>");
    var newConfessionDate = $("<small>");
    var newConfessionUser = $("<h5>");
    newConfessionUser.text("Written by: " + confession.User.username);
    newConfessionUser.css({
        float: "right",
        color: "white",
        "margin-top": "-10px"
    });

    var newConfessionCardBody = $("<div>");
    newConfessionCardBody.addClass("card-body");
    var newConfessionBody = $("<p>");
    //   newConfessionTitle.text(confession.title + " ");
    newConfessionBody.text(confession.body);
    newConfessionDate.text(formattedDate);
    newConfessionTitle.append(newConfessionDate);
    newConfessionCardHeading.append(newConfessionTitle);
    newConfessionCardHeading.append(newConfessionUser);
    newConfessionCardBody.append(newConfessionBody);
    newConfessionCard.append(newConfessionCardHeading);
    newConfessionCard.append(newConfessionCardBody);
    newConfessionCard.data("confession", confession);
    // var trueBtn = $("<button>");
    // trueBtn.text("true");
    // trueBtn.addClass("true btn btn-danger trueFalseBtn");
    // trueBtn.attr("data-confessionId", confession.id)
    // trueBtn.val(true);
    // var falseBtn = $("<button>");
    // falseBtn.text("false");
    // falseBtn.addClass("false btn btn-info trueFalseBtn");
    // falseBtn.attr("data-confessionId", confession.id)
    // falseBtn.val(false)
    // newConfessionCardHeading.append(trueBtn);
    // newConfessionCardHeading.append(" || ");
    // newConfessionCardHeading.append(falseBtn);
    return newConfessionCard;
}

// This function displays a message when there are no confessions
function displayPreviousPostEmpty(user) {
    var query = window.location.search;
    var partial = "";
    if (user.id) {
        partial = " for User #" + user.id;
    }
    previouscConfessionContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({
        "text-align": "center",
        "margin-top": "50px"
    });
    messageH2.html("No confessions yet");
    previouscConfessionContainer.append(messageH2);
}



    // confessionContainer holds all of our confessions
    var confessionContainer = $(".confession-container");
    // var confessionCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    // $(document).on("click", "button.delete", handleConfessionDelete);
    // $(document).on("click", "button.edit", handleConfessionEdit);
    // Variable to hold our confessions
    var confessions;

    // The code below handles the case where we want to get confession confessions for a specific user
    // Looks for a query param in the url for user_id
    // var url = window.location.search;
    // var userId;
    // if (url.indexOf("?user_id=") !== -1) {
    //   userId = url.split("=")[1];
    //   getConfessions(userId);
    // }
    // // If there's no userId we just get all confessions as usual
    // else {

    var loggedInUser = {
        id: sessionStorage.getItem("UserId"),
        username: sessionStorage.getItem("UserName"),
        email: sessionStorage.getItem("UserEmail")
    }

    getConfessions(loggedInUser);
    // }


    // This function grabs confessions from the database and updates the view
    function getConfessions(user) {
        //   userId = user || "";
        //   if (userId) {
        //     userId = "/?user_id=" + userId;
        //   }
        //   $.get("api/confessions" + userId, function(data) {
        $.get("api/confessions", function (data) {
            // console.log("Confessions", data);
            confessions = data;
            if (!confessions || !confessions.length) {
                displayEmpty(user);
            } else {
                initializeRows();
            }

        });

    }


    

    // This function does an API call to delete confessions
    // function deleteConfession(id) {
    //   $.ajax({
    //     method: "DELETE",
    //     url: "/api/confessions/" + id
    //   })
    //     .then(function() {
    //       getConfessions(confessionCategorySelect.val());
    //     });
    // }

    // InitializeRows handles appending all of our constructed confession HTML inside confessionContainer
    
    // This function constructs a confession's HTML
    // FACUNDO: code to write to dom 
    function createNewRow(confession) {
        var formattedDate = new Date(confession.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newConfessionCard = $("<div>");
        newConfessionCard.addClass("card");
        var newConfessionCardHeading = $("<div>");
        newConfessionCardHeading.addClass("card-header");

        var newConfessionTitle = $("<h2>");
        var newConfessionDate = $("<small>");
        var newConfessionUser = $("<h5>");
        newConfessionUser.text("Written by: " + confession.User.username);
        newConfessionUser.css({
            float: "right",
            color: "white",
            "margin-top": "-10px"
        });



        var newConfessionCardBody = $("<div>");
        newConfessionCardBody.addClass("card-body");
        var newConfessionBody = $("<p>");
        //   newConfessionTitle.text(confession.title + " ");
        newConfessionBody.text(confession.body);
        newConfessionDate.text(formattedDate);


        newConfessionTitle.append(newConfessionDate);

        //   newConfessionCardHeading.append(newConfessionTitle);
        newConfessionCardHeading.append(newConfessionUser);
        newConfessionCardBody.append(newConfessionBody);
        newConfessionCard.append(newConfessionCardHeading);
        newConfessionCard.append(newConfessionCardBody);
        newConfessionCard.data("confession", confession);

        var trueBtn = $("<button>");
        trueBtn.text("true");
        trueBtn.addClass("true btn btn-danger trueFalseBtn");
        trueBtn.attr("data-confessionId", confession.id)
        trueBtn.val(true);

        var falseBtn = $("<button>");
        falseBtn.text("false");
        falseBtn.addClass("false btn btn-info trueFalseBtn");
        falseBtn.attr("data-confessionId", confession.id)
        falseBtn.val(false)



        newConfessionCardHeading.append(trueBtn);
        newConfessionCardHeading.append(" || ");
        newConfessionCardHeading.append(falseBtn);





        return newConfessionCard;
    }

    function initializeRows() {
        confessionContainer.empty();
        var confessionsToAdd = [];
        for (var i = 0; i < confessions.length; i++) {
            confessionsToAdd.push(createNewRow(confessions[i]));
        }
        confessionContainer.append(confessionsToAdd);
    }

    // This function constructs a confession's HTML
    // FACUNDO: code to write to dom 
     



    // This function figures out which confession we want to delete and then calls deleteConfession
    // function handleConfessionDelete() {
    //   var currentConfession = $(this)
    //     .parent()
    //     .parent()
    //     .data("confession");
    //   deleteConfession(currentConfession.id);
    // }

    // // This function figures out which confession we want to edit and takes it to the appropriate url
    // function handleConfessionEdit() {
    //   var currentConfession = $(this)
    //     .parent()
    //     .parent()
    //     .data("confession");
    //   window.location.href = "/cms?confession_id=" + currentConfession.id;
    // }

    // This function displays a message when there are no confessions
    function displayEmpty(user) {
        var query = window.location.search;
        var partial = "";
        if (user.id) {
            partial = " for User #" + user.id;
        }
        confessionContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({
            "text-align": "center",
            "margin-top": "50px"
        });
        messageH2.html("No confessions yet");
        confessionContainer.append(messageH2);
    }

    //**************************************** */ 
    // SUBMIT USER CONFESSION
    var bodyInput = $("#message-text");
    // var isItTrueInput = $("value");
    var postForm = $("#confess-submit");
    var userSelect = $("#user");
    $(postForm).on("submit", handleFormSubmit);

    // A function for handling what happens when the form to create a new confession is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log("hola");
        var isItTrueInput = $("input[type='radio'][name='inlineRadioOptions']:checked").val();
        // Wont submit the confession if we are missing a body, title, or user
        if (!bodyInput.val().trim() || !isItTrueInput) {
            return;
        }
        // Constructing a newConfession object to hand to the database
        var newConfession = {
            body: bodyInput
                .val()
                .trim(),
            UserId: sessionStorage.getItem("UserId"),
            isItTrue: isItTrueInput
        };

        // If we're updating a confession run updateConfession to update a confession
        // Otherwise run submitConfession to create a whole new confession
        // if (updating) {
        //   newConfession.id = confessionId;
        //   updateConfession(newConfession);
        // }
        // else {
        submitConfession(newConfession);
        // }
        //   }

        // Submits a new confession and brings user to blog page upon completion
        function submitConfession(confession) {
            $.post("/api/confessions", confession, function () {
                window.location.href = "/dashboard";
            });
        }


        // Gets confession data for the current confession if we're editing, or if we're adding to an user's existing confessions
        function getConfessionData(id, type) {
            var queryUrl;
            switch (type) {
                case "confession":
                    queryUrl = "/api/confessions/" + id;
                    break;
                case "user":
                    queryUrl = "/api/users/" + id;
                    break;
                default:
                    return;
            }
            $.get(queryUrl, function (data) {
                if (data) {
                    console.log(data.UserId || data.id);
                    // If this confession exists, prefill our cms forms with its data
                    // titleInput.val(data.title);
                    bodyInput.val(data.body);
                    userId = data.UserId || data.id;
                    // If we have a confession with this id, set a flag for us to know to update the confession
                    // when we hit submit
                    updating = true;
                }
            });
        }

        //   // A function to get Users and then render our list of Users
        //   function getUsers() {
        //     $.get("/api/users", renderUserList);
        //   }
        //   // Function to either render a list of users, or if there are none, direct the user to the page
        //   // to create an user first
        //   function renderUserList(data) {
        //     if (!data.length) {
        //       window.location.href = "/users";
        //     }
        //     $(".hidden").removeClass("hidden");
        //     var rowsToAdd = [];
        //     for (var i = 0; i < data.length; i++) {
        //       rowsToAdd.push(createUserRow(data[i]));
        //     }
        //     userSelect.empty();
        //     console.log(rowsToAdd);
        //     console.log(userSelect);
        //     userSelect.append(rowsToAdd);
        //     userSelect.val(userId);
        //   }

        //   // Creates the user options in the dropdown
        //   function createUserRow(user) {
        // console.log("log listoption " + user);
        //     var listOption = $("<option>");
        //     listOption.attr("value", user.id);
        //     listOption.text(user.firstname);
        //     return listOption;
        //   }

        //   // Update a given confession, bring user to the blog page when done
        //   function updateConfession(confession) {
        //     $.ajax({
        //       method: "PUT",
        //       url: "/api/confessions",
        //       data: confession
        //     })
        //       .then(function() {
        //         window.location.href = "/blog";
        //       });
    }


    $("#loginSubmit").on("click", function () {
        var username = $("#loginUserName").val();
        var password = $("#loginPassword").val();

        console.log(username, password)

        var login = {
            username: username,
            password: password
        }

        $.ajax({
            method: "POST",
            url: "/login",
            data: login
        }).then(function (data) {
            window.location = "/dashboard"
            console.log(data)

            sessionStorage.setItem("UserName", data.username)
            sessionStorage.setItem("UserEmail", data.email)
            sessionStorage.setItem("UserId", data.id)
        })
    })




});
