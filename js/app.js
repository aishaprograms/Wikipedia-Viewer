$(document).on('click', '#search-button', function() {
    $('#search-form').toggle('slow');
});

$(document).on('click', '#submit-button', function(event) {
    event.preventDefault();
    var searchTerm = $('#search-term').val().trim();
    if (searchTerm === '') {
        alert('Please enter a valid input');
    } else {
        $('#search-form')[0].reset();
        var queryUrl = "https://en.wikipedia.org/w/api.php?format=json" +
            "&action=query&generator=search&gsrnamespace=0&gsrlimit=10" +
            "&prop=pageimages|extracts&pilimit=max&exintro&explaintext&" +
            "exsentences=1&exlimit=max&gsrsearch=" + searchTerm + "&callback=?";
        $.ajax({
            method: "GET",
            url: queryUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                // List of pages related to search
                createSearchResultDivs(data);
            },
            error: function(errorMessage) {
                console.log(errorMessage);
            }
        });
    }
});

function createSearchResultDivs(data) {
    var pages = data.query.pages;
    for (var pageKey in pages) {
        var pageKeyLinkDiv = pageKeyToDiv(pageKey);
        var pageKeyLink = pageKeyToLink(pageKey);
        var pageKeyTitle = pageKeyToTitle(pages, pageKey);
        var pageKeyText = pageKeyToText(pages, pageKey);
        pageKeyLinkDiv.append(pageKeyTitle);
        pageKeyLinkDiv.append(pageKeyText);
        pageKeyLinkDiv.append(pageKeyLink);
        $('#results-div').append(pageKeyLinkDiv);
    }
}

// Makes a div for each page id returned from a search
function pageKeyToDiv(pageKey) {
    var pageKeyLinkDiv = $('<div>');
    pageKeyLinkDiv.addClass('row result');
    return pageKeyLinkDiv;
}

// Takes the page id and converts it to a Wikipedia link
function pageKeyToLink(pageKey) {
    var pageKeyLink = $('<a>');
    pageKeyLink.text('http://en.wikipedia.org/?curid=' + pageKey);
    pageKeyLink.attr('href', 'http://en.wikipedia.org/?curid=' + pageKey);
    pageKeyLink.attr('target', '_blank');
    return pageKeyLink;
}

// Takes the page id and extracts its to a Wikipedia title
function pageKeyToTitle(pages, pageKey) {
    var pageKeyTitle = $('<h4>');
    pageKeyTitle.text(pages[pageKey].title);
    return pageKeyTitle;
}

// Takes the page id and extracts its to a Wikipedia text
function pageKeyToText(pages, pageKey) {
    var pageKeyText = $('<p>');
    pageKeyText.html(pages[pageKey].extract);
    return pageKeyText;
}
