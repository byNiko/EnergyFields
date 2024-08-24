const sections = document.querySelectorAll( '.scroll-target' );
const linksCont = document.querySelector( '.inpage-links' );
if ( sections && linksCont ) {
	const links = linksCont.querySelectorAll( '.inpage-link' );
	const activeClass = 'is-active';

	const observer = new IntersectionObserver( ( entries ) => {
		for ( const entry of entries ) {
			if ( entry.boundingClientRect.y < window.innerHeight - 200 ) {
				links.forEach( ( l ) => {
					l.classList.remove( activeClass );
				} );
				linksCont.querySelector( `[href="#${ entry.target.id }"]` ).classList.add( activeClass );
			}
		}
	}, {
		rootMargin: '-50% 0px',
	} );
	for ( let i = 0; i < sections.length; i++ ) {
		observer.observe( sections[ i ] );
	}
}

