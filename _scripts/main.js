
$(window).scroll(function() {

  if ($(this).scrollTop()>500) {
      $('.fade').fadeIn();
  } else {
    $('.fade').fadeOut();
  }

  // Find all links within the staff container
  $('.staff a').each(function(_index, link) {

    // Loop through the list of links adding a click handler for each one
    $(link).on('click', function() {

      // Hide all bios to avoid showing more than one at a time
      $('.bio').hide();

      // Show the bio with the employee data attribute that matches the link clicked
      $('.bio*[data-name=' + $(this).data( "name" ) + ']').show();

      // Hide all name pins to avoid showing more than one at a time
      $(".staff a").removeClass( "selected" );

      // Add class to the clicked link
      $(this).addClass("selected");

    });

  });

});





// 1. Add a `data` attribute to identify each link/bio combo. Either an index like a number or maybe even the name of the person
// 2. Find all the `.greenup` links on the page using jQuery, and add a click handler to them
// 3. In that click handler I'd find the matching bio to display based on the data attribute attached to the link
// 4. I'd call `.toggle()` on the bio to display and hide it once the link was clicked
// * If you need to only show one at a time, which I suspect you do, I'd hide all bios when any link is clicked then toggle the one that matches the data attribute of the link clicked
