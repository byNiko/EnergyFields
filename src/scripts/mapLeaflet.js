/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import L, { Circle } from 'leaflet';
// import 'leaflet-easybutton';
import './mapHeatlayer.js';
// import '../../node_modules/leaflet-tag-filter-button/src/leaflet-tag-filter-button.js';

// styles
import 'leaflet/dist/leaflet.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../../node_modules/leaflet-tag-filter-button/src/leaflet-tag-filter-button.css';

// assets
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { makeOffCanvasControlContainer, moveInfoBoxforMobile } from './mapFunctions.js';

// import markers from './mapMarkerCluster.js';
import infoBox from './mapInfoBox.js';
// console.log( 'what', markers );
// import minZoom from './mapMinZoom.js';

import { allJson } from './mapGoogleData';

const svgIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M25 7.335c-2.23-2.069-5.217-3.335-8.5-3.335s-6.27 1.265-8.5 3.335v0c2.46 2.283 4 5.544 4 9.165s-1.54 6.882-4 9.165c2.23 2.069 5.217 3.335 8.5 3.335s6.27-1.265 8.5-3.335c-2.46-2.283-4-5.544-4-9.165s1.54-6.882 4-9.165v0 0zM25.706 8.044c2.045 2.226 3.294 5.195 3.294 8.456s-1.249 6.23-3.294 8.456c-2.279-2.101-3.706-5.112-3.706-8.456s1.427-6.355 3.706-8.456v0 0zM7.294 8.044c-2.045 2.226-3.294 5.195-3.294 8.456s1.249 6.23 3.294 8.456c2.279-2.101 3.706-5.112 3.706-8.456s-1.427-6.355-3.706-8.456v0z"></path>
  </svg>
`;
const circleIcon = `
 <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
     <circle r="1.5" cx="5" cy="5" fill="hsl(170 60% 30% / .5)" stroke="hsl(230 50% 80% / .25)" stroke-width="1" />
  </svg>
`;
const invisibleIcon = '<div></div>';
const divIcon = L.divIcon( {
	className: 'invisible_marker',
	// className: 'marker',
	// html: invisibleIcon,
	html: circleIcon,
	iconSize: [ 40, 40 ],
	iconAnchor: [ 12, 24 ],
	popupAnchor: [ 7, -16 ],
} );
// Set up the default icon for markers
// const DefaultIcon = L.icon( {
// 	iconUrl: icon,
// 	shadowUrl: iconShadow,
// } );

L.Marker.prototype.options.icon = divIcon;

const defaultStartDate = 'Jan 1,1883';
const defaultEndDate = 'Dec 1,2020';
const time = {
	start: timestamp( defaultStartDate ),
	end: timestamp( defaultEndDate ),
	range: difference( timestamp( defaultStartDate ), timestamp( defaultEndDate ) ),
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
	maxBounds: L.latLngBounds(
		[ -42.224123, -243.193359 ],
		[ 48.722392, -70.400391 ]
	),
	fitBounds: L.latLngBounds(
		[ -42.224123, -243.193359 ],
		[ 48.722392, -70.400391 ]
	),
	zoomSnap: 0.1,
	maxZoom: 12,
	minZoom: 2.5,
	zoomControl: false,
	worldCopyJump: false,
};
const map = L.map( 'map', mapConfig )
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

// infoBox.addTo( map );

// create new div icon width svg
// template svg icon

map.on( 'click', ( e ) => {
	// if we clicked on the infoBox - do nothing
	if ( Boolean( e.originalEvent.target.closest( '.infoBox' ) ) ) {
		return;
	}
	showInfo( e );
} );

// put all features into one array
const allFeatures = aggregateFeatures( allJson );
const verifiedFeatures = getVerifiedFeatures( allFeatures );

// get all unique tags in the data
const allTags = aggregateTags( verifiedFeatures );

// const testGeoJson = L.geoJSON().addTo( map );
// const theGeoJson = L.geoJSON().addTo( map );
const theGeoJson = L.geoJSON( verifiedFeatures, {
	pointToLayer( point, latLng ) {
		// const c = new Circle( latLng, 100000 );
		// c.addEventListener( 'click', ( e ) => {
		// 	showInfo( e, point );
		// } );
		const d = makeMarker( point );
		return d;
	},
	onEachFeature( f, l ) {
	},
} );
theGeoJson.addTo( map );
map.fitBounds( theGeoJson.getBounds() );

/* The below code is using Leaflet library to create a tag filter button on a map. It is creating a
button that, when clicked, will filter the map based on the tags provided in the `allTags` data
array. The button will display an icon with the class "fa-filter" from Font Awesome. The
`filterOnEveryClick` option is set to true, which means that the filter will be applied every time
the button is clicked. */
// const filters = L.control.tagFilterButton( {
// 	data: allTags,
// 	icon: '<i class="fa-solid fa-filter"></i>',
// 	filterOnEveryClick: true,
// 	onSelectionComplete( e ) {
// 		console.log( 'selected', e );
// 	},
// } );
// filters.addTo( map );

/**
 * fixed popup
 */

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

// function filterDates( features, startDate, endDate ) {
// 	return features.filter( ( f ) => {
// 		const targetDate = f.properties.Date;
// 		return dateInRange( targetDate, startDate, endDate );
// 	}, [] );
// }

/**
 * Timeline stuff
 */

////////// begin the helper functions //////////

/**
 * Start Slider Work
 */

import noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';

// constants for the slider
const slider = document.getElementById( 'map-slider' );

// const monthsShort = [
// 	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
// ];

// TO-DO: need to change the months to use the start and end dates...
// const monthVals = monthsShort.map( ( month ) => Date.parse( month + ' 1, 2020' ) );

// const slider_margin = 20;
// const slider_step = 5;
// const slider_min = 0;
// const slider_max = 100;
// const timeSlider = noUiSlider.create( slider, {
// 	start: [ 30, 70 ],
// 	behaviour: 'drag',
// 	step: slider_step,
// 	animate: false, // important for the on('slide') `set` calls to be discrete
// 	//margin: slider_margin,  // don't set as it's covered in the .on('update') event handler
// 	connect: true,
// 	range: {
// 		min: slider_min,
// 		max: slider_max,
// 	},
// } );
// function enforce_margin_allowing_drag( values, handle, numeric_values ) {
// 	if ( Math.round( numeric_values[ 1 ] ) < slider_min + slider_margin ) {
// 		timeSlider.set( [ null, slider_margin ] );
// 	} else if ( Math.round( numeric_values[ 0 ] ) > slider_max - slider_margin ) {
// 		timeSlider.set( [ slider_max - slider_margin, null ] );
// 	} else if ( Math.round( numeric_values[ 1 ] - numeric_values[ 0 ] ) + slider_step <= slider_margin ) {
// 		if ( handle ) {
// 	    var nv = numeric_values[ 1 ] - slider_margin;
// 	    timeSlider.set( [ nv, null ] );
// 		} else {
// 	    var nv = numeric_values[ 0 ] + slider_margin;
// 	    timeSlider.set( [ null, nv ] );
// 		}
// 	}
// }
// timeSlider.on( 'update', enforce_margin_allowing_drag );

// implement the noUiSlider
const timeSlider = noUiSlider.create( slider, {
	// step: ,
	// behaviour: 'tap-drag',
	connect: true,
	animate: false,
	// limit: 1000000000540,
	behaviour: 'drag-all',
	range: {
		min: time.start, //timestamp( defaultStartDate ),
		max: time.end, //timestamp( defaultEndDate ),
	},
	direction: 'ltr',
	step: 365 * 24 * 60 * 60 * 1000,
	start: [ time.start, time.end - ( time.range * .8 ) ],
	format: wNumb( {
		decimals: 0,
	} ),
	// pips_remove: {
	// 	mode: 'values',
	// 	values: monthVals,
	// 	format: {
	// 		to( month ) {
	// 			// custom function to format the months.
	// 			const targetMonth = new Date( month );
	// 			if ( window.innerWidth > 740 ) {
	// 				const monthLabel = monthsShort[ targetMonth.getMonth() ];
	// 				// console.log( targetMonth.getMonth() );
	// 				// console.log( monthLabel );
	// 				return monthLabel;
	// 			}

	// 			return [];
	// 		},
	// 		from( value ) {
	// 			return value;
	// 		},
	// 	},
	// },
} );
const hMapArr = getHeatMapArr( verifiedFeatures );

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

// puase timeline when user interacts with timeline
timeSlider.on( 'start', pauseTimeline );
timeSlider.on( 'update', updateMapMarkers );

timeSlider.on( 'update', ( values, handle, unencoded, tap, positions, noUiSlider ) => {
	// console.log( 'here', values, handle, unencoded, tap, positions, noUiSlider );
	//updateHeatMap( heatObj, verifiedFeatures, values );
} );

playTimeline();

document.addEventListener( 'click', ( e ) => {
	if ( e.target.classList.contains( 'close-infoBox' ) ) {
		infoBox.close();
	}
} );

/** map filters */
const mapfilters = document.querySelector( '#filters' );
mapfilters.addEventListener( 'change', ( e ) => {
	console.log( 'changed', e.target.value );
	// map.removeLayer( theGeoJson );
	tl.checkedFilters = getFilterValue();
	updateMapMarkers();
	if ( tl.isPaused == 'fine' ) {
		const y = verifiedFeatures.filter( ( f ) => {
			return tl.checkedFilters.includes( f.properties.tags.toLowerCase() );
		} );
		console.log( 'filtered', y );

		const x = L.geoJSON( y, {
		// filter( a ) {
		// console.log( 'here', a );
		// return a.properties.tags = 'Tusnamis';
		// },
			pointToLayer( point, latLng ) {
			// const c = new Circle( latLng, 100000 );
			// c.addEventListener( 'click', ( e ) => {
			// 	showInfo( e, point );
			// } );
				const d = makeMarker( point );
				return d;
			},
			onEachFeature( f, l ) {
			},
		} );
	}
	// // console.log( 'checked', checked );
} );

function getFilterValue() {
	const checkboxes = document.querySelectorAll( '#filters input[type="checkbox"]' );
	const checked = Array.from( checkboxes ).reduce( ( acc, itt ) => {
		// eslint-disable-next-line no-unused-expressions
		itt.checked && acc.push( itt.value );
		return acc;
	}, [] );
	return checked;
}

function makeMarker( f ) {
	const featureTags = f.properties.tags.split( ',' );
	const coords = f.geometry.coordinates.reverse();
	let m = false;
	if ( ! isNaN( coords[ 0 ] ) && ! isNaN( coords[ 1 ] ) ) {
		m = L.marker( [ ...coords ], { icon: divIcon, tags: featureTags } );
		// m = new Circle( [ ...coords ], 100000, { tags: featureTags } );
		// m.setRadius( 5000 );
		m.addEventListener( 'click', ( e ) => {
			showInfo( e, f );
		} );
	}
	return m;
}

function showInfo( e, f ) {
	L.DomEvent.stopPropagation( e ); // stop marker click from hitting 'map' object.
	// if we clicked the same marker - clear infobox
	if ( f?.properties?.id && infoBox.markerClicked === f.properties.id ) {
		f = false;
	}
	infoBox.update( f );
}

/**
 * The function `aggregateFeatures` takes an array of JSON objects and returns an array containing all
 * the `features` from each object.
 * @param {Array} geoJson array - The `aggregateFeatures` function takes an array of JSON objects as input. Each JSON
 *                        object in the array should have a property named `features`, which is expected to be an array of
 *                        features. The function then aggregates all the features from each JSON object into a single array
 *                        and returns it.
 * @return {Array} The `aggregateFeatures` function takes an array of JSON objects as input and returns an
 * array containing all the `features` from each JSON object in the input array.
 */
function aggregateFeatures( geoJson ) {
	return geoJson.reduce( ( acc, itt ) => {
		return acc.concat( itt.features );
	}, [] );
}

/**
 * The function `aggregateTags` takes an array of features and returns an array of unique tags
 * extracted from the properties of each feature.
 * @param {Array} featuresArr - The `aggregateTags` function takes an array `featuresArr` as input. Each
 *                            element in the `featuresArr` array is expected to be an object with a property `properties` which in
 *                            turn has a property `tags`. The function aims to aggregate unique tags from all the elements in the
 * @return {Array} The `aggregateTags` function is returning an array that contains unique tags extracted from
 * the `featuresArr` array. The function iterates over each item in the `featuresArr` array, extracts
 * the `tags` property from each item, and adds unique tags to the result array. Duplicate tags are
 * skipped to ensure only unique tags are included in the final result.
 */
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

/**
 * The function `verifyFeature` checks if a given feature has valid coordinates and a date property.
 * @param {JSON} feature - The `verifyFeature` function checks if a given `feature` object has valid
 *                       coordinates and a date. The `feature` object should have a `geometry` property with `coordinates`
 *                       array and a `properties` property with a `Date` value.
 * @return {boolean} The function `verifyFeature` returns a boolean value that indicates whether the input
 * `feature` has both valid coordinates and a non-null date in its properties.
 */
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

/**
 * The function `getVerifiedFeatures` filters an array of features based on certain criteria and
 * processes the data of each feature before returning the filtered array.
 * @param {Array} features - The `getVerifiedFeatures` function takes an array of features as input and filters
 *                         out the features that pass the `verifyFeature` function. For each feature that passes the
 *                         verification, it modifies the `Date` property and adjusts the longitude coordinates to wrap around
 *                         the anti-meridian.
 * @return {Array} The `getVerifiedFeatures` function takes an array of features as input and returns a new
 * array containing only the features that pass the `verifyFeature` check. Each feature in the returned
 * array has its `Date` property converted to a localized date string and its longitude coordinate
 * adjusted to wrap around the anti-meridian if necessary.
 */
function getVerifiedFeatures( features ) {
	return features.reduce( ( acc, itt ) => {
		// only include points that have necessary data
		if ( verifyFeature( itt ) ) {
			itt.properties.Date = new Date( itt.properties.Date ).toLocaleDateString( 'en-US' );
			// move markers back over the anti-meridian
			const lng = itt.geometry.coordinates[ 0 ];
			itt.geometry.coordinates[ 0 ] = L.Util.wrapNum( lng, [ -360, 0 ], true );
			itt.properties.mag = normalizeMagnitude( itt );

			acc.push( itt );
		}
		return acc;
	}, [] );
}

function normalizeMagnitude( feature ) {
	const type = feature.properties.tags;
	const magnitude = parseInt( feature.properties.Magnitude );

	let mag = 0;
	switch ( type ) {
		case 'Earthquakes':
			// max richter scale 10
			mag = magnitude / 10;

			break;
		case 'Volcanoes':
			// max VEI is 8
			mag = magnitude / 8;

			break;
		case 'Tsunamis':
			// max TSE is 4
			mag = magnitude / 4;
			break;
		case 'Weapons':
			// max is 180
			mag = magnitude / 180;
			break;
		default:
			console.warn( 'Not a valid energy type' );
	}
	return mag;
}

/**
 * The function `dateInRange` checks if a target date falls within a specified range of start and end
 * dates.
 * @param {string} targetDate - The `targetDate` parameter is the date you want to check if it falls within a
 *                            specific range defined by `startDate` and `endDate`.
 * @param {string} startDate  - startDate is the beginning date of the range to check if the targetDate falls
 *                            within.
 * @param {string} endDate    - The `endDate` parameter represents the end date of the range you want to check if
 *                            the `targetDate` falls within. It is used in the `dateInRange` function to determine if the
 *                            `targetDate` is between `startDate` and `endDate`.
 * @return {boolean} The function `dateInRange` returns a boolean value indicating whether the `targetDate`
 * falls within the range defined by `startDate` and `endDate`.
 */
function dateInRange( targetDate, startDate, endDate ) {
	const date = new Date( targetDate ),
		start = new Date( startDate ),
		end = new Date( endDate );
	return ( date > start && date < end );
}
function timestamp( str ) {
	return new Date( str ).getTime();
}

function difference( a, b ) {
	return Math.abs( a - b );
}

function checkFilter( feature ) {
	return tl.checkedFilters.length === 0 || tl.checkedFilters.includes( feature.properties.tags.toLowerCase() );
}

function refreshMarkers( layer, newStart, newEnd ) {
	const { feature } = layer;
	const inRange = dateInRange( feature.properties.Date, newStart, newEnd );
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
		refreshMarkers( layer, newStart, newEnd );
	} );
	updateHeatMap( verifiedFeatures, values );
}

function getHeatMapArr( featuresArr ) {
	return featuresArr.map( ( f ) => {
		return [ f.geometry.coordinates[ 0 ], f.geometry.coordinates[ 1 ], f.properties.mag ];
	} );
}
// function filterByType( arr, type ) {
// 	return arr.filter( ( feature ) => {
// 		return feature.properties.tags.contains( type );
// 	} );
// }

function updateHeatMap( featuresArr, values ) {
	const newStart = new Date( parseInt( values[ 0 ] ) );
	const newEnd = new Date( parseInt( values[ 1 ] ) );

	const filteredHeatArr = featuresArr.filter( ( feature ) => {
		const inRange = dateInRange( feature.properties.Date, newStart, newEnd );
		const inFilter = checkFilter( feature );

		return inFilter && inRange && dateInRange( feature.properties.Date, newStart, newEnd );
	} );

	heatObj.setLatLngs( getHeatMapArr( filteredHeatArr ) );
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
			tl.iterations++;
			timeSlider.setHandle( 1, tl.lastTime, true );
			tl.lastTime = tl.lastTime + tl.interval;

			if ( tl.iterations >= tl.divider ) {
				clearInterval( tl.intervalFxn );
				tl.isPaused = true;
			}
		}
	}, .25 );
}
