import './mapInfoPane.css';
// import { map } from './mapLeaflet';
// export const infoPane = ( map ) => map.createPane( 'info-pane', document.getElementById( 'map' ) );

// // crewate popup, set contnet
// export const popup = L.popup( {
// 	pane: 'fixed',
// 	className: 'popup-fixed test',
// 	autoPan: false,
// } ).setContent( 'testing' );

// marker.bindPopup( popup ).on( 'click', fitBoundsPadding );

// // remove all animation class when popupclose
// map.on( 'popupclose', function( e ) {
// 	removeAllAnimationClassFromMap();
// } );

// // ------------------------------------------------

// const mediaQueryList = window.matchMedia( '(min-width: 700px)' );

// mediaQueryList.addEventListener( 'change', ( event ) => onMediaQueryChange( event ) );

// onMediaQueryChange( mediaQueryList );

// function onMediaQueryChange( event ) {
// 	if ( event.matches ) {
// 		document.documentElement.style.setProperty( '--min-width', 'true' );
// 	} else {
// 		document.documentElement.style.removeProperty( '--min-width' );
// 	}
// }

// function fitBoundsPadding( e ) {
// 	alert( 'hi' );
// 	removeAllAnimationClassFromMap();
// 	// get with info div
// 	const boxInfoWith = document.querySelector(
// 		'.leaflet-popup-content-wrapper'
// 	).offsetWidth;

// 	// add class to marker
// 	e.target._icon.classList.add( 'animation' );

// 	// create a feature group, optionally given an initial set of layers
// 	const featureGroup = L.featureGroup( [ e.target ] ).addTo( map );

// 	// check if attribute exist
// 	const getPropertyWidth =
//     document.documentElement.style.getPropertyValue( '--min-width' );

// 	// sets a map view that contains the given geographical bounds
// 	// with the maximum zoom level possible
// 	map.fitBounds( featureGroup.getBounds(), {
// 		paddingTopLeft: [ getPropertyWidth ? -boxInfoWith : 0, 10 ],
// 	} );
// }

// function removeAllAnimationClassFromMap() {
// 	// get all animation class on map
// 	const animations = document.querySelectorAll( '.animation' );
// 	animations.forEach( ( animation ) => {
// 		animation.classList.remove( 'animation' );
// 	} );

// 	// back to default position
// 	map.setView( [ lat, lng ], zoom );
// }
