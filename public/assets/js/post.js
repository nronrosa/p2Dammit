 
    var bodyInput = $("#message-text");
    var userId = "5";
    isItTrue = true;
    $("#save-confession").on("click", function(event) {

        var newPost = {
            body: bodyInput.val().trim(),
            isItTrue: isItTrue,
            userId: userId
        };
        $.ajax("/api/confesssions/", {
            type: "POST",
            data: newPost
          }).then(
            function() {
              console.log("created new post");
              // Reload the page to get the updated list
              location.reload();
            }
          );
        
        
        // $.ajax({
        //     method: "POST",
        //     url: "/api/confessions/",
        //     data: newPost
        //   })
        console.log(newPost);
    });

    // $(".create-form").on("submit", function(event) {
    //     // Make sure to preventDefault on a submit event.
    //     event.preventDefault();
    
    //     var newCat = {
    //       name: $("#ca").val().trim(),
    //       sleepy: $("[name=sleepy]:checked").val().trim()
    //     };
    
    //     // Send the POST request.
    
    //   });
    
      
    


 