export default function makeSlider() {
	// Select all slides
	const slides = document.querySelectorAll( '.popup--slide' );
	if ( ! slides ) {
		return;
	}
	// loop through slides and set each slides translateX
	slides.forEach( ( slide, indx ) => {
		slide.style.transform = `translateX(${ indx * 100 }%)`;
	} );

	// select next slide button
	const nextSlide = document.querySelector( '.popup--slide-btn-next' );
	if ( ! nextSlide ) {
		return;
	}
	// current slide counter
	let curSlide = 0;
	// maximum number of slides
	const maxSlide = slides.length - 1;

	// add event listener and navigation functionality
	nextSlide.addEventListener( 'click', function( e ) {
		L.DomEvent.stopPropagation( e ); // stop marker click from hitting 'map' object.
		// check if current slide is the last and reset current slide
		if ( curSlide === maxSlide ) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		//   move slide by -100%

		moveSlides( slides, curSlide );
	} );

	// select next slide button
	const prevSlide = document.querySelector( '.popup--slide-btn-prev' );
	if ( ! prevSlide ) {
		return;
	}
	// add event listener and navigation functionality
	prevSlide.addEventListener( 'click', function( e ) {
		L.DomEvent.stopPropagation( e ); // stop marker click from hitting 'map' object.
		// check if current slide is the first and reset current slide to last
		if ( curSlide === 0 ) {
			curSlide = maxSlide;
		} else {
			curSlide--;
		}

		//   move slide by 100%
		moveSlides( slides, curSlide );
	} );
}

function moveSlides( slides, curSlide ) {
	slides.forEach( ( slide, indx ) => {
		slide.style.transform = `translateX(${ 100 * ( indx - curSlide ) }%)`;
	} );
}
