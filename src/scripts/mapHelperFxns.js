import { icons } from './mapIcons';

// puase timeline when user interacts with timeline
const handleDates = {
	start: document.querySelector( '#event-start' ),
	end: document.querySelector( '#event-end' ),
};
export function updateDates( values, handle, unencoded, tap, positions, noUiSlider ) {
	if ( handle === 0 ) {
		const start = new Date( unencoded[ 0 ] );
		handleDates.start.innerHTML = start.getFullYear();
	}
	if ( handle === 1 ) {
		const end = new Date( unencoded[ 1 ] );
		handleDates.end.innerHTML = end.getFullYear();
	}
}

export function getFilterValue() {
	const checkboxes = document.querySelectorAll( '#filters input[type="radio"]' );
	const checked = Array.from( checkboxes ).reduce( ( acc, itt ) => {
		// eslint-disable-next-line no-unused-expressions
		itt.checked && acc.push( itt.value );
		return acc;
	}, [] );
	return checked;
}

export function getCorrectIcon( f ) {
	const type = f.properties.tags.toLowerCase();
	return icons[ type ];
}

export function makeMarker( f ) {
	const featureTags = f.properties.tags.split( ',' );
	const coords = f.geometry.coordinates.reverse();
	let m = false;
	if ( ! isNaN( coords[ 0 ] ) && ! isNaN( coords[ 1 ] ) ) {
		const i = getCorrectIcon( f );
		m = L.marker( [ ...coords ], { icon: i, tags: featureTags } );
		m.addEventListener( 'click', ( e ) => {
			// L.DomUtil.addClass( m._icon, 'isActive' );
			showInfo( e, f );
			map.panTo( m.getLatLng() );
		} );
	}
	return m;
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
export function aggregateFeatures( geoJson ) {
	return geoJson.reduce( ( acc, itt ) => {
		return acc.concat( itt.features );
	}, [] );
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
export function getVerifiedFeatures( features ) {
	return features.reduce( ( acc, itt ) => {
		// only include points that have necessary data
		if ( verifyFeature( itt ) ) {
			itt.properties.Date = new Date( itt.properties.Date );
			itt.properties.Date = itt.properties.Date.setFullYear( itt.properties.Date.getFullYear() + 1 );

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

export function getHeatMapArr( featuresArr ) {
	return featuresArr.map( ( f ) => {
		return [ f.geometry.coordinates[ 0 ], f.geometry.coordinates[ 1 ], f.properties.mag ];
	} );
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
export function dateInRange( targetDate, startDate, endDate ) {
	const date = new Date( targetDate ),
		start = new Date( startDate ),
		end = new Date( endDate );
	return ( date > start && date < end );
}
export function timestamp( str ) {
	return new Date( str ).getTime();
}

export function difference( a, b ) {
	return Math.abs( a - b );
}

