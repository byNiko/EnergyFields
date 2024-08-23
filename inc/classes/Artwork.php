<?php

class Artwork {
	private $main_image_id;
	private $image_caption;
	private $post;
	private $ID;
	public $admission;
	public $is_exhibition;
	public $is_event;
	public $has_events;
	public $is_spotlight;
	public function __construct($post) {
		$this->post = $post;
		$this->ID = $post->ID;
		$this->main_image_id = get_field('main_image', $post);
		$this->admission = get_field('admission', $post);
		// $this->is_exhibition = has_term('exhibition', 'art-work-type', $post);
		// $this->is_event = has_term('event', 'art-work-type', $post);
		$this->has_events = get_field('has_events', $post);
		$this->is_exhibition = !$this->has_events;
		$this->is_event = $this->has_events;
		$this->is_spotlight = get_field('is_spotlight', $post);
	}

	public function get_all_events() {
		return get_field('events', $this->post);
	}
	public function get_event_day_of_week($date) {
		echo $date;
		$d = new DateTime(($date));
		return $d;
	}

	public function get_future_events() {
		$timesArr = $this->get_event_times();
		function test_future($time) {
			$date_now = strtotime(date('Y-m-d H:i:s'));
			return strtotime($time['start']) >= $date_now;
		}
		$filtered = array_filter($timesArr, "test_future");
		return $filtered;
	}

	public function get_event_times() {
		$timesArr = $this->get_all_events();
		usort($timesArr, function ($a, $b) {
			return strtotime($a['start']) <=> strtotime($b['start']);
		});
		return $timesArr;
	}

	public function get_artist_names() {
		$artists = $this->get_artists();
		$names = [];
		if ($artists):
			foreach ($artists as $artist):
				// var_dump($artist->post_title);
				$names[] = $artist->post_title;
			endforeach;
		endif;
		return $names;
	}
	public function get_card($class = "") {

		$format = "
		<a href='%s' class='art-work__card'>
		<figure class='has-matte %s'>
			<div class='art-work__main-img-wrapper'>
				%s
			</div>
			<figcaption class='art-work__title'>
			%s
			</figcaption>
		</figure>
	</a>";
		return sprintf(
			$format,
			$this->get_permalink(),
			$class,
			$this->get_main_image('medium', array('class' => 'img-fluid')),
			//$this->get_title()
			implode(',', $this->get_artist_names())
		);
	}
	public function get_main_img_url($size = 'full'){
		return wp_get_attachment_image_url($this->main_image_id, $size);
	}
	public function get_main_image($size = 'full', $arr = []) {
		return wp_get_attachment_image($this->main_image_id, $size, null, $arr);
	}

	public function get_image_caption() {
		return get_field('image_caption_styled', $this->post);
	}

	public function get_description() {
		return get_the_content($this->ID);
	}

	public function get_artists() {
		return get_field('artists', $this->ID);
	}
	public function get_locations() {
		return get_field('location', $this->ID);
	}

	public function get_permalink() {
		return get_permalink($this->ID);
	}
	public function get_title() {
		return $this->post->post_title;
	}

	public function get_categories(){
		return implode(' | ', wp_get_post_terms($this->ID, 'event-type', array( 'fields' => 'names' )));
	}
}
