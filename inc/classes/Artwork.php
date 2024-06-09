<?php

class Artwork{
	private $main_image_id;
	private $image_caption;
	private $post;
	private $ID;
	public function __construct($post)
	{
		$this->post = $post;
		$this->ID = $post->ID;
		$this->main_image_id = get_field('main_image', $post);		
	}

	public function get_main_image($size = 'full', $arr = []){
		return wp_get_attachment_image($this->main_image_id, $size, null, $arr);
	}

	public function get_image_caption(){
		return get_field('image_caption', $this->post);
	}

	public function get_description(){
		return get_the_content($this->ID);
	}

	public function get_artists(){
		return get_field('artists', $this->ID);
	}
	public function get_locations(){
		return get_field('location', $this->ID);
	}

public function get_permalink(){
	return get_permalink($this->ID);
}
public function get_title(){
	return $this->post->post_title;
}
}