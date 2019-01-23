
$(window).scroll(function() {

  if ($(this).scrollTop()>500) {
      $( ".fade" ).fadeIn();
  } else {
    $( ".fade" ).fadeOut();
  }

  // Find all links within the staff container
  $( ".staff a" ).each(function(_index, link) {

    // Loop through the list of links adding a click handler for each one
    $(link).on('click', function() {

      // Hide all bios to avoid showing more than one at a time
      $( ".bio" ).hide();

      // Show the bio with the employee data attribute that matches the link clicked
      $('.bio*[data-name=' + $(this).data( "name" ) + ']').show();

      // Hide all name pins to avoid showing more than one at a time
      $( ".staff a" ).removeClass( "selected" );

      // Add class to the clicked link
      $(this).addClass( "selected" );

    });

  });

});
