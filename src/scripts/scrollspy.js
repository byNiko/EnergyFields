import { gsap } from './gsap.min.js';
import { ScrollTrigger } from './ScrollTrigger.min.js';
const scrollSections = gsap.utils.toArray( '.scroll-target' );
const links = gsap.utils.toArray( '.inpage-links a' );
const activeClass = 'is-active';
scrollSections.forEach( ( section, i ) => {
	const link = links[ i ];
	ScrollTrigger.create( {
		trigger: section,
		start: 'top+=10% center+=30%',
		// end: 'bottom center',
		onEnter: ( t ) => {
			links.forEach( ( l ) => {
				l.classList.remove( activeClass );
			} );
			link.classList.add( activeClass );
		},
		onEnterBack: () => {
			links.forEach( ( l ) => {
				l.classList.remove( activeClass );
			} );
			link.classList.add( activeClass );
		},
		onLeave: () => {
			links.forEach( ( l ) => {
				l.classList.remove( activeClass );
			} );
			// link.classList.add( activeClass );
		},
		onLeaveBack: () => {
			links.forEach( ( l ) => {
				l.classList.remove( activeClass );
			} );
			// link.classList.add( activeClass );
		},
		// markers: true,
	} );
} );

links.forEach( ( link ) => link.addEventListener( 'click', trackActive ) );
function trackActive( e ) {
	this.classList.add( 'is-active' );
}
