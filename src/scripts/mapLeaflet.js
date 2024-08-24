/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import L from 'leaflet';
// import './mapHeatlayer.js';
import 'leaflet.heat';
import * as helpers from './mapHelperFxns.js';
import infoBox from './mapInfoBox.js';

import minZoom from './mapMinZoom.js';

// styles
import 'leaflet/dist/leaflet.css';

// const allFeatures = helpers.aggregateFeatures( allJson );
// console.log( JSON.stringify( allFeatures ) );
import allFeatures from './mapAllFeatures.js';

// import { allJson } from './mapGoogleData';

const defaultStartDate = 'Jan 1,1883';
const defaultEndDate = 'Jan 1,2023';
const time = {
	start: helpers.timestamp( defaultStartDate ),
	end: helpers.timestamp( defaultEndDate ),
	range: helpers.difference( helpers.timestamp( defaultStartDate ), helpers.timestamp( defaultEndDate ) ),
	year: 365 * 24 * 60 * 60, // year in seconds
};
const tl = {
	lastTime: time.start,
	interval: null,
	isPaused: false,
	isActive: false,
	start: 0,
	iterations: 0,
	divider: 3000,
	intervalFxn: null,
	checkedFilters: [],
};
const initView = {
	zoom: 2.5,
	lat: 0,
	lng: 0,
};
const mapConfig = {
	// maxBounds: bounds,
	// maxBounds: L.latLngBounds(
	// 	[ -42.224123, -243.193359 ],
	// 	[ 48.722392, -70.400391 ]
	// ),
	fitBounds: L.latLngBounds(
		[ -42.224123, -243.193359 ],
		[ 48.722392, -70.400391 ]
	),
	zoomSnap: 0.1,
	maxZoom: 12,
	minZoom,
	zoomControl: false,
	worldCopyJump: false,
};
const map = L.map( 'map', mapConfig )
	.whenReady( ( f ) => {
		const filterContainerHeight = document.querySelector( '#map-filter' ).offsetHeight;
		const headerHeight = document.querySelector( '.header-container' ).offsetHeight;
		const infoContainer = document.querySelector( '#overlay-map-info-container' );
		const mapEl = document.querySelector( '.map' );
		infoContainer.classList.add( 'isLoaded' );
		infoContainer.style.bottom = `${ filterContainerHeight + 20 }px`;
		infoContainer.style.top = `${ headerHeight }px`;
		mapEl.classList.add( 'isLoaded' );

		setTimeout( () => {
			playTimeline();
		}, 2000 );
	} )
	.setView( [ initView.lat, initView.lng ], initView.zoom );

L.tileLayer(
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

map.on( 'click', ( e ) => {
	// if we clicked on the infoBox - do nothing
	if ( Boolean( e.originalEvent.target.closest( '.infoBox' ) ) ) {
		return;
	}
	showInfo( e );
} );

// put all features into one array

const verifiedFeatures = helpers.getVerifiedFeatures( allFeatures );

const theGeoJson = L.geoJSON( verifiedFeatures, {
	pointToLayer( point, latLng ) {
		const d = makeMarker( point );
		return d;
	},
} );
theGeoJson.addTo( map );
map.fitBounds( theGeoJson.getBounds() );
/**
 * Start Slider Work
 */

import noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';

// constants for the slider
const slider = document.getElementById( 'map-slider' );

// implement the noUiSlider
const timeSlider = noUiSlider.create( slider, {

	connect: true,
	animate: false,
	behaviour: 'drag-all',
	range: {
		min: time.start,
		max: time.end,
	},
	direction: 'ltr',
	// step: 365 * 24 * 60 * 60 * 1000,
	start: [ time.start, time.start ],
	format: wNumb( {
		decimals: 0,
	} ),
} );
const hMapArr = helpers.getHeatMapArr( verifiedFeatures );

const specialFeature = {
	geometry: { type: 'Point', coordinates: Array( 2 ) },
	properties: {
		id: 'special',
		Date: 1704096000000,
		Name: 'Energy Fields: Vibrations of the Pacific',
		Impact: '<p>The data points on this map represent major vibrational activity across the Pacific Rim and Oceania from the eruption of Krakatoa in 1883 to the 2022 Hunga Tonga-Hunga Ha\'apai eruption.</p> <p>The data can be filtered by time period and the following types of phenomena: atomic weapons detonations, earthquakes, tsunamis, and volcanic eruptions.</p>',
		Location: 'Orange, CA',
	},
	type: 'Feature',
};

if ( ! infoBox.specialShown ) {
	// showInfo( undefined, specialFeature );
}

const colors = {
	a: {
		0: 'Black',
		0.33: 'DarkRed',
		0.66: 'Yellow',
		1: 'White',
	},
	b: { 0.00: 'white', 0.5: '#333', .8: 'black' },
	c: {
		0: 'Black',
		0.4: 'Purple',
		0.6: 'Red',
		0.8: 'Yellow',
		1: 'White',
	},
	d: {
		0.00: 'rgb(255,0,255)',
		0.25: 'rgb(0,0,255)',
		0.50: 'rgb(0,255,0)',
		0.75: 'rgb(255,255,0)',
		1.00: 'rgb(255,0,0)',
	},
};
const heatObj = L.heatLayer(
	hMapArr,
	{
		minOpacity: .5,
		radius: 25,
		blur: 15,
		gradient: colors.c,
	} );
heatObj.addTo( map );

timeSlider.on( 'start', pauseTimeline );
timeSlider.on( 'update', updateMapMarkers );
timeSlider.on( 'update', helpers.updateDates );

document.addEventListener( 'click', ( e ) => {
	if ( e.target.classList.contains( 'close-infoBox' ) ) {
		infoBox.close();
	}

	if ( e.target.closest( '.button--infoIcon' ) ) {
		showInfo( e, specialFeature );
	}
} );

/** map filters */
const mapfilters = document.querySelector( '#filters' );
mapfilters.addEventListener( 'change', ( ) => {
	// clear info window
	infoBox.update( );
	tl.checkedFilters = helpers.getFilterValue();
	updateMapMarkers();
} );

function makeMarker( f ) {
	const featureTags = f.properties.tags.split( ',' );
	const coords = f.geometry.coordinates.reverse();
	let m = false;
	if ( ! isNaN( coords[ 0 ] ) && ! isNaN( coords[ 1 ] ) ) {
		const i = helpers.getCorrectIcon( f );
		m = L.marker( [ ...coords ], { icon: i, tags: featureTags } );
		m.addEventListener( 'click', ( e ) => {
			// L.DomUtil.addClass( m._icon, 'isActive' );
			showInfo( e, f );
			map.panTo( m.getLatLng() );
		} );
	}
	return m;
}

function showInfo( e, f ) {
	if ( e ) {
		L.DomEvent.stopPropagation( e );
	} // stop marker click from hitting 'map' object.
	// if we clicked the same marker - clear infobox
	if ( f?.properties?.id && infoBox.markerClicked === f.properties.id ) {
		f = false;
	}
	// console.log( 'f', f );
	infoBox.update( f );
}

function refreshMarker( layer, newStart, newEnd ) {
	const { feature } = layer;
	const inRange = helpers.dateInRange( feature.properties.Date, newStart, newEnd );
	const inFilter = checkFilter( feature );
	if ( inRange && inFilter ) {
		layer.addTo( map );
	} else {
		map.removeLayer( layer );
	}
}

function updateMapMarkers( values ) {
	if ( ! values ) {
		values = timeSlider.get( true );
	}
	const newStart = new Date( parseInt( values[ 0 ] ) );
	const newEnd = new Date( parseInt( values[ 1 ] ) );

	theGeoJson.eachLayer( ( layer ) => {
		refreshMarker( layer, newStart, newEnd );
	} );
	updateHeatMap( verifiedFeatures, values );
}

function updateHeatMap( featuresArr, values ) {
	const newStart = new Date( parseInt( values[ 0 ] ) );
	const newEnd = new Date( parseInt( values[ 1 ] ) );

	const filteredHeatArr = featuresArr.filter( ( feature ) => {
		const inRange = helpers.dateInRange( feature.properties.Date, newStart, newEnd );
		const inFilter = checkFilter( feature );

		return inFilter && inRange && helpers.dateInRange( feature.properties.Date, newStart, newEnd );
	} );

	heatObj.setLatLngs( helpers.getHeatMapArr( filteredHeatArr ) );
}

function pauseTimeline() {
	tl.isPaused = true;
}
function setTimerInterval() {
	const percentComplete = timeSlider.getPositions()[ 1 ] / 100;
	tl.interval = ( 1 - percentComplete ) * tl.divider;
	tl.interval = ( time.end - time.start ) / tl.divider;
}

function playTimeline() {
	setTimerInterval();
	tl.start = timeSlider.get()[ 1 ];

	if ( tl.intervalFxn ) {
		clearInterval( tl.intervalFxn );
		return;
	}

	tl.intervalFxn = setInterval( () => {
		if ( ! tl.isPaused ) {
			timeSlider.setHandle( 1, tl.lastTime, true );
			tl.lastTime = tl.lastTime + tl.interval;

			if ( tl.iterations >= tl.divider ) {
				clearInterval( tl.intervalFxn );
				tl.isPaused = true;
			}
			tl.iterations++;
		}
	}, .25 );
}
// necessary on this file.
function checkFilter( feature ) {
	const isAll = tl.checkedFilters.includes( 'all' ) || tl.checkedFilters.length === 0;
	return isAll || tl.checkedFilters.includes( feature.properties.tags.toLowerCase() );
}
