import L from 'leaflet';
import 'leaflet-easybutton';
import '../../node_modules/leaflet-tag-filter-button/src/leaflet-tag-filter-button.js';
import 'leaflet.repeatedmarkers';

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

L.control.zoom( {
	position: 'bottomright',
} ).addTo( map );

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
// get all unique tags in the data
const allTags = aggregateTags( allFeatures );
// place markers on map
const allMarkers = getAllMarkers( allFeatures );
placeMarkersOnMap( allMarkers );

function placeMarkersOnMap( markers ) {
	markers.forEach( ( m ) => {
		m.addTo( map );
		myRepeatingMarkers.addMarker( m );
	} );
}

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
const newIcon = L.divIcon( {
	className: 'marker',
	html: svgIcon,
	iconSize: [ 40, 40 ],
	iconAnchor: [ 12, 24 ],
	popupAnchor: [ 7, -16 ],
} );

const points = [
	{
		lat: 52.230106013487045,
		lng: 21.01195871829987,
		text: '<h3>First popup 😀</h3><br>Grab the lower right corner and reduce the width of the map.',
	},
	{
		lat: 52.22956716165493,
		lng: 21.011561751365665,
		text: '<h3>Second popup 😀</h3><br>Grab the lower right corner and reduce the width of the map.',
	},
];

points.map( ( { lat, lng, text } ) => {
	// create marker and add to map
	const marker = L.marker( [ lat, lng ], {
		icon: newIcon,
	} ).addTo( map );

	// crewate popup, set contnet
	const popup = L.popup( {
		pane: 'fixed',
		className: 'popup-fixed test',
		autoPan: false,
	} ).setContent( text );

	marker.bindPopup( popup ).on( 'click', fitBoundsPadding );
} );

// remove all animation class when popupclose
map.on( 'popupclose', function( e ) {
	removeAllAnimationClassFromMap();
} );

// ------------------------------------------------

const mediaQueryList = window.matchMedia( '(min-width: 700px)' );

mediaQueryList.addEventListener( 'change', ( event ) => onMediaQueryChange( event ) );

onMediaQueryChange( mediaQueryList );

function onMediaQueryChange( event ) {
	if ( event.matches ) {
		document.documentElement.style.setProperty( '--min-width', 'true' );
	} else {
		document.documentElement.style.removeProperty( '--min-width' );
	}
}

function fitBoundsPadding( e ) {
	removeAllAnimationClassFromMap();
	// get with info div
	const boxInfoWith = document.querySelector(
		'.leaflet-popup-content-wrapper'
	).offsetWidth;

	// add class to marker
	e.target._icon.classList.add( 'animation' );

	// create a feature group, optionally given an initial set of layers
	const featureGroup = L.featureGroup( [ e.target ] ).addTo( map );

	// check if attribute exist
	const getPropertyWidth =
		document.documentElement.style.getPropertyValue( '--min-width' );

	// sets a map view that contains the given geographical bounds
	// with the maximum zoom level possible
	map.fitBounds( featureGroup.getBounds(), {
		paddingTopLeft: [ getPropertyWidth ? -boxInfoWith : 0, 10 ],
	} );
}

function removeAllAnimationClassFromMap() {
	// get all animation class on map
	const animations = document.querySelectorAll( '.animation' );
	animations.forEach( ( animation ) => {
		animation.classList.remove( 'animation' );
	} );

	// back to default position
	map.setView( [ initView.lat, initView.lng ], initView.zoom );
}
