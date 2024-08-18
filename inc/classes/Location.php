<?php

class Location {
	private $post;
	public $ID;
	public function __construct($post) {
		$this->post = $post;
		$this->ID = $post->ID;
	}
	public function get_hours() {
		return get_field('all_hours', $this->ID);
	}
	public function get_name() {
		return $this->post->post_title;
	}
	public function get_short_name() {
		$address = $this->get_address();
		return $address ?? ['name'] ? $address['name'] : $this->get_name();
	}
	public function get_address() {
		$address = get_field('address', $this->ID);
		if (empty($address['street_name']))
			return false;
		return $address;
	}
	public function get_featured_image($size = "medium", $args = []) {
		return get_the_post_thumbnail($this->ID, $size, $args);
	}
	public function get_description() {
		return get_the_content(null, null, $this->ID);
	}
	public function get_directions() {
		return get_field('directions', $this->ID);
	}
	public function get_parking() {
		return get_field('parking', $this->ID);
	}

	public function get_directions_link(){
		$address = $this->get_address();
		$str =
				urlencode($address['street_number']) . "+"
				. urlencode($address['street_name']) . "%2C+"
				. urlencode($address['city']) . "%2C+"
				. urlencode($address['state']) . "+"
				. urlencode($address['zip_code']);
			// $map_url = "//maps.google.com/?q=$str";
			return "https://www.google.com/maps/dir/?api=1&destination=$str";

	}
	public function get_address_block(){
		$address = $this->get_address();
$pattern = '
<div class="address">
%s
</div>
<div class="address">
%s %s
</div>
<div class="address">
%s %s, %s
</div>
';

		$format = wp_sprintf($pattern,
		$address['name'],  
		$address['street_number'], 
		$address['street_name'],
		$address['city'], 
		$address['state'], 
		$address['zip_code']
	);
		return $format;

	}
	public function get_address_block_with_link(){
		$map_url = $this->get_directions_link();
		$address_block = $this->get_address_block();

		return wp_sprintf('<a href="%s">%s</a>',
		$map_url,
		$address_block
	);
	}
}