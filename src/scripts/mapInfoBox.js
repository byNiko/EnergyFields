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
const infoBox = L.control( { position: 'bottomleft' } );

infoBox.Chart = false;
infoBox.markerClicked = false;
infoBox.onAdd = function( map ) {
	this._div = L.DomUtil.create( 'div', 'infoBox' ); // create a div with a class "info"
	this.update();
	return this._div;
};

// method that we will use to update the control based on feature properties passed
infoBox.update = async function( feature ) {
	const infoEl = this._div;

	if ( ! feature ) {
		infoBox.markerClicked = false;
		infoEl.classList.add( 'is-empty' );
		infoEl.innerHTML = `<div class="">${ emptyBoxText }</div>`;
		return;
	}
	console.log( 'got here', infoBox, feature );
	infoBox.markerClicked = feature.properties.id;
	infoEl.classList.remove( 'is-empty' );
	infoEl.innerHTML = makeInfoBoxHtml( feature );
	// makeSlider();
	// if ( feature.properties.chartColors ) {
	// 	infoBox.Chart = makeChart( feature );
	// }
	//makeInfoBoxImg( feature, infoEl );
};

// async function makeInfoBoxImg( feature, infoEl ) {
// 	const slideWrapper = infoEl.querySelector( '.popup--slide-wrapper' );
// 	const targetDiv = document.querySelector( '.injected-content' );
// 	if ( ! slideWrapper || ! targetDiv ) {
// 		return;
// 	}

// 	const mediaData = await fetchJson( `${ mediaEndpoint }/${ feature.properties.userData.data.dl_meta.featured_image }` );
// 	if ( mediaData ) {
// 		const img = ( () => {
// 			const imgSrc = mediaData.media_details.sizes.thumbnail.source_url;
// 			const image = document.createElement( 'img' );
// 			image.src = imgSrc;
// 			return image;
// 		} )();
// 		if ( img.src !== null ) {
// 			slideWrapper.classList.add( 'has-slides' );
// 			targetDiv.append( img );
// 		}
// 	}
// }

// function makeSliderWrapper( feature ) {
// 	return `<div class="popup--slide-wrapper">
//     <div class="popup--slide">
//         <div class="chart--canvas-wrapper">
//             <canvas class="chart--canvas" id="chart-${ feature.properties.id }"></canvas>
//         </div>
//         <!-- /chart--canvas-wrapper-->
//     </div>
//     <!-- /popup--slide -->
//     <div class="popup--slide">
//         <div class="injected-content"></div>
//     </div>
//     <!-- popup--slide-->
//     <div class="slide--controls">
//         <button class="popup--slide-btn popup--slide-btn-next">></button>
//         <button class="popup--slide-btn popup--slide-btn-prev"><</button>
//     </div>
//     <!-- /slide--control-->
// </div>
// <!--/popup--slide-wraper-->`;
// }
function makeInfoBoxHeader( feature ) {
	const props = feature.properties;
	console.log( 'location', props );
	return `
	<header class="infoBox-header">
	<div class="infoBox--event-name">${ props.Name }</div>
	<div class="infoBox--province">
	<div class='infoBox--title'>Location</div>
  ${ props.Location }
  </div>
  <div class="infoBox--latLng">
  <div class="infoBox--title">Lat/Lng:</div>
  ${ toDegrees(
		feature.geometry.coordinates[ 1 ], // LNG
		feature.geometry.coordinates[ 0 ] // LAT
	) }
  </div>
  <div class="infoBox--time-wrap">
  <div class="infoBox--title">Year:</div>
  <div class="infoBox--time">${ props.Year }</div>
  </div>
  </header>`;
}
function makeInfoBoxHtml( feature ) {
	let html = '';
	html += makeInfoBoxHeader( feature );
	// if ( feature.properties.chartColors ) {
	// 	html += makeSliderWrapper( feature );
	// }
	html += `
	<div class='infoBox--title'>Impact</div>
	<div class='infobox__content'>${ feature.properties.Impact }</div>
	`;
	return html;
}

export default infoBox;
