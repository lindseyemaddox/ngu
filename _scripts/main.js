var $showNav,
	$nav;

function initVars() {
	$showNav 	= $('nav span#nav');
	$nav 	= $('nav > ul');
}

function showNav(){
	$showNav.click(function(){
		$nav.toggleClass('expanded');
		return false;
	});
}

function placeholderSupported() {
    test = document.createElement('input');
    return ('placeholder' in test);
}

function initPlaceholders() {
	if ($('input[placeholder]').length > 0) {
		if (!placeholderSupported()) {
			$('input[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() === input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.val() === '' || input.val() === input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
			$('input[placeholder]').parents('form').submit(function() {
				$(this).find('[placeholder]').each(function() {
					var input = $(this);
					if (input.val() === input.attr('placeholder')) {
						input.val('');
					}
				});
			});
		}
	}
}

function firstLoad() {
	initVars();
	showNav();
	initPlaceholders();
	placeholderSupported();
}

$(function() {
	firstLoad();
});
