<?php

class Event extends Artwork{

	private $post, $ID;
	public function __construct($post)
	{
		$this->post = $post;
		$this->ID = $post->ID;
	}

	public function get_start(){
		return get_field('start', $this->ID);
	}
	public function get_end(){
		return get_field('end', $this->ID);
	}
	public function get_rsvp_link(){
		return get_field('link', $this->ID);
	}
	public function get_title(){
		return $this->post->post_title;
	}
	public function get_artwork(){
		return ($art_work = get_field('art_work', $this->ID))? 
		 new Artwork($art_work[0]) : false;
	}
	public function get_events($args = []){
		$default_args = array(
			// 'posts_per_page' => 8,
			'numberposts' => -1,
			'post_type' => 'event',
			'status' => 'publish'
		);
		$args = array_merge($default_args, $args);
		
		$events = get_posts($args);
		return $events;
	}
}