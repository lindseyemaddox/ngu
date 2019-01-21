$('body').addClass('.poop').scrollspy({ target: 'nav' });

$('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh');

});

$(window).scroll(function() {

    if ($(this).scrollTop()>500)
     {
        $('.fade').fadeIn();
     }
    else
     {
      $('.fade').fadeOut();
     }
 });
