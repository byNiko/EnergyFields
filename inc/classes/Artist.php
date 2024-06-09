<?php

class Artist {
	private $ID;
	private $post;
	public function __construct($post) {
		$this->post = $post;
		$this->ID = $post->ID;
	}

	public function get_art_works() {
		return get_field('art_work', $this->ID);
	}

	public function get_post($selector =  null) {
		return $selector === null ?
			$this->post :
			$this->post->$selector;
	}

	public function get_artist_image() {
		return get_the_post_thumbnail($this->post->ID, 'medium');
	}
}
