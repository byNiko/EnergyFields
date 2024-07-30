import '//cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.umd.js';

export default function makeChart( feature ) {
	const data = feature.properties.chartColors;
	const ctx = document.getElementById( `chart-${ feature.properties.uuid }` ).getContext( '2d' );
	let delayed;
	const dlChart = new Chart( ctx, {
		type: 'bar', //bar, scatter, line
		options: {
			animations: {
				y: {
					easing: 'easeInOutElastic',
					from: ( ctx ) => {
						if ( ctx.type === 'data' ) {
							if ( ctx.mode === 'default' && ! ctx.dropped ) {
								ctx.dropped = true;
								return 0;
							}
						}
					},
				},
			},
			animation: {
				onComplete: () => {
					delayed = true;
				},
				delay: ( context ) => {
					let delay = 0;
					if ( context.type === 'data' && context.mode === 'default' && ! delayed ) {
						delay = context.dataIndex * 550 + context.datasetIndex * 100;
					}
					return delay;
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					enabled: false,
				},
			},
			aspectRatio: .9,
			scales: {
				x: {
					title: {
						display: true,
						text: 'Wavelength (nm)',
						color: 'black',
					},
					// max: 680,
					ticks: {
						// callback: (value) => `${value} nm`,
					},
				},
				y: {
					title: {
						display: true,
						text: 'Brightness',
					},
					// max: 100,
					ticks: {
						// callback: (value) => `${value / 100}%`,
					},
				},
			},
		},

		data: {
			labels: data.map( ( row ) => row.nm ),
			datasets: [
				{
					// label: data.map( ( row ) => row.intensity ),
					data: data.map( ( row ) => row.intensity ),
					fill: true,
					tension: 0.65,
					borderColor: [ 'hsla(240, 99%, 53%, 0.2)' ],
					backgroundColor: [
						'hsla(268, 81%, 22%, .41)',
						'hsla(253, 100%, 52%, .41)',
						'hsla(208, 97%, 51%, .41)',
						'hsla(167, 90%, 46%, .41)',
						'hsla(121, 100%, 51%, .41)',
						'hsla(30, 100%, 51%, .41)',
						'hsla(360, 100%, 51%, .41)',
						'hsla(0, 98%, 51%, .41)',
					],
					borderColor: [
						'hsla(268, 81%, 22%, .91)',
						'hsla(253, 100%, 52%, .91)',
						'hsla(208, 97%, 51%, .91)',
						'hsla(167, 90%, 46%, .91)',
						'hsla(121, 100%, 51%, .91)',
						'hsla(30, 100%, 51%, .91)',
						'hsla(360, 100%, 51%, .91)',
						'hsla(0, 98%, 51%, .91)',
					],
					borderWidth: 1,
				},
			],
		},
	} );

	return dlChart;
}
