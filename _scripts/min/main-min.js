// Get the container element
// Loop through the buttons and add the active class to the current/clicked button
for(var btnContainer=document.getElementById("nav"),btns=btnContainer.getElementsByClassName("loc"),i=0
// Get all buttons with class="btn" inside the container
;i<btns.length;i++)btns[i].addEventListener("click",function(){var e=document.getElementsByClassName("active");e[0].className=e[0].className.replace(" active",""),this.className+=" active"});