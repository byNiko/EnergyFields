// import Papa from 'papaparse';
import { sheets2geojson } from 'sheets2geojson';
import * as maptilerClient from '@maptiler/client';
maptilerClient.config.apiKey = 'KTiP7S32chxDdJQgnfmu';

const csvSrc = {
	all: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT4H7hIFfHmMN7zsyAiK80m2D3tJYtI14SYbR4dpnJyy19cMWFPax_L5s3VO1tDuTuiq_F8_UMNovWz/pub?output=csv',
	earthquakes: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT4H7hIFfHmMN7zsyAiK80m2D3tJYtI14SYbR4dpnJyy19cMWFPax_L5s3VO1tDuTuiq_F8_UMNovWz/pub?gid=1683948339&single=true&output=csv',
	volcanos: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSaVHXlEsLrHOLo3JKbq0O0vzPJ-xq-V9aq38l9I6pw6PDK6Hwvq-psboedz5k_dbbERXb9Adsy4cyF/pub?output=csv',
	tsunamis: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vROhJHueNXQIrnKmUa2PllI-Lm0mRjmcSiB7x-00Q4-d9uFcG9BlIunLSgEN9ekN5dm7L3ABkFWEDul/pub?output=csv',
	weapons: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwROV3EGd85tHH2JxQ4Cf340RA_V-weDZBbcHwknqa7Flsy6ZZAY8OnOVJa-QDCaIUomKW2kwVrdPD/pub?output=csv',
	justEqks: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTXFMM5G7YNL7rOnNUXPOw6O8mM21wnZzEROZDzvJQdJIUhRzkmavHa3ASXfm0K0hIQJ_kLPCEx2tsc/pub?output=csv',
};

const csvSrcIds = {
	earthquakes_new: '1JwyeQcfNfsVtJBuvyehrqKuTieCrB5dTaBkjx5ogGxA',
	earthquakes: '2PACX-1vT4H7hIFfHmMN7zsyAiK80m2D3tJYtI14SYbR4dpnJyy19cMWFPax_L5s3VO1tDuTuiq_F8_UMNovWz',
	volcanos: '2PACX-1vSaVHXlEsLrHOLo3JKbq0O0vzPJ-xq-V9aq38l9I6pw6PDK6Hwvq-psboedz5k_dbbERXb9Adsy4cyF',
	tsunamis: '2PACX-1vROhJHueNXQIrnKmUa2PllI-Lm0mRjmcSiB7x-00Q4-d9uFcG9BlIunLSgEN9ekN5dm7L3ABkFWEDul',
	weapons: '2PACX-1vRwROV3EGd85tHH2JxQ4Cf340RA_V-weDZBbcHwknqa7Flsy6ZZAY8OnOVJa-QDCaIUomKW2kwVrdPD',
	justEqks: '2PACX-1vTXFMM5G7YNL7rOnNUXPOw6O8mM21wnZzEROZDzvJQdJIUhRzkmavHa3ASXfm0K0hIQJ_kLPCEx2tsc',
};

export const geoJson = await sheets2geojson( `${ csvSrcIds.justEqks }`, { latitudeColumn: 'lat', longitudeColumn: 'long' } );
export const allJson = await Promise.all( [
	sheets2geojson( `${ csvSrcIds.justEqks }`, { latitudeColumn: 'lat', longitudeColumn: 'long' } ),
	sheets2geojson( `${ csvSrcIds.volcanos }`, { latitudeColumn: 'lat', longitudeColumn: 'long' } ),
	sheets2geojson( `${ csvSrcIds.tsunamis }`, { latitudeColumn: 'lat', longitudeColumn: 'long' } ),
	sheets2geojson( `${ csvSrcIds.weapons }`, { latitudeColumn: 'lat', longitudeColumn: 'long' } ),
] );
// Papa.parse( csvSrc.earthquakes, {
// 	download: true,
// 	header: true,
// 	complete( results ) {
// 		console.log( results );
// 	},
// } );
// in an async function, or as a 'thenable':
// const result = await maptilerClient.geocoding.forward( 'paris' );
// console.log( 're', result );
