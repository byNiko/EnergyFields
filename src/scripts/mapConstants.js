import { fetchJson } from './mapFunctions.js';

// export const map_settings = await fetchJson( '/wp-json/dl/v2/sensor-map' );

export const mapBounds = [
	[ -90, -180 ],
	[ 90, 180 ],
];

export const mapMql = window.matchMedia( '(max-width: 900px)' );

// export const dlEndpoint = "/wp-json";
export const dlEndpoint = 'https://domesticlight.art/wp-json';
// export const dlEndpoint = "https://dev1.3n.design/wp-json";
// export const userUrl = `${ dlEndpoint }/dl/v1/user`;
// export const mediaEndpoint = `${ dlEndpoint }/wp/v2/media`;

