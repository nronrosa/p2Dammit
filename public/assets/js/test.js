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
        confessionsToAdd.push(createpPreviousPost(confessions[i]));
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