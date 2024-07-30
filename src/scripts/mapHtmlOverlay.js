import { ios } from './mapFunctions.js';

export const HtmlOverlay = L.Layer.extend( {

	options: {
		interactive: false,
		zIndex: 1,
		className: '',
		idName: '',
		zoom: '',
		left: '',
		top: '',
		opacity: .5,
		transform: '',
		transformOrigin: '',
		// zoom: "10",
	},

	initialize( code, coords, options ) {
		// (String, LatLngBounds, Object)
		this._code = code; // code brut

		this._bounds = L.latLngBounds( [ coords, coords ] );

		L.setOptions( this, options );

		this._scale = 1;
	},

	// precious tool for moving around the htmlOverlay
	// with only one set of coords
	setLatLng( coords ) {
		this.setBounds( L.latLngBounds( [ coords, coords ] ) );
	},

	onAdd() {
		if ( ! this._dom ) {
			this._initDom();
		}

		if ( this.options.interactive ) {
			L.DomUtil.addClass( this._dom, 'leaflet-interactive' );
			this.addInteractiveTarget( this._dom );
		}

		this.getPane().appendChild( this._dom );
		this._reset();

		// set zoom if we're not setting it here.
		if ( this.options.zoom === '' ) {
			this.options.zoom = this._map.getZoom();
		}

		// scaling with zoom
		this._scale = this._map.getZoomScale(
			this._map.getZoom(),
			this.options.zoom
		);

		// set scale of el
		this._inner.style.transform = 'scale(' + this._scale + ')';
		this._map.on( 'zoomend', this._rescaleInnerHtml, this );
	},

	_rescaleInnerHtml() {
		// set scale after zoom
		this._scale *= this._rescale;
		this._inner.style.transform = 'scale(' + this._scale + ')';
	},

	onRemove() {
		this._map.off( 'zoomend', this._rescaleInnerHtml, this );

		L.DomUtil.remove( this._dom );
		if ( this.options.interactive ) {
			this.removeInteractiveTarget( this._dom );
		}
	},

	_initDom() {
		// create a div to hold our HTML
		const dom = L.DomUtil.create( 'div', 'leaflet-html-layer' );

		if ( this._zoomAnimated ) {
			L.DomUtil.addClass( dom, 'leaflet-zoom-animated' );
		}
		if ( this.options.className ) {
			L.DomUtil.addClass( dom, this.options.className );
		}

		dom.onselectstart = function() {
			return false;
		};
		dom.onmousemove = function() {
			return false;
		};

		if ( this.options.zIndex ) {
			this._updateZIndex();
		}

		// include this in the dom.
		dom.innerHTML = this._code;

		this._dom = dom;
		this._dom.style.position = 'relative';

		// avec des rÃ©glages css pour Ã©viter des soucis...
		this._inner = this._dom.childNodes[ 0 ]; // un seul noeud
		this._inner.style.position = 'absolute';
		this._inner.style.left = this.options.left;
		this._inner.style.transform = this.options.transform;
		this._inner.style.top = this.options.top;
		this._inner.style.opacity = this.options.opacity;
		this._inner.style.transformOrigin = this.options.transformOrigin;
		this._inner.style.pointerEvents = 'none';
		if ( ios() ) {
			// disable dragging of map
			// enable click on live video feed play button
			this._inner.style.pointerEvents = 'all';
		}
	},

	_animateZoom( e ) {
		const scale = this._map.getZoomScale( e.zoom ),
			offset = this._map._latLngBoundsToNewLayerBounds(
				this._bounds,
				e.zoom,
				e.center
			).min;

		L.DomUtil.setTransform( this._dom, offset, scale );

		this._rescale = scale;
	},

	// modified from ImageOverlay
	bringToFront() {
		if ( this._map ) {
			L.DomUtil.toFront( this._dom );
		}
		return this;
	},
	bringToBack() {
		if ( this._map ) {
			L.DomUtil.toBack( this._dom );
		}
		return this;
	},
	getElement() {
		return this._dom;
	},

	_reset() {
		const dom = this._dom,
			bounds = new L.Bounds(
				this._map.latLngToLayerPoint( this._bounds.getNorthWest() ),
				this._map.latLngToLayerPoint( this._bounds.getSouthEast() )
			),
			size = bounds.getSize();

		L.DomUtil.setPosition( dom, bounds.min );

		dom.style.width = size.x + 'px';
		dom.style.height = size.y + 'px';
	},
	_updateZIndex() {
		if (
			this._dom &&
			this.options.zIndex !== undefined &&
			this.options.zIndex !== null
		) {
			this._dom.style.zIndex = this.options.zIndex;
		}
	},
	_overlayOnError() {
		this.fire( 'error' );
	},

	// copied from mageOverlay
	setBounds( bounds ) {
		this._bounds = L.latLngBounds( bounds );

		if ( this._map ) {
			this._reset();
		}
		return this;
	},
	getEvents() {
		const events = {
			zoom: this._reset,
			viewreset: this._reset,
		};

		if ( this._zoomAnimated ) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},
	setZIndex( value ) {
		this.options.zIndex = value;
		this._updateZIndex();
		return this;
	},
	getBounds() {
		return this._bounds;
	},
} );

export default function htmlOverlay( name, bounds, options ) {
	return new HtmlOverlay( name, bounds, options );
}
