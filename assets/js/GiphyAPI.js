var key = "&api_key=dc6zaTOxFJmzC";

var urlToAPI = "https://api.giphy.com/v1/gifs/search?q="

var queryURL = "";

var topics = ["The Simpsons", "Rick and Morty", "Family Guy",
    "Game of Thrones", "The Walking Dead", "Breaking Bad",
    "Parks and Recreation", "Seinfeld", "Arrested Development"]; //Array of initial buttons

function renderButtons() { //function to go through array and render the buttons to the DOM

    $("#buttons").empty(); //clear old buttons before re-redering

    for (var i = 0; i < topics.length; i++) { // for loop to go through the whole array

        $("#buttons").append($("<button>") //append a button tag to the div with id of buttons
            .text(topics[i].replace(/[+]/g, " ")) // puts the array title of the current index the for loop is working through
            .addClass("btn btn-default tvShowBtn") // gives that button some bootstrap classes and a class of my own
            .data("searchInput", topics[i]));
    }

}


$(document).on("click", "#submit-button", function() { //document click event on element with id of submit
    event.preventDefault(); // prevents the submit button from acting like a form, which would be its default

    var searchInput = $("#search-term").val() // store the users entry search term as a variable, trim off leading & trailing spaces
        .trim()
        .replace(/\s/g, "+") //replace spaces to +
        .replace(/[^A-Za-z0-9+]/g, "") //removes non alpha-numeric characters
        .toLowerCase(); //changes all alpha characters to lower case

    $("#search-term").val(''); //clear the search field after a submit by the user

    	displayGifs(searchInput);

    	topics.push(searchInput); // push the searchInput into the topics array

    	console.log(topics);

    	renderButtons([searchInput]);
});


$(document).on("click", ".tvShowBtn", function() {

    displayGifs($(this).data("searchInput"));
});

function displayGifs(searchInput) {

    queryURL = urlToAPI + searchInput + key

    console.log(queryURL);

    //ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        //transform data function
        console.log(response);

        //empty current contents of screen to add new gifs
        

        $("#results1").empty();
        $("#results2").empty();
        $("#results3").empty();

        	//add new elements to DOM
        	for (var i = 0; i < response.data.length; i++) {

        		//append this element to DOM
        		var newDiv = $("<div>").addClass("result-div");

        		var newGif = $("<img>")
        			.addClass("img-responsive result")
        			.attr("src", response.data[i].images.original_still.url)
        			.data("orig", response.data[i].images.original_still.url)
        			.data("gif", response.data[i].images.original.url)
        			.data("mode", "0")
        			.appendTo(newDiv);

        		var x = i % 3;

        		//assign to DOM by column

        		var columnAssign = "#results" + x;
        		$(columnAssign).append(newDiv); 

        	} 

    })

}


$(document).on("click", ".result", function() {

	if ($(this).data("mode") === 0) {


		$(this).attr("src", $(this).data("gif"))

			.data("mode", "1");

	} else {


		$(this).attr("src", $(this).data("orig"))

			.data("mode", "0");
	}
});


$(document).ready(function() { //when the document loads

    renderButtons([topics]); //render the initial buttons from the default array

    displayGifs();
});

