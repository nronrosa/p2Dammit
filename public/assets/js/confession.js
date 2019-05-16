$(document).ready(function () {

    var confessionContainer = $(".confession-container");
    var confessions;
    var loggedInUser = {
        id: sessionStorage.getItem("UserId"),
        username: sessionStorage.getItem("UserName"),
        email: sessionStorage.getItem("UserEmail")
    }
    
    // This function grabs confessions from the database and updates the view
    function getConfessions(user) {

        $.get("api/confessions", function (data) {

            confessions = data;
            if (!confessions || !confessions.length) {
                displayEmpty(user);
            } else {
                initializeRows();
            }
        });
    }
    function createNewRow(confession) {
        var formattedDate = new Date(confession.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY");
        var newConfessionCard = $("<div>");
        newConfessionCard.addClass("card");
        var newConfessionCardHeading = $("<div>");
        newConfessionCardHeading.addClass("card-header");
        var newConfessionTitle = $("<h2>");
        var newConfessionDate = $("<small>");
        var newConfessionUser = $("<h5>");
        newConfessionUser.text("Written by: " + confession.User.username);
        newConfessionUser.css({
            
            color: "white",
            "margin-top": "-10px"
        });
        // appends the date, user
        newConfessionTitle.append(newConfessionDate);
        newConfessionCardHeading.append(newConfessionUser);
        // creates div card-body
        var newConfessionCardBody = $("<div>");
        newConfessionCardBody.addClass("card-body");
        var newConfessionBody = $("<p>");
        newConfessionBody.text(confession.body);
        newConfessionCard.html("<h6>" + formattedDate + "</h6>");
        // creates true button
        var trueBtn = $("<button>");
        trueBtn.text("true");
        trueBtn.addClass("btn btn-primary trueFalseBtn btnValueTrue");
        trueBtn.attr("data-confessionId", confession.id).attr("data-toggle", "modal")
            .attr("data-target", ".bd-example-modal-lg")
        trueBtn.val(1);
        // creates false button
        var falseBtn = $("<button>");
        falseBtn.text("false");
        falseBtn.addClass("btn btn-danger trueFalseBtn btnValueFalse");
        falseBtn.attr("data-confessionId", confession.id).attr("data-toggle", "modal")
            .attr("data-target", ".bd-example-modal-lg")
        falseBtn.val(0)
        // appends confession body
        // newConfessionCard.append(formattedDate);
        newConfessionCardBody.append(newConfessionBody);
        newConfessionCard.append(newConfessionCardHeading);
        newConfessionCardHeading.append(trueBtn);
        newConfessionCardHeading.append(" || ");
        newConfessionCardHeading.append(falseBtn);
        newConfessionCard.append(newConfessionCardBody);
        newConfessionCard.data("confession", confession);
        newConfessionCard;


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
    //    w.location.href = "/cms?confession_id=" + currentConfession.id;
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

        var isItTrueInput = $("input[type='radio'][name='inlineRadioOptions']:checked").val();

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
        submitConfession(newConfession);
        function submitConfession(confession) {
            $.post("/api/confessions", confession, function () {
                window.location.href = "/dashboard";
            });
        }
    }


    $("#loginSubmit").on("click", function (evt) {
        evt.preventDefault();
        console.log("LOGIN CLICKED--------------");
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
            window.location = "/dashboard";
            console.log(data);
            sessionStorage.setItem("UserName", data.username);
            sessionStorage.setItem("UserEmail", data.email);
            sessionStorage.setItem("UserId", data.id);
        });
    });

    $("#logOutBtn").on("click",function (evt) {
        evt.preventDefault();
        $.ajax({
            method: "GET",
            url: "/logout"
          
        }).then(function () {
            // sessionStorage = {};
            
            window.location = "/dashboard";
        });
    });

    $(document).on("click ", ".trueFalseBtn", function (event) {
        event.preventDefault();
        var buttonValueClicked = $(this).val();
        var clickedConfessionId = $(this).attr("data-confessionid");
        console.log("What button value was clicked: " + buttonValueClicked);
        console.log("what is the confession clicked:" + clickedConfessionId);
        $.get("/api/confessions/" + clickedConfessionId, function (data) {
            console.log("from DB isItTrue val: " + data.isItTrue);
            var confessionIsItTrueValue = data.isItTrue;
            if (buttonValueClicked == confessionIsItTrueValue) {
                console.log("show the TRUE image modal");
                // alert( "Your guess was correct");
                $("#trueModal").modal('show');
            } else {
                console.log("show the WRONG Image modal");
                // alert(data.body + " is False")
                $("#falseModal").modal('show');
            }
        });
    });

    console.log("sessionStorage =",sessionStorage);
    if (loggedInUser){
        getConfessions(loggedInUser);
    }
});