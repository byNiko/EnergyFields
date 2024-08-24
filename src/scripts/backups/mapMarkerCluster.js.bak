import '//cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js';

function iconCreateFunction( cluster ) {
	const childCount = cluster.getChildCount();

	let c = ' marker-cluster-';
	if ( childCount < 10 ) {
		c += 'small';
	} else if ( childCount < 100 ) {
		c += 'medium';
	} else {
		c += 'large';
	}

	return new L.DivIcon( {
		html: `<span>${ childCount }</span>`,
		className: 'marker-cluster' + c,
	} );
}

const markerClusterGroupOptions = {
	spiderfyOnMaxZoom: true,
	showCoverageOnHover: true,
	zoomToBoundsOnClick: true,
	disableClusteringAtZoom: 4,
	chunkedLoading: true,
	maxClusterRadius( zoom ) {
		return 1;
	},
	iconCreateFunction,
};

const markers = L.markerClusterGroup( markerClusterGroupOptions );

export default markers;
