/* eslint-disable camelcase */
import toDegrees from './mapToDegrees.js';
import { ios, fetchJson } from './mapFunctions.js';

import getTime from './mapGetTime.js';
// import makeChart from './mapMakeChart.js';
// import makeSlider from './mapMakeSlider.js';
// import { mediaEndpoint } from './mapConstants.js';
// const L = window.L;
const emptyBoxText = ios()
	? `Best viewed on tablet or desktop. If you’re on IOS please click the play button`
	: 'Click on a marker';
// const infoBox = L.control( { position: 'bottomleft' } );
const infoBox = document.querySelector( '#mapInfoBox .infoBox' );

// infoBox.Chart = false;
infoBox.markerClicked = false;

// infoBox.onAdd = function( map ) {
// 	this._div = L.DomUtil.create( 'div', 'infoBox' ); // create a div with a class "info"
// 	this.update();
// 	return this._div;
// };
infoBox.close = function() {
	this.closest( '.mapInfoBoxContainer' ).classList.add( 'isHidden' );
};

// method that we will use to update the control based on feature properties passed
infoBox.update = async function( feature ) {
	this.closest( '.mapInfoBoxContainer' ).classList.remove( 'isHidden' );
	const infoEl = this;

	if ( ! feature ) {
		infoBox.markerClicked = false;
		infoEl.classList.add( 'is-empty' );
		infoEl.innerHTML = `
			<header class="infoBox--header">
		<div class="infoBox--title">
		${ emptyBoxText }
		</div>
		<button class="close-infoBox">X</button>
	</header>`;
		infoBox.close();
		return;
	}
	infoBox.markerClicked = feature.properties.id;
	infoEl.classList.remove( 'is-empty' );
	infoEl.innerHTML = makeInfoBoxHtml( feature );
	setContainerMaxHeight();
};

// infoBox.update();
infoBox.close();

function makeInfoBoxHeader( feature ) {
	const props = feature.properties;
	const date = new Date( props.Date );
	return `
	<header class="infoBox--header">
		<div class="infoBox--title">
			<div class="infoBox--year">${ date.getFullYear() }</div>
			<div class="infoBox--location">${ props.Location }</div>
		</div>
		<button class="close-infoBox">X</button>
	</header>
	<div class='infoBox-section name'>
		<div class="infoBox--value">
		${ props.Name }
		</div>
	</div>
	<div class="infoBox-section magnitude">
		<div class="infoBox--title">Magnitude</div>
		<div class="infoBox--value" >${ props.Magnitude } <span class="magnitude-unit">(${ props.unit })</span></div>
	</div>
	<div class='infoBox-section impact'>
		<div class="infoBox--title">Impact</div>
		<div class="infoBox--value" >${ props.Impact }</div>
	</div>
	<div class='infoBox-section latLng'>
		<div class="infoBox--value">
		${ toDegrees(
		feature.geometry.coordinates[ 1 ], // LNG
		feature.geometry.coordinates[ 0 ] // LAT
	) }
		</div>
	</div>
</div>
  `;
}
function makeInfoBoxHtml( feature ) {
	let html = '';
	html += makeInfoBoxHeader( feature );
	return html;
}

function isOverflowY( element ) {
	return element.scrollHeight !== Math.max( element.offsetHeight, element.clientHeight );
}

const setContainerMaxHeight = () => {
	const infoContainer = document.querySelector( '#overlay-map-info-container' );
	const mapInfoBox = infoContainer.querySelector( '.mapInfoBoxContainer' );
	const ui_el = mapInfoBox.querySelector( '.map_ui_el' );

	mapInfoBox.classList.remove( 'isOverflow' );

	const h = infoContainer.offsetHeight;
	const sliderH = document.querySelector( '.slider-container' ).offsetHeight;

	ui_el.style.maxHeight = `${ h - sliderH - 64 }px`;
	if ( isOverflowY( mapInfoBox ) ) {
		mapInfoBox.classList.add( 'isOverflow' );
	}
};
// setContainerMaxHeight();

export default infoBox;
