// ready document
$(document).ready(function() {
  // enter key event to serve as button 
    $("#Term").keypress(function (e) {
        var key = e.which;
        if (key == 13) // enter key is true
        {
            $("#search-Button").click()
            return false;
        }
    });
	// button click event validates search field and calls runSearch function
	$("#search-Button").on("click", function () {
		// capture srchTerm from input field
		var someTerm;
        
		someTerm = $("#Term").val();
		// search only on not null values
		if (someTerm.length > 0) {
			beginSearch(someTerm);
		} else {
			someTerm = "nothing";
			beginSearch(someTerm);
		}	
	});
});

function beginSearch(srchString) {
	// declare wikipedia search url variable
	var wikiURL;
	//construct wikiURL string
	wikiURL = 'https://en.wikipedia.org/w/api.php?';
	wikiURL += 'action=query&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=2&exlimit=max&generator=search&gsrsearch=' + srchString;
	wikiURL += '&format=json&callback=?';

	$.getJSON(wikiURL, function(result) {
		var	wikiResultHTML = "";

		$.each(result.query.pages, function(i, val) {
			
			wikiResultHTML += '<div class="wikiResultTable"><a ' + link(val.pageid) + '>' + val.title + '</a><br /> ' + val.extract + '<br /><br /></div>';
		});

	$("#wikiResults").html(wikiResultHTML);
	});	
	
	function link(pageID) {
		return 'href="https://en.wikipedia.org/?curid=' + pageID + '" target="_blank"';
	}
}

$("#Reset").click(function() {
    location.reload(true);
});