$(window).scroll(function(){500<$(this).scrollTop()?$(".fade").fadeIn():$(".fade").fadeOut(),$(".greenup").click(function(){var e;document.getElementById("greenup").classList.add("show")}),$(".greenup").click(function(){$(".greenup").addClass("selected")})});
// 1. Add a `data` attribute to identify each link/bio combo. Either an index like a number or maybe even the name of the person
// 2. Find all the `.greenup` links on the page using jQuery, and add a click handler to them
// 3. In that click handler I'd find the matching bio to display based on the data attribute attached to the link
// 4. I'd call `.toggle()` on the bio to display and hide it once the link was clicked (edited)
// * If you need to only show one at a time, which I suspect you do, I'd hide all bios when any link is clicked then toggle the one that matches the data attribute of the link clicked