var key = "&api_key=dc6zaTOxFJmzC"; //Giphy public key

var urlToAPI = "https://api.giphy.com/v1/gifs/search?q=" //giphy url search input

var queryURL = ""; //define queryURL as an empty string

var topics = ["The Simpsons", "Rick and Morty", "Family Guy", //Array of initial buttons
    "Game of Thrones", "The Walking Dead", "Breaking Bad",
    "Parks and Recreation", "Seinfeld", "Arrested Development"
]; 

var defaultGifs = "tv+shows";

var limit = 10;



function renderButtons() { //function to go through array and render the buttons to the DOM

    $("#buttons").empty(); //clear old buttons before re-redering

    for (var i = 0; i < topics.length; i++) { // for loop to go through the whole array

        $("#buttons").append($("<button>") //append a button tag to the div with id of buttons
            .text(topics[i].replace(/[+]/g, " ")) // puts the array title of the current index the for loop is working through
            .addClass("btn btn-default tvShowBtn") // gives that button some bootstrap classes and a class of my own
            .data("searchInput", topics[i])); // attach a data-searchInput of the topic indexs name
    }

}


$(document).on("click", "#submit-button", function() { //document click event on element with id of submit
    event.preventDefault(); // prevents the submit button from acting like a form, which would be its default

    var searchInput = $("#search-term").val() // store the users entry search term as a variable
        .trim() //trim off leading & trailing spaces
        .replace(/\s/g, "+") //replace spaces to +
        .replace(/[^A-Za-z0-9+]/g, "") //removes non alpha-numeric characters (except the + symbol)
        .toLowerCase(); //changes all alpha characters to lower case

    limit = $("#num-records-select").val();

    $("#search-term").val(''); //clear the search field after a submit by the user

    displayGifs(searchInput); // call the API function

    topics.push(searchInput); // push the searchInput into the topics array

    console.log(topics);

    renderButtons([searchInput]); // call the redener Buttons function
});


$(document).on("click", ".tvShowBtn", function() { //when clicking a populated button with the tcShowBtn Class

    displayGifs($(this).data("searchInput")); // call the desplay gifs function based off the data-searchInput value
});

function displayGifs(searchInput) { //display gifs function will populate the results area with the proper gifs

    queryURL = urlToAPI + searchInput + key //queryURL will be the endpoint + the applicable search term + the public key

    console.log(queryURL); //used to check that the total url is correct
    
    $.ajax({            //ajax call
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response); //log the response JSON of the API call 

        $("#results0").empty(); //empty the previous contents of the three columns of gif results before populating new results
        $("#results1").empty();
        $("#results2").empty();

        for (var i = 0; i < limit/*response.data.length*/; i++) { //cycle through the response

            var newDiv = $("<div>").addClass("result-div"); //add a new div to house each gif result

            var newGif = $("<img>") // add and img tag for each gif
                .addClass("img-responsive result") // give that gif a bootstrap class for responsivnesss and my own class for refrence
                .attr("src", response.data[i].images.original_still.url) // add a src sttribute with the defualt still url
                .data("orig", response.data[i].images.original_still.url) // add a data-orig with the still url
                .data("gif", response.data[i].images.original.url) // add a data-gif with the animated url
                .data("mode", "still") // add a data-mode used to toggle play/pause
                .appendTo(newDiv); // append the img into the new Div

            var rating = $("<div>").addClass("rating")
                .text(response.data[i].rating.toUpperCase())
                .appendTo(newDiv);

            var x = i % 3; 
            var columnAssign = "#results" + x; //split the results into the 3 columns (currently not working right it is only splitting to 2, html or js issue??)

            $(columnAssign).append(newDiv); //append the newDivs into the results area by columns

        }

    })

}


$(document).on("click", ".result", function() { // function that when clicking the gifs that have the class .result will play/pause

    console.log($(this).data("mode")); //logs the data-mode of the gif I used for de-bugging an issue

    if ($(this).data("mode") === "still") {  //if the gif has a cuurent data-mode of 'still' then run some code
        $(this).attr("src", $(this).data("gif")) //change the src attribute of the clicked gif to the value of its data-gif
        .data("mode", "animate") //change the data-mode to 'animate' so that the next click would run the else statement
    } else { // if the giff does not have the data-mode value of 'still' run some code (by default if it is not still it will be animate)
        $(this).attr("src", $(this).data("orig")) //change the src attribute of the clicked gif to the value of its data-orig
        .data("mode", "still") //change the data-mode to 'still' so that the next click would run the if statement
    }
});


$(document).ready(function() { //when the document loads

    renderButtons(topics); //render the initial buttons from the default array

    displayGifs(defaultGifs); //display some default gifs (without a search term in place these are pretty generic, look into using something to make them have better context)
});
