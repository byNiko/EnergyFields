
import L from 'leaflet';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
// constants for the slider
const slider = document.getElementById( 'map-slider' );
const defaultStartDate = 'Jan 1,2020';
const defaultEndDate = 'Dec 1,2020';
const weekdays = [
	'Sunday', 'Monday', 'Tuesday',
	'Wednesday', 'Thursday', 'Friday',
	'Saturday',
];

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
const Slider = L.Control.extend( {
	options: {
		position: 'topleft',
	},
	onAdd( map ) {
		const controlSlider = L.DomUtil.create( 'div', 'map-slider', L.DomUtil.get( 'map' ) );
		// here we can fill the slider with colors, strings and whatever
		controlSlider.innerHTML = '<form><input id="command" type="checkbox"/>command</form>';
		return controlSlider;
	},
} );
map.addControl( new Slider() );

slider.noUiSlider.on( 'update', function( values, handle ) {
	// dateValues[ handle ].innerHTML = formatDate( new Date( +values[ handle ] ) );
	const new_times = slider.noUiSlider.get();
	// addDataToHexMap(geo_features,new_times[0],new_times[1])
	console.log( dateValues );
	dateValues[ 2 ].innerHTML = addDataToHexMap( geo_features, new_times[ 0 ], new_times[ 1 ] );
	// console.log(values[handle])
} );

function timestamp( str ) {
	return new Date( str ).getTime();
}
