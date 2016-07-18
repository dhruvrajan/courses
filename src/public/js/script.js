$(document).ready(function() {
  $('#progress-bar').hide();
});

$('#search').click(function() {
  var query = $('#input').val().trim();
  $.ajax({
    type: 'POST',
    url: '/key',
    dataType: 'json',
    data: {
      'search': query
    },
    beforeSend: function() {
      $('#data').empty();
      $('#progress-bar').show();
    },
    success: function(data) {
      if (data.length === 0) {
        $('#data').html(
          '<div class="alert alert-warning" role="alert">' +
            'No results found.' +
          '</div>'
        );
      }
      $.each(data, function(i, e) {
        $('#data').append(
          '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
              '<h3 class="panel-title">' +
                '<strong>' + e['key'] + ' - ' + e['name'] + '</strong>' +
              '</h3>' +
            '</div>' +
            '<div class="panel-body">' +
              e['description'] +
            '</div>' +
          '</div>'
        );
      });
    },
    complete: function() {
      $('#progress-bar').hide();
    },
    error: function() {
      $('#data').html(
        '<div class="alert alert-danger" role="alert">' +
          'Error. Please try again later.' +
        '</div>'
      );
    }
  });
});
