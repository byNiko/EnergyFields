( () => {
	const btns = document.querySelectorAll( '.button--back' );
	btns.forEach( ( btn ) => {
		btn.addEventListener( 'click', ( e ) => {
			history.back();
		} );
	} );
} )();
