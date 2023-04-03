(function ($) {
	'use strict';

	jQuery(document).on('ready', function () {

		/*PRELOADER JS*/
		$(window).on('load', function () {
			$('.status').fadeOut();
			$('.preloader').delay(350).fadeOut('slow');
		});
		/*END PRELOADER JS*/

		/*START MENU JS*/
		$('a.page-scroll').on('click', function (e) {
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top - 50
			}, 1500);
			e.preventDefault();
		});

		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 100) {
				$('.menu-top').addClass('menu-shrink');
				$('#logo').attr('src', 'assets/img/logo.png');
			} else {
				$('.menu-top').removeClass('menu-shrink');
				$('#logo').attr('src', 'assets/img/logo-inverted.png');
			}
		});

		$(document).on('click', '.navbar-collapse.in', function (e) {
			if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
				$(this).collapse('hide');
			}
		});
		/*END MENU JS*/

		/*START PARTNER LOGO*/
		$('.partner').owlCarousel({
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			items: 4,
			itemsDesktop: [1199, 3],
			itemsDesktopSmall: [979, 3]
		});
		/*END PARTNER LOGO*/

		/* START COUNTDOWN JS*/
		$('.counter_feature').on('inview', function (event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$(this).find('.timer').each(function () {
					var $this = $(this);
					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 2000,
						easing: 'swing',
						step: function () {
							$this.text(Math.ceil(this.Counter));
						}
					});
				});
				$(this).unbind('inview');
			}
		});
		/* END COUNTDOWN JS */

		/*START PROGRESS BAR*/
		$('.progress-bar > span').each(function () {
			var $this = $(this);
			var width = $(this).data('percent');
			$this.css({
				'transition': 'width 2s'
			});

			setTimeout(function () {
				$this.appear(function () {
					$this.css('width', width + '%');
				});
			}, 500);
		});
		/*END PROGRESS BAR*/

		// Start Contact Form  
		$('#submitButton').click(function () {
			event.preventDefault();
			const fields = ['firstName', 'email', 'description'];
			var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
			let body = {
				firstName: '',
				email: '',
				description: ''
			};
			let submit = true;
			fields.forEach(field => {
				if (!$(`#${field}`).val() || !pattern.test($('#email').val())) {
					submit = false;
					$('#danger').show('slow', 'swing', function(){
						setTimeout(()=> {$('#danger').hide('slow')}, 1000);
					});
				}
				else {
					body[field] = $(`#${field}`).val();
				}
			})
			if (submit) {
				fetch('https://email-servo.herokuapp.com/codemavericks', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				})
					.then(response => response.json())
					.then(response => console.log(JSON.stringify(response)))
			}



		})

		/*START GOOGLE MAP*/
		// function initialize() {
		// 	var mapOptions = {
		// 		zoom: 15,
		// 		scrollwheel: false,
		// 		center: new google.maps.LatLng(40.7127837, -74.00594130000002)
		// 	};
		// 	var map = new google.maps.Map(document.getElementById('map'),
		// 		mapOptions);
		// 	var marker = new google.maps.Marker({
		// 		position: map.getCenter(),
		// 		icon: 'assets/img/map_pin.png',
		// 		map: map
		// 	});
		// }
		// google.maps.event.addDomListener(window, 'load', initialize);
		/*END GOOGLE MAP*/
	});

	/*START MIXITUP JS*/
	$('.work_all_item').mixItUp();
	// jQuery Lightbox
	$('.lightbox').venobox({
		numeratio: true,
		infinigall: true
	});
	/*END MIXITUP JS*/

	/*START WOW ANIMATION JS*/
	new WOW().init();
	/*END WOW ANIMATION JS*/

})(jQuery);




