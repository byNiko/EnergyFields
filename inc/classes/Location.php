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
		return $address['name']? $address['name'] : $this->get_name();
	}
	public function get_address() {
		return get_field('address', $this->ID);
	}
	public function get_featured_image($size = "medium", $args = []){
		return get_the_post_thumbnail($this->ID, $size, $args);
	}
	public function get_description(){
		return get_the_content(null, null, $this->ID);
	}
	public function get_directions(){
		return get_field('directions', $this->ID);
	}
	public function get_parking(){
		return get_field('parking', $this->ID);
	}
}
