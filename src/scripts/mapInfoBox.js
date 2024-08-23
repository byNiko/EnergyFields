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
infoBox.specialShown = false;

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
	<section class="infoBox--header-wrapper">
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
	</section>
	<section class='info-sections'>
		<div class='inner-info-sections'>
			<div class="inner-inner">
			
				<div class="infoBox-section magnitude">
					<div class="infoBox--title">Magnitude</div>
					<div class="infoBox--value" >${ props.Magnitude } <span class="magnitude-unit">(${ props.unit })</span></div>
				</div>
				<div class='infoBox-section impact'>
					<div class="infoBox--title">Impact</div>
					<div class="infoBox--value" >${ props.Impact }</div>
				</div>
			</div>
		</div>
	</section>
	<footer class='infoBox-section latLng'>
		<div class="infoBox--value">
		${ toDegrees(
		feature.geometry.coordinates[ 1 ], // LNG
		feature.geometry.coordinates[ 0 ] // LAT
	) }
		</div>
	</footer>
  `;
}
function makeInfoBoxHtml( feature ) {
	let html = '';
	if ( feature.properties.id === 'special' ) {
		html += makeSpecialInfoBoxHtml( feature );
	} else {
		html += makeInfoBoxHeader( feature );
	}
	return html;
}
function makeSpecialInfoBoxHtml( feature ) {
	const props = feature.properties;
	const date = new Date( props.Date );
	return `
	<section class="infoBox--header-wrapper">
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
	</section>
	<section class='info-sections'>
		<div class='inner-info-sections'>
			<div class="inner-inner">
				<div class='infoBox-section impact'>
					<div class="infoBox--value" >${ props.Impact }</div>
				</div>
			</div>
		</div>
	</section>
	<footer class='infoBox-section latLng'>
	</footer>
  `;
}

function isOverflowY( element ) {
	return element.scrollHeight !== Math.max( element.offsetHeight, element.clientHeight );
}

const setContainerMaxHeight = () => {
	const headerWrapperHeight = document.querySelector( '.infoBox--header-wrapper' ).offsetHeight;
	const footerHeight = document.querySelector( 'footer.infoBox-section' ).offsetHeight;
	const infoContainer = document.querySelector( '#overlay-map-info-container' );
	const mapInfoBox = infoContainer.querySelector( '.mapInfoBoxContainer' );
	const inner = document.querySelector( '.inner-info-sections' );
	// const ui_el = mapInfoBox.querySelector( '.map_ui_el' );
	const sectionContainer = document.querySelector( '.info-sections' );

	sectionContainer.classList.remove( 'isOverflow' );

	const h = infoContainer.offsetHeight;
	const sliderH = document.querySelector( '.slider-container' ).offsetHeight;

	inner.style.maxHeight = `${ h - sliderH - headerWrapperHeight - footerHeight - 64 }px`;
	if ( isOverflowY( sectionContainer ) ) {
		sectionContainer.classList.add( 'isOverflow' );
	}
};
// setContainerMaxHeight();

export default infoBox;
