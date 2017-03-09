var topics = ["The Simpsons", "Rick and Morty", "Family Guy", 
				"Game of Thrones", "The Walking Dead", "Breaking Bad", 
				"Parks and Recreation", "Seinfeld", "Arrested Development"]; //Array of initial buttons

var queryURL;

function renderButtons() { //function to go through array and render the buttons to the DOM

	$("#buttons").empty(); //clear old buttons before re-redering

    for (var i = 0; i < topics.length; i++) { // for loop to go through the whole array

    	$("#buttons").append($("<button>") //append a button tag to the div with id of buttons
	      	.text(topics[i].replace(/[+]/g, " "))) // puts the array title of the current index the for loop is working through
	      	.addClass("btn btn-default tvShowBtn") // gives that button some bootstrap classes and a class of my own
	      	.data("searchInput", topics[i]);
	      	    }

}


$(document).on("click", "#submit-button", function() { //document click event on element with id of submit
	event.preventDefault(); // prevents the submit button from acting like a form, which would be its default


	var searchInput = $("#search-term").val() // store the users entry search term as a variable, trim of leading & trailing spaces
						.trim()
						.replace(/\s/g,"+") //replace spaces to +
						.replace(/[^A-Za-z0-9+]/g,"") //removes non alpha-numeric characters
						.toLowerCase(); //changes all alpha characters to lower case

	$("#search-term").val(''); //clear the search field after a submit by the user
	topics.push(searchInput); // push the searchInput into the topics array
	console.log(topics);
	renderButtons([topics]);
});

$(document).ready(function() { //when the document loads

	renderButtons([topics]); //render the initial buttons from the default array
});

$(document).on("click", ".tvShowBtn", function(){
	
	displayGifs($(this).data(2, "searchInput"));
});


//ajax call function, receiving endpoint index and term to search

function displayGifs() {

	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchInput + "&api_key=dc6zaTOxFJmzC"

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
