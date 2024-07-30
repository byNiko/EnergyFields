// import { mapBounds } from './constants.js';
import htmlOverlay from './mapHtmlOverlay.js';

function makeIframe( src ) {
	src = new URL( src );
	src.searchParams.append( 'autoplay', 'false' ); // vimeo shorthand for {mute, autoplya, loop}
	src.searchParams.append( 'mute', 'false' ); // vimeo shorthand for {mute, autoplya, loop}
	const iframe = `<iframe class="embedded-video" src="${ src }" frameborder="0" allow="autoplay"></iframe>`;
	return iframe;
}
const videoOverlayOptions = {
	zoom( e ) { }, // not sure why we need this. fixes issue video placement changes on map zoom.
	left: '0',
	top: '0',
	opacity: 1,
	transformOrigin: 'left top',
};
const videoBounds = [
	[ -95, -180 ], [ 95, 180 ],
];
export function makeVideoOverlay( options ) {
	return new htmlOverlay( makeIframe( options.video_src ), videoBounds, videoOverlayOptions );
}

