
function dataToRGB( chartColors ) {
	// return css color value
}

export default function getMarkerColor( sensorData ) {
	const chartColors = sensorData && sensorData.M ? sensorData.M : false;
	// default marker color
	const markerColor = 'hsla(0,100%, 100%, .7)';
	if ( chartColors ) {
		// run your RGB CODE
		//markerColor = dataToRGB( sensorData.M )
	}
	return markerColor;
}
