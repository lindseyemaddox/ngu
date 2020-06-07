$(window).scroll(function(){500<$(this).scrollTop()?$(".fade").fadeIn():$(".fade").fadeOut(),
// Find all links within the staff container
$(".staff a").each(function(a,e){
// Loop through the list of links adding a click handler for each one
$(e).on("click",function(){
// Hide all bios to avoid showing more than one at a time
$(".bio").hide(),
// Show the bio with the employee data attribute that matches the link clicked
$(".bio*[data-name="+$(this).data("name")+"]").show(),
// Hide all name pins to avoid showing more than one at a time
$(".staff a").removeClass("selected"),
// Add class to the clicked link
$(this).addClass("selected")})})});