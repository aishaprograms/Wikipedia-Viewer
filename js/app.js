$(document).on('click', '#search-button', function() {
    $('#search-form').toggle('slow');
});

$(document).on('click', '#submit-button', function(event) {
    event.preventDefault();
    var searchTerm = $('#search-term').val().trim();
    if (searchTerm === '') {
        alert('Please enter a valid input');
    } else {
        console.log(searchTerm);
        $('#search-form')[0].reset();

        var queryUrl = "https://en.wikipedia.org/w/api.php?action=query" +
            "&generator=search" +
            "&format=json&gsrsearch=" + searchTerm + "&callback=?";
        $.ajax({
            method: "GET",
            url: queryUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                console.log(data.query.pages);
                var pages = data.query.pages;
                for (var key in pages) {
                    var keyLinkDiv = $('<div>');
                    keyLinkDiv.addClass('row');
                    var keyLink = $('<a>');
                    keyLink.text('http://en.wikipedia.org/?curid=' + key)
                    keyLink.attr('href', 'http://en.wikipedia.org/?curid=' + key);
                    keyLink.attr('target', '_blank');
                    keyLinkDiv.append(keyLink);
                    $('#results-div').append(keyLinkDiv);
                }
            },
            error: function(errorMessage) {}
        });
    }
});
