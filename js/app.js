$(document).on('click', '#search-button', function() {
    $('#search-form').toggle('slow');
});

// var queryUrl = 'https://en.wikipedia.org/w/api.php?' + 'format=json' + '&action=query' + '&generator=search' +
//     '&prop=pageimages|extracts' + '&titles=cats';

// $.ajax({
//     url: queryUrl,
//     method: 'get',
//     success: function(response) {
//         console.log(response);
//     }
// });

// $.ajax({
//     url: '//en.wikipedia.org/w/api.php',
//     data: { action: 'query', list: 'search', srsearch: 'Richard Feynman', format: 'json' },
//     dataType: 'jsonp',
//     success: function(x) {
//         console.log('title', x.query.search[0].title);
//     }
// });
