import L from 'leaflet';
import 'leaflet.markercluster';
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet-easybutton';
import '../../node_modules/leaflet-tag-filter-button/src/leaflet-tag-filter-button.js';
import 'leaflet.repeatedmarkers';
// timeline imports
import 'd3';
import 'd3-hexbin';
// import 'nouislider';
// import 'wnumb';
import 'leaflet-d3-combain';
// import './mapSliderImplementation.js';

// styles
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../node_modules/leaflet-tag-filter-button/src/leaflet-tag-filter-button.css';

// assets
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { makeOffCanvasControlContainer, moveInfoBoxforMobile } from './mapFunctions.js';

// import markers from './mapMarkerCluster.js';
import infoBox from './mapInfoBox.js';
// console.log( 'what', markers );
// import minZoom from './mapMinZoom.js';

import { allJson } from './mapGoogleData';
// import { geoJson } from './mapData';

const initView = {
	zoom: 2.5,
	lat: 13.650768,
	lng: -162.509766,
};
const mapConfig = {
	// maxBounds: bounds,
	// maxBounds: L.latLngBounds(
	// 	[ -42.224123, -243.193359 ],
	// 	[ 48.722392, -70.400391 ]
	// ),
	// fitBounds: L.latLngBounds(
	// 	[ -42.224123, -243.193359 ],
	// 	[ 48.722392, -70.400391 ]
	// ),
	zoomSnap: 0.5,
	maxZoom: 12,
	minZoom: 2.5,
	zoomControl: false,
	worldCopyJump: false,
};
const map = L.map( 'map', mapConfig ).setView( [ initView.lat, initView.lng ], initView.zoom );
const tileLayer = L.tileLayer(
	'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
		maxZoom: 16,
		center: L.latLng( 29.597437, -37.045898 ),
		zoom: 13,
		noWrap: false,

	} ).addTo( map );

const myLayer = L.geoJSON().addTo( map );

L.control.zoom( {
	position: 'bottomright',
} ).addTo( map );
// const markers = L.markerClusterGroup().addTo( map );
const myRepeatingMarkers = L.gridLayer.repeatedMarkers().addTo( map );
import './mapInfoPane.js';
infoBox.addTo( map );

// Set up the default icon for markers
const DefaultIcon = L.icon( {
	iconUrl: icon,
	shadowUrl: iconShadow,
} );
L.Marker.prototype.options.icon = DefaultIcon;

function showInfo( e, f ) {
	L.DomEvent.stopPropagation( e ); // stop marker click from hitting 'map' object.
	if ( infoBox.markerClicked !== f.properties.id ) {
		infoBox.update( f );
	} else {
		infoBox.update();
	}
}

// put all features into one array
const allFeatures = aggregateFeatures( allJson );
const verifiedFeatures = getVerifiedFeatures( allFeatures );
verifiedFeatures.forEach( ( m ) => {
	// markersObj.addLayer( m );
	console.log( 'here', m );
	// myLayer.addLayer( m );
} );
// get all unique tags in the data
const allTags = aggregateTags( verifiedFeatures );
// place markers on map
const allMarkers = getAllMarkers( verifiedFeatures );
// // placeMarkersOnMap( allMarkers );

// function placeMarkersOnMap( markersToPlace ) {
// 	markersToPlace.forEach( ( m ) => {
// 		// markersObj.addLayer( m );
// 		myLayer.addData( m );
// 		// m.addTo( map );
// 		// myRepeatingMarkers.addMarker( m );
// 	} );
// 	// map.addLayer( markersObj );
// }

function aggregateFeatures( allJson ) {
	return allJson.reduce( ( acc, itt ) => {
		return acc.concat( itt.features );
	}, [] );
}

function makeMarker( f ) {
	const featureTags = f.properties.tags.split( ',' );
	const coords = f.geometry.coordinates.reverse();
	let m = false;
	if ( ! isNaN( coords[ 0 ] ) && ! isNaN( coords[ 1 ] ) ) {
		m = L.marker( [ ...coords ], { tags: featureTags } );
		m.addEventListener( 'click', ( e ) => {
			showInfo( e, f );
		} );
	}
	return m;
}

function getAllMarkers( featuresArr ) {
	return featuresArr.reduce( ( acc, f ) => {
		const m = makeMarker( f );
		if ( m ) {
			acc.push( m );
		}
		return acc;
	}, [] );
}

function aggregateTags( featuresArr ) {
	return featuresArr.reduce( ( acc, itt ) => {
		const t = itt.properties.tags;
		if ( acc.includes( t ) ) {
			// skip if we've already got this tag
			return acc;
		}
		acc.push( t );
		return acc;
	}, [] );
}

L.control.tagFilterButton( {
	data: allTags,
	icon: '<i class="fa-solid fa-filter"></i>',
	filterOnEveryClick: true,
} ).addTo( map );

/**
 * fixed popup
 */

const pane = map.createPane( 'fixed', document.getElementById( 'map' ) );

// ------------------------------------------------

// template svg icon
const svgIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M25 7.335c-2.23-2.069-5.217-3.335-8.5-3.335s-6.27 1.265-8.5 3.335v0c2.46 2.283 4 5.544 4 9.165s-1.54 6.882-4 9.165c2.23 2.069 5.217 3.335 8.5 3.335s6.27-1.265 8.5-3.335c-2.46-2.283-4-5.544-4-9.165s1.54-6.882 4-9.165v0 0zM25.706 8.044c2.045 2.226 3.294 5.195 3.294 8.456s-1.249 6.23-3.294 8.456c-2.279-2.101-3.706-5.112-3.706-8.456s1.427-6.355 3.706-8.456v0 0zM7.294 8.044c-2.045 2.226-3.294 5.195-3.294 8.456s1.249 6.23 3.294 8.456c2.279-2.101 3.706-5.112 3.706-8.456s-1.427-6.355-3.706-8.456v0z"></path>
  </svg>
`;

// create new div icon width svg
// const newIcon = L.divIcon( {
// 	className: 'marker',
// 	html: svgIcon,
// 	iconSize: [ 40, 40 ],
// 	iconAnchor: [ 12, 24 ],
// 	popupAnchor: [ 7, -16 ],
// } );

// const points = [
// 	{
// 		lat: 52.230106013487045,
// 		lng: 21.01195871829987,
// 		text: '<h3>First popup 😀</h3><br>Grab the lower right corner and reduce the width of the map.',
// 	},
// 	{
// 		lat: 52.22956716165493,
// 		lng: 21.011561751365665,
// 		text: '<h3>Second popup 😀</h3><br>Grab the lower right corner and reduce the width of the map.',
// 	},
// ];

// points.map( ( { lat, lng, text } ) => {
// 	// create marker and add to map
// 	const marker = L.marker( [ lat, lng ], {
// 		icon: newIcon,
// 	} ).addTo( map );

// 	// crewate popup, set contnet
// 	const popup = L.popup( {
// 		pane: 'fixed',
// 		className: 'popup-fixed test',
// 		autoPan: false,
// 	} ).setContent( text );

// 	marker.bindPopup( popup ).on( 'click', fitBoundsPadding );
// } );

// // remove all animation class when popupclose
// map.on( 'popupclose', function( e ) {
// 	removeAllAnimationClassFromMap();
// } );

// ------------------------------------------------

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
// 		document.documentElement.style.getPropertyValue( '--min-width' );

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
// 	map.setView( [ initView.lat, initView.lng ], initView.zoom );
// }

function verifyFeature( feature ) {
	// has a date and has coordinates
	const coords = ( ! isNaN( feature.geometry.coordinates[ 0 ] ) && ! isNaN( feature.geometry.coordinates[ 1 ] ) );
	const hasDate = feature.properties.Date !== null;

	if ( ! coords ) {
		console.warn( 'incorrect geometry.coordinates for: ', feature );
	}
	if ( ! hasDate ) {
		console.warn( 'incorrect properties.Date for: ', feature );
	}
	return coords && hasDate;
}

function getVerifiedFeatures( features ) {
	return features.reduce( ( acc, itt ) => {
		if ( verifyFeature( itt ) ) {
			itt.properties.Date = new Date( itt.properties.Date ).toLocaleDateString( 'en-US' );
			acc.push( itt );
		}
		return acc;
	}, [] );
}

function dateInRange( targetDate, startDate, endDate ) {
	const date = new Date( targetDate ),
		start = new Date( startDate ),
		end = new Date( endDate );
	return ( date > start && date < end );
	// if (date > start && date < end) {
	//   console.log('✅ date is between the 2 dates');
	// } else {
	//   console.log('⛔️ date is not in the range');
	// }
}

function filterDates( features, startDate, endDate ) {
	return features.filter( ( f ) => {
		const targetDate = f.properties.Date;
		return dateInRange( targetDate, startDate, endDate );
	}, [] );
}

/**
 * Timeline stuff
 */

// options for the Hexbin
// const hex_options = {
// 	radius: 24,
// 	opacity: .7,
// 	colorRange: [ '#ffc961', '#1a110c' ],
// 	radiusRange: [ 4, 24 ],
// };

////////// add the hex bin here //////////
// Create the hexlayer
// const hexLayer = L.hexbinLayer( hex_options );

// Set up hover handler ALBERT: disabled for now
//hexLayer.hoverHandler(L.HexbinHoverHandler.tooltip());

// Set up events, note that "on click" is not used.
// hexLayer.dispatch()
// 	.on( 'mouseover', function( d, i ) {
// 		//console.log({ type: 'mouseover', event: d, index: i, context: this });
// 		setHovered( d );
// 	} )
// 	.on( 'mouseout', function( d, i ) {
// 		//console.log({ type: 'mouseout', event: d, index: i, context: this });
// 		setHovered();
// 	} )
// 	.on( 'click', function( d, i ) {
// 		// console.log( { type: 'click', event: d, index: i, context: this } );
// 		setClicked( d );
// 	} );

////////// begin the helper functions //////////
function timestamp( str ) {
	return new Date( str ).getTime();
}

// function addDataToHexMap( obj, startDate, endDate ) {
// 	let mapData;
// 	if ( startDate !== undefined ) {
// 		const filteredObj = obj.filter( ( data ) => timestamp( data.properties.Date ) >= startDate && timestamp( data.properties.Date ) <= endDate );
// 		// console.log(end_date)
// 		mapData = filteredObj;
// 	} else {
// 		console.log( 'date not provided, so adding all data' );
// 		mapData = obj;
// 	}
// 	// get only the lat/long
// 	const geoPoints = mapData.map( ( feature ) => {
// 		return ( [ feature.geometry.coordinates[ 1 ], feature.geometry.coordinates[ 0 ] ] );
// 	} );
// 	hexLayer.data( geoPoints );
// 	const total = geoPoints.length;

// 	//console.log(total)
// 	return total;
// }

// function setHovered( d ) {
// 	d3.select( '#hovered .count' ).text( ( null != d ) ? 'Deaths here: ' + d.length : '' );
// }

// function setClicked( d ) {
// 	d3.select( '#clicked .count' ).text( ( null != d ) ? d.length : '' );
// }

// Add it to the map now that it's all set up
// hexLayer.addTo( map );

//initial call for all the data
// addDataToHexMap( verifiedFeatures );

/**
 * Start Slider Work
 */

import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';
// constants for the slider
const slider = document.getElementById( 'map-slider' );
const defaultStartDate = 'Jan 1,1800';
const defaultEndDate = 'Dec 1,2020';
// const weekdays = [
// 	'Sunday', 'Monday', 'Tuesday',
// 	'Wednesday', 'Thursday', 'Friday',
// 	'Saturday',
// ];

const monthsShort = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// TO-DO: need to change the months to use the start and end dates...
const monthVals = monthsShort.map( ( month ) => Date.parse( month + ' 1, 2020' ) );

// implement the noUiSlider
noUiSlider.create( slider, {
	// step: ,
	behaviour: 'tap-drag',
	connect: true,
	range: {
		min: timestamp( defaultStartDate ),
		max: timestamp( defaultEndDate ),
	},
	direction: 'ltr',
	step: 24 * 60 * 60 * 1000,
	start: [ timestamp( defaultStartDate ), timestamp( defaultEndDate ) ],
	format: wNumb( {
		decimals: 0,
	} ),
	pips: {
		mode: 'values',
		values: monthVals,
		format: {
			to( month ) {
				// custom function to format the months.
				const targetMonth = new Date( month );
				if ( window.innerWidth > 740 ) {
					const monthLabel = monthsShort[ targetMonth.getMonth() ];
					console.log( targetMonth.getMonth() );
					console.log( monthLabel );
					return monthLabel;
				}

				return [];
			},
			from( value ) {
				return value;
			},
		},
	},
} );

// Create a string representation of the date.
function formatDate( date ) {
	return monthsShort[ date.getMonth() ] + ', ' +
		date.getFullYear();
}

const dateValues = [
	document.getElementById( 'event-start' ),
	document.getElementById( 'event-end' ),
	document.getElementById( 'event-total' ),
];

// add slider
// const Slider = L.Control.extend( {
// 	options: {
// 		position: 'bottomleft',
// 	},
// 	onAdd( map ) {
// 		// console.log( 'on add', map );
// 		const controlSlider = L.DomUtil.create( 'div', 'map-slider', L.DomUtil.get( 'map' ) );
// 		// here we can fill the slider with colors, strings and whatever
// 		controlSlider.innerHTML = '<form><input id="command" type="checkbox"/>command</form>';
// 		return controlSlider;
// 	},
// } );
// map.addControl( new Slider() );
slider.noUiSlider.on( 'slide', ( values, handle ) => {
	console.log( 'slide', values, handle );
	const newTimes = slider.noUiSlider.get( true );
	console.log( 'here', newTimes );
	const newStart = new Date( parseInt( newTimes[ 0 ] ) );
	const newEnd = new Date( parseInt( newTimes[ 1 ] ) );
	// console.log( newStart, newEnd );
	verifiedFeatures.forEach( ( f ) => {
		if ( dateInRange( f.properties.Date, newStart, newEnd ) ) {
			console.log( 'inRange', f.properties.Date );
			map.addLayer( makeMarker( f ) );
			myLayer.addData( f );
		} else {
			myLayer.removeLayer( f );
			console.log( 'out of range', f.properties.Date );
		}
	} );

	// const filtered = filterDates( verifiedFeatures, newStart, newEnd );
	// const filteredMarkers = getAllMarkers( filtered );
	// placeMarkersOnMap( filteredMarkers, markers );
} );
slider.noUiSlider.on( 'update', function( values, handle ) {
	// console.log( 'update', values, handle );
	// dateValues[ handle ].innerHTML = formatDate( new Date( +values[ handle ] ) );
	// const newTimes = slider.noUiSlider.get( true );
	// console.log( 'here', newTimes );
	// const newStart = new Date( parseInt( newTimes[ 0 ] ) );
	// const newEnd = new Date( parseInt( newTimes[ 1 ] ) );
	// console.log( newStart, newEnd );
	// const filtered = filterDates( verifiedFeatures, newStart, newEnd );
	// const filteredMarkers = getAllMarkers( filtered );
	// console.log( 'count', filteredMarkers.length );
	// markers.clearLayers();
	// console.log( 'markers', markers );
	// placeMarkersOnMap( filteredMarkers, markers );

	// addDataToHexMap( verifiedFeatures, newTimes[ 0 ], newTimes[ 1 ] );
	// console.log( dateValues );
	// dateValues[ 2 ].innerHTML = addDataToHexMap( verifiedFeatures, newTimes[ 0 ], newTimes[ 1 ] );
	// console.log(values[handle])
} );

