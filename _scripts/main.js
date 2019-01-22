
$(window).scroll(function() {

    if ($(this).scrollTop()>500) {
        $('.fade').fadeIn();
    } else {
      $('.fade').fadeOut();
    }

    $(".greenup").click(function(){
      var element = document.getElementById("greenup");
      element.classList.add("show");
    });

    $(".greenup").click(function(){
      $(".greenup").addClass("selected");
    });

 });
