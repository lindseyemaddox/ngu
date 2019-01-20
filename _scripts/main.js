$('body').scrollspy({ target: 'nav' });

$('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh');
});
