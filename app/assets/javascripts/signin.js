$(document).ready(function() {
  // signin
  function login(data) {
    $(".sign-in-form").slideToggle('slow');
    $("#sign-in-link").hide();
    $("#sign-up-link").hide();
    user_id = data.id;
    // signout show
    var $div = $('<div>').addClass("log-out-link")
    var a = $('<a>').text("Log out " + data.username);
    $div.append(a);
    a.attr('id','logout');
    $('#inner-nav').append($div);
    // setup settings
    var settings = data.settings;
    for (var i = 0; i < settings.length; i++) {
      setUpSettings(settings[i]);
    }
  }

  // setup settings after user log in
  var setUpSettings = function(settings) {
    var visualiser_id = settings.visualiser_id;
    var parameters = settings.settings;
    for (var key in parameters) {
      $('#'+ key).val(parameters[key]);
    }
  };

  // check if already logged in
  $.ajax({
    url: 'session',
    method: 'GET',
    success: function(data) {
      data.id && login(data);
    }
  });
  // ajax sign in
  $("#sign-in-ajax").on('ajax:success', function (xhr, data) {
    login(data);
  })

  $("#inner-nav").on('click',"#logout", function() {
    var _el = this;
    $.ajax({
      url: '/sessions/',
      type: 'DELETE',
      success: function() {
        $(_el).remove();
        // $("#sign-in-link").slideToggle('slow');
        $("#sign-up-link").slideToggle('slow');
        $(".sign-in-form").slideToggle('slow');
      }
    });
  });

});