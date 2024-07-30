import * as tokens from './mapTokens.js';
// import { dlEndpoint } from './mapConstants.js';
// import averageColor, { nmToHsl } from './average-color.js';
import getMarkerColor from './mapGetMarketColor.js';
// import 'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js'

// export async function fetchJson( url, requestOptions ) {
// 	const resp = await fetch( url, requestOptions );

// 	if ( ( resp.data && resp.data.status > 400 ) || resp.status > 400 ) {
// 		return false;
// 	}

// 	const result = await resp.json();

// 	if ( result.data && result.data.status > 400 ) {
// 		return false;
// 	}
// 	return result;
// }

export function geojsonMarkerOptions( feature, radius ) {
	return {
		id: feature.properties.id,
		radius: radius || 5,
		fillColor: feature.properties.markerColor, //"blue", //feature_averageColor( feature ),
		color: 'white', // border color
		weight: 1, // border thickness
		opacity: 1,
		fillOpacity: 0.78,
	};
}

// export const myHeaders = new Headers();
// myHeaders.append( 'Authorization', `Bearer ${ tokens.BEARER_TOKEN }` );
// export const requestOptions = {
// 	method: 'GET',
// 	headers: myHeaders,
// 	redirect: 'follow',
// };

export function makeOffCanvasControlContainer( mapId, remove ) {
	const offCanvasId = 'sensor-map--off-canvas';
	if ( remove ) {
		const x = document.getElementById( offCanvasId );
		x.remove();
		return;
	}
	const mapCont = document.getElementById( mapId );
	const div = document.createElement( 'div' );
	div.id = offCanvasId;
	div.classList.add( offCanvasId );
	mapCont.insertAdjacentElement( 'afterend', div );
}

export function moveInfoBoxforMobile( infoBox ) {
	const target = document.getElementById( 'sensor-map--off-canvas' );
	if ( target ) {
		const cont = infoBox.getContainer();
		target.append( cont );
	}
}

// function feature_averageColor( feature ) {
// 	return;
// 	const colorArr = []
// 	for ( let [key, value] of Object.entries( feature.properties.chartColors ) ) {
// 		let color = nmToHsl[value.nm] // get standardized hsl based on nm
// 		let newColor = color.map( ( item, i, og ) => {
// 			if ( i === 1 || i === 2 ) {
// 				return item / 100;
// 			}
// 			return item;
// 		} )

// 		const rgbColor = chroma( newColor ).rgb();
// 		colorArr.push( rgbColor ) // put that new hsl value into an array
// 	}
// 	let s = chroma.average( colorArr );
// 	console.log( 'hererere', chroma( s ).hsl() )
// 	// let avg = averageColor( colorArr );
// 	let avg = chroma( s ).css( 'hsl' )
// 	// avg[1] = `${avg[1] * 100}%`;
// 	// avg[2] = `${avg[2] * 100}%`;
// 	console.log( 'done', avg )
// 	return avg;
// }

// export const latestDataByDeviceId = async function( device_id ) {
// 	let response;
// 	let data = false;
// 	try {
// 		response = await fetch( 'https://data.domesticlight.art/api/dynamodb/dy/excute', {
// 			method: 'POST',
// 			body: JSON.stringify( {
// 				Statement: `SELECT * FROM DL_data where device_id=? and sample_time > ?`,
// 				Parameters: [ { N: device_id }, { N: `${ ( new Date().getTime() - 1 * 30 * 1000 ) }` } ],
// 				ConsistentRead: true,
// 			} ),
// 		} );
// 		data = await response.json();
// 	} catch ( error ) {
// 		console.error( `Database execute error: ${ error.message }` );
// 	}

// 	// todo: error catch here
// 	// console.log( 'innit data', data )
// 	if ( ! data || ! data.data || ! data.data.Items.length ) {
// 		return false;
// 	}
// 	data.data.Items.sort( ( a, b ) => {
// 		return parseInt( b.sample_time.N ) - parseInt( a.sample_time.N );
// 	} );

// 	const ret = data.data.Items.reduce( ( prev, item, index ) => {
// 		if ( ! prev[ item.device_id.N ] ) {
// 			prev[ item.device_id.N ] = {
// 				device_data: item.device_data,
// 				device_id: item.device_id.N,
// 				sample_time: new Date( parseInt( item.sample_time.N ) ).toLocaleString(),
// 			};
// 		}
// 		return prev;
// 	}, {} );
// 	return Object.values( ret );
// };

/**
 *
 * @param {string} lat      format must be Degrees° Minutes' --- no seconds N/S
 * @param {string} lng      format must be Degrees° Minutes' --- no seconds N/S
 * @param          userData
 * @return {obj}
 */
export function deg2dec( lat, lng, userData ) {
	const SPACE_EXPRESSION = /\s+/;

	const LATITUDE_EXPRESSION = /^(\d{1,2})°(?:\s*(\d{1,2})[′'])?\s*(N|S|N\/S)$/; // 0- 90° 0-59′ N/S
	const LONGITUDE_EXPRESSION = /^(\d{1,3})°(?:\s*(\d{1,2})[′'])?\s*(E|W|E\/W)$/; // 0-180° 0-59′ E/W

	const matchText = ( expression, text ) => {
		expression.lastIndex = 0;
		return expression.exec( text );
	};

	const parseCordinate = ( expression, limit, surfaces, text ) => {
		const match = matchText( expression, text );
		if ( match ) {
			const degrees = parseInt( match[ 1 ] ); // 0-90° or 0-180°
			if ( degrees > limit ) {
				throw new Error( 'Incorrect degrees value (should be in range from 0 to ' + limit + ').' );
			}
			const minutes = parseInt( match[ 2 ] || '0' ); // 0-59′
			if ( minutes > 59 ) {
				throw new Error( 'Incorrect minutes value (should be in range from 0 to 59).' );
			}
			if ( degrees === 0 && minutes === 0 ) {
				return 0;
			}
			const surface = match[ 3 ]; // N/S or E/W
			switch ( surface ) {
				case surfaces[ 0 ]: return +( degrees + minutes / 60 );
				case surfaces[ 1 ]: return -( degrees + minutes / 60 );
				default:
					throw new Error( 'Incorrect surface value (should be ' + surfaces[ 0 ] + ' or ' + surfaces[ 1 ] + ').' );
			}
		}
		throw new Error( `Incorrect cordinate format. ${ lat }, ${ lng }, ${ JSON.stringify( userData.data.user_nicename ) }` );
	};

	const parseLatitude = ( latitude ) => parseCordinate( LATITUDE_EXPRESSION, 90, 'NS', latitude );
	const parseLongitude = ( longitude ) => parseCordinate( LONGITUDE_EXPRESSION, 180, 'EW', longitude );
	return {
		lat: parseLatitude( lat ),
		lng: parseLongitude( lng ),
	};

	const parsePosition = ( position ) => {
		if ( position ) {
			const parts = position.split( SPACE_EXPRESSION );
			if ( parts.length === 2 ) {
				const latitude = parseLatitude( parts[ 0 ] );
				const longitude = parseLongitude( parts[ 1 ] );
				return { latitude, longitude };
			}
		}
		return new Error( 'Incorrect position format.' );
	};
}

// function normalizeLightData( lightData, deviceData ) {
// 	// formula = raw data / (gain_val * (ATIME + 1) * (ASTEP + 1) * 2.78 / 1000);
// 	const gain = {
// 		0: .5,
// 		1: 1,
// 		2: 2,
// 		3: 4,
// 		4: 8,
// 		5: 16,
// 		6: 32,
// 		7: 64,
// 		8: 128,
// 		9: 256,
// 	};

// 	// todo: results of formula without a multiplier are very small.  Needs addressing
// 	const multiplier = 10;
// 	const res = multiplier * Number( lightData ) / ( gain[ deviceData.GAIN.N ] * ( Number( deviceData.ATIME.N ) + 1 ) * ( Number( deviceData.ASTEP.N ) + 1 ) * 2.78 / 1000 );
// 	return res;
// }
export function dataToGeoJson( sensorData, userData, radius ) {
	// coordinates [lat, lng]
	const c = userData.data.dl_meta.coordinates.replace( /\s/g, '' ).split( ',' );
	// location name (city, province, country)
	const l = userData.data.dl_meta.nickname[ 0 ].split( ',' );
	const latLng = deg2dec( c[ 0 ], c[ 1 ], userData );
	const deviceData = sensorData && sensorData.device_data.M;
	const geoJson = {
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [
				latLng.lng, // !!! geojson requires LNG / LAT - NOT LAT / LNG
				latLng.lat,
			],
		},
		properties: {
			markerRadius: radius || 5,
			markerColor: getMarkerColor( sensorData ),
			location: {
				city: l[ 0 ].trim(),
				province: l[ 1 ] && l[ 1 ].trim(),
				country: l[ 2 ] && l[ 2 ].trim(),
			},
			uuid: userData.data.user_nicename,
			userData,
		},
	};

	if ( deviceData ) {
		geoJson.properties.sample_time = sensorData.sample_time;
		geoJson.properties.chartColors = [
			{
				nm: 415,
				color: 'violet',
				intensity: normalizeLightData( deviceData.F1_415.N, deviceData ),
			},
			{
				nm: 445,
				color: 'light violet',
				intensity: normalizeLightData( deviceData.F2_445.N, deviceData ),
			},
			{
				nm: 480,
				color: 'blue',
				intensity: normalizeLightData( deviceData.F3_480.N, deviceData ),
			},
			{
				nm: 515,
				color: 'green',
				intensity: normalizeLightData( deviceData.F4_515.N, deviceData ),
			},
			{
				nm: 555,
				color: 'orange',
				intensity: normalizeLightData( deviceData.F5_555.N, deviceData ),
			},
			{
				nm: 590,
				color: 'light yellow',
				intensity: normalizeLightData( deviceData.F6_590.N, deviceData ),
			},
			{
				nm: 630,
				color: 'light violet',
				intensity: normalizeLightData( deviceData.F7_630.N, deviceData ),
			},
			{
				nm: 680,
				color: 'blue',
				intensity: normalizeLightData( deviceData.F8_680.N, deviceData ),
			},
		];
	}

	return geoJson;
}

export const ios = () => {
	if ( typeof window === `undefined` || typeof navigator === `undefined` ) {
		return false;
	}

	return /iPhone|iPod/i.test( navigator.userAgent || navigator.vendor || ( window.opera && opera.toString() === `[object Opera]` ) );
};

// export async function getAllUserIds() {
// 	const userArr = await fetchJson( `${ dlEndpoint }/dl/v1/subscribers` );
// 	const userIds = userArr.map( ( user ) => user.data.user_nicename );
// 	return userIds;
// }
