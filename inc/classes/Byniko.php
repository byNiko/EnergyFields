<?php

class Byniko {

	public function __construct() {
		
	}

	public function get_acf_link($linkArr, $classes =''){
		$pattern = '<a href="%1$s" target="%2$s" class="%4$s">%3$s</a>';
		return wp_sprintf($pattern, $linkArr['url'], $linkArr['target'], $linkArr['title'], $classes);

	}

	public function get_all_work_with_events() {
		$args = array(
			'posts_per_page'  => -1,
			'post_type' => 'art-work',
			'status' => 'publish',
			'meta_key'      => 'has_events',
			'meta_value'    => true
		);

		return get_posts($args);
	}
	public function assign_og_post_id_to_all_events() {
		$all_works_with_events = $this->get_all_work_with_events();
		$arr = [];
		foreach ($all_works_with_events as $work) {
			// get all events inside each artwork entry
			$evts = get_field('events', $work->ID);
			// attatch hte original post_id to the event information
			foreach ($evts as $evt) {
				$evt['ID'] = $work->ID;
				$arr[] = $evt;
			}
		}
		// return all events;
		return $arr;
	}

	public function get_all_events() {
		$events = $this->assign_og_post_id_to_all_events();

		usort($events, function ($a, $b) {
			// var_dump(strtotime($a['start']));
			return strtotime($a['start']) >= strtotime($b['start']);
		});


		return $events;
	}

	public function get_all_future_events() {
		$events = $this->get_all_events();

		function test_future($date) {
			$date_now = strtotime(date('Y-m-d H:i:s'))  - 43000;			
			return strtotime($date['start'])  >= $date_now;
		}
		$filtered = array_filter($events, "test_future");
		return $filtered;
	}
}
