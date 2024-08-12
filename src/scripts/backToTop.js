( () => {
	const target = document.querySelector( '#back-to-top-container' );
	const contHeight = document.querySelector( '.inner-page' ).offsetHeight;
	const h = window.visualViewport.height;

	if ( contHeight > h ) {
		target.style.display = 'block';
	}
} )();
