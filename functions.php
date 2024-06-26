<?php

/**
 * byniko functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package byniko
 */

if (!defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.0');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function byniko_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on byniko, use a find and replace
		* to change 'byniko' to the name of your theme in all the template files.
		*/
	// load_theme_textdomain('byniko', get_template_directory() . '/languages');

	// Add default posts and comments RSS feed links to head.
	// add_theme_support('automatic-feed-links');

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support('title-tag');

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support('post-thumbnails');

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__('Primary', 'byniko'),
			'menu-2' => esc_html__('Secondary', 'byniko'),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support('customize-selective-refresh-widgets');

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action('after_setup_theme', 'byniko_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function byniko_content_width() {
	$GLOBALS['content_width'] = apply_filters('byniko_content_width', 640);
}
add_action('after_setup_theme', 'byniko_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function byniko_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__('Sidebar', 'byniko'),
			'id'            => 'sidebar-1',
			'description'   => esc_html__('Add widgets here.', 'byniko'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action('widgets_init', 'byniko_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function byniko_scripts() {
	// asset versioning from npm build process
	$asset_file = include(get_stylesheet_directory() . '/dist/main.asset.php');
	wp_enqueue_style(
		'byniko-style',
		get_stylesheet_directory_uri() . "/dist/main.css",
		array(),
		$asset_file['version']
	);

	wp_enqueue_style(
		'byniko-google-fonts',
		"//fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
		array(),
		$asset_file['version']
	);
	wp_enqueue_style(
		'byniko-google-fonts2',
		"//fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
		array(),
		$asset_file['version']
	);


	wp_enqueue_script(
		'byniko-script',
		get_template_directory_uri() . '/dist/main.js',
		array(),
		$asset_file['version'],
		true
	);



	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'byniko_scripts');

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

// autoload classes
spl_autoload_register(function ($class_name) {
	get_template_part("/inc/classes/$class_name");
});


// Auto add and update Title field for Event Post Type
// todo: take a look at this to figure out the issue we've got
// https://wordpress.stackexchange.com/questions/105926/rewriting-post-slug-before-post-save
function byniko_custom_event_post_title_and_slug($post_id) {
	$my_post = array();
	$my_post['ID'] = $post_id;
	if (get_post_type() == 'event') {
		
		$artwork = get_field('art_work', $post_id);
		$daytime = get_field('start', $post_id);
		$my_post['post_title'] = $artwork[0]->post_title . ': ' . $daytime;
		$my_post['post_name'] = sanitize_title($my_post['post_title']);
		remove_action( 'save_post', 'byniko_custom_event_post_title_and_slug', 10, 3 );
		wp_update_post($my_post);
		add_action( 'save_post', 'byniko_custom_event_post_title_and_slug', 10, 3 );
	}
}

// run after ACF saves the $_POST['fields'] data
add_action('acf/save_post', 'byniko_custom_event_post_title_and_slug', 25);


function byniko_get_events($args=[]){
	$paged = (get_query_var('paged')) ? get_query_var('paged') : 0;
	$postsPerPage = 2;
	$postOffset = $paged * $postsPerPage;
	// get all locations
	$default_args = array(
		'posts_per_page'  => $postsPerPage,
		'offset'          => $postOffset,
		'post_type' => 'event',
		'status' => 'publish'
	);
	$args = array_merge($default_args, $args);
	return get_posts($args);
	// return new WP_Query($args);
}

function byniko_pre_get_events( \WP_Query $query ) {
    if ( is_admin() ) {
        return; // we want the frontend! exit if it's WP Admin
    }
    if ( !$query->is_main_query() ) {
        return; // we want the main query!
    }
    if ( ! is_page( 'Special Events' ) ) {
        return; // we only want the movie archives
    }
    // On the movie archive, show 50 posts
    // $query->set( 'post_type', 'event' );
}

add_action( 'pre_get_posts', 'byniko_pre_get_events', 1 );

function add_slug_body_class( $classes ) {
	global $post;
	if ( isset( $post ) ) {
	$classes[] = $post->post_type . '-' . $post->post_name;
	}
	return $classes;
	}
	add_filter( 'body_class', 'add_slug_body_class' );

	function get_arrow($size = ''){
		return sprintf(
			"<div class='arrow-parts__wrapper %s'>
		<div class='arrow_parts'>
			<div class='arrow-parts__circle'></div>
			<div class='arrow-parts__line'></div>
			<div class='arrow-parts__spade'></div>
		</div>
	</div>",
		$size);
	
	}

	function get_arrow_with_date($start_date, $end_date){
		$arrow_html = get_arrow();
		$format = "
<div class='date-arrow__date' style='margin-right: 1rem'>%s</div>
			%s
			<div class='date-arrow__date' style='margin-left: .5rem'>%s</div>
		";
		return sprintf($format,$start_date, $arrow_html, $end_date);
	}