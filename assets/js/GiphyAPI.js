var topics = ["The Simpsons", "Rick and Morty", "Family Guy", 
				"Game of Thrones", "The Walking Dead", "Breaking Bad", 
				"Parks and Recreation", "Seinfeld", "Arrested Development"]; //Array of initial buttons

function renderButtons() { //function to go through array and render the buttons to the DOM

    for (var i = 0; i < topics.length; i++) { // for loop to go through the whole array
    	
      	$("#buttons").append($("<button>") //append a button tag to the div with id of buttons
	      	.text(topics[i])) // puts the array title of the current index the for loop is working through
	      	.addClass("btn btn-default tvShowBtn"); // gives that button some bootstrap classes and a class of my own
	      	    }

}



$(document).on("click", "#submit-button", function() { //document click event on element with id of submit
	event.preventDefault(); // prevents the submit button from acting like a form, which would be its default


	var searchInput = $("#search-term").val().trim() // store the users entry search term as a variable, trim of leading & trailing spaces

	$("#search-term").val(''); //clear the search field after a submit by the user
	topics.push(searchInput); // push the searchInput into the topics array
	console.log(topics);
});

$(document).ready(function() { //when the document loads

	renderButtons([topics]); //render the initial buttons from the default array
});
