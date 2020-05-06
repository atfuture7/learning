<?php
// ***** 20200502
// for image editing, install php library gd2 https://wordpress.org/support/topic/basic-image-editor-not-working/


/**
*set up theme defaults
*/
function newDev_theme_setup(){
	//make themeab aliable for translation
	load_theme_textdomain('newDev',get_template_directory().'/languages');

	//register navigatio nmenu
	register_nav_menus(array(
		'primary'	=>__('HeaderMenu','newDev')
		,'secondary'=>__('FooterMenu','newDev')
	));

	//Activate Custom Background
	//IIS permissions https://wordpress.org/support/topic/file-permissions-for-wordpress-on-iis-80/
	add_theme_support('custom-background');
	add_theme_support('custom-header');
	//activate featured image
	add_theme_support('post-thumbnails');
	//Acticate post formats
	add_theme_support( 'post-formats', array( 'image', 'quote') );
	// 20200503 Switvh default markup for comment list, comment form etc to output valid HTML5
	add_theme_support('html5', array( 'comment-list', 'comment-form', 'search-form')) ;
	
}
add_action('after_setup_theme','newDev_theme_setup');


/**
*Enqueue scripts and styles
*/
function newDev_load_script(){
	//theme stylesheet
	wp_enqueue_style('newDev',get_template_directory_uri().'/css/newDev.css',array(),'1.0.0','all');
	wp_enqueue_style('boostrap-style',get_template_directory_uri().'/css/bootstrap.min.css',false,'4.4.1','all');
	//google font
	wp_enqueue_style('add_google_fonts',"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap",false);
	//wp_enqueue_style('font-awesome-cdn',"https://use.fontawesome.com/releases/v5.5.0/css/all.css");
	wp_enqueue_style('font-awesome-cdn',get_template_directory_uri().'/css/all.min.css', array(),'5.5.0','all');
	
	//theme javascript
	//https://wpshout.com/quick-guides/use-wp_enqueue_script-include-javascript-wordpress-site/
	//https://digwp.com/2009/06/including-jquery-in-wordpress-the-right-way/
	wp_deregister_script('jquery');
	wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.5.0.min.js', array(), null, true);
	//wp_enqueue_script('newDevjs',get_template_directory_uri().'/js/newDev.js',array('jQuery'));
    wp_register_script( 'newDev', get_template_directory_uri().'/js/newDev.js', array('jquery'), true  );
	wp_enqueue_script('newDev');
	//wp_enqueue_script('boostrap-script',get_template_directory_uri().'/js/bootstrap.min.js',array('jQuery'),'4.4.1',true);
	wp_register_script( 'boostrap-script', get_template_directory_uri().'/js/bootstrap.min.js') ;
	wp_enqueue_script('boostrap-script');

}
add_action('wp_enqueue_scripts','newDev_load_script');


/**
* Register widget area.
*/
//There is naming convention for the sidebar https://developer.wordpress.org/reference/functions/register_sidebar/
// https://developer.wordpress.org/themes/functionality/sidebars/ 1) name with theme name. 2) lowercase (or with number?)
function newDev_widgets_init() {
	register_sidebar( array(
		'name'		=> __( 'Main Sidebar', 'newDev'),
		'id'		=> 'sidebar-1',
		'description'	=> __( 'Add widgets here to appear in your main sidebar.', 'newDev'),
		'before_widget'	=> '<div id="%1$s" class="widget %2$s">',
		'after_widget'	=> '</div>',
		'before_title'	=> '<h2 class="widget-title">',
		'after_title'	=> '</h2>',
	));
}

add_action( 'widgets_init', 'newDev_widgets_init' );

/**
 * Custom Post Type
 */
function newDev_custom_post_type() {
	$labels = array(
		'name'				=> __( 'Work', 'newDev' ),
		'singular_name'		=> __( 'Work', 'newDev' ),
		'add_new_item'		=> __( 'Add New Work', 'newDev' ),
		'new_item'			=> __( 'New Work', 'newDev' ),
		'edit_item'			=> __( 'Edit Work', 'newDev' ),
		'view_item'			=> __( 'View Work', 'newDev' ),
		'all_items'			=> __( 'All Work', 'newDev' ),
		'search_items'		=> __( 'Search Work', 'newDev' ),
		'not_found'			=> __( 'No Work found', 'newDev' ),
		'not_found_in_trash'=> __('No Work found in trash', 'newDev'),
	);
	$args = array(
		'labels'			=> $labels,
		'public'			=> true,
		'has_archive'			=> true,
		'publicly_queryable'	=> true,
		'query_var'			=> true,
		'rewrite'			=> array('slug' => 'work'),
		'capability_type'	=> 'post',
		'hierarchical'		=> false,
		'supports'			=> array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'comments' ),
		//'taxonomies'		=> array( 'category', 'post_tag' ), 
	);

	register_post_type( 'nd_work', $args ); 
}
add_action( 'init', 'newDev_custom_post_type' );



//Add Custom CSS class to navigation menu 
function remove_parent_class($class) {
    //check for current_page_parent class, return false if they exist
    return ($class == 'current_page_parent') ? FALSE : TRUE; 
}

function add_class_to_wp_nav_menu($classes, $item) {

	switch (get_post_type()) {
	    case 'nd_work':
	        // we're viewing a custom post type, so remove the 'current_page_parent' from Blog menu item.
	        $classes = array_filter($classes, "remove_parent_class");
	        // add the current_page_parent class to Work menu item.
	        if (80 == $item->ID) { //ive changed this the previous ID
	           $classes[] = 'current_page_parent';
	        }
	   		break; 
	    // add more cases if necessary and/or a default   
  	}
 	return $classes;

}
add_filter('nav_menu_css_class', 'add_class_to_wp_nav_menu',10, 2);

/**
 *  Add Custom Post type to Query
 */
 function add_custom_post_types_to_query ($query) {

 	if( is_category() || is_tag() ) {
 		$post_type = (get_query_var('post_type')) ? get_query_var('post_type') : array('nav_menu_item', 'post', 'nd_work' );
 		$query->set( 'post_type', $post_type );

 		return $query;
 	}

 }
 add_filter( 'pre_get_posts', 'add_custom_post_types_to_query' );

/*
 *Pagination on custom query goes to 404 error page (Solved)
 */
function get_all_work_posts( $query ) {
        if( ! is_admin() && is_post_type_archive( 'nd_work' ) && $query->is_main_query() ) {
            $query->set( 'posts_per_page', '1' );
        }
    }
add_action( 'pre_get_posts', 'get_all_work_posts' );

/**
 *  Custom Taxonomies 
 */
function newDev_custom_taxonomies() {
	//add new taxonomy hierarchical
	$labels = array(
		'name'			=> __( 'Work Types', 'newDev' ),
		'singular_name' => __( 'Work Type', 'newDev' ),
		'all_items'		=> __( 'All Work Types', 'newDev' ),
		'edit_item'		=> __( 'Edit Work Type', 'newDev' ),
		'view_item'		=> __( 'View Work Type', 'newDev' ),
		'update_item'	=> __( 'Update Work Type', 'newDev' ),
		'add_new_item'	=> __( 'Add New Work Type', 'newDev' ),
		'new_item_name'	=> __( 'New Work Type Name', 'newDev' ),
		'parent_item'	=> __( 'Parent Work Type', 'newDev' ),
		'parent_item_colon'	=> __( 'Parent Work Type:', 'newDev' ),
		'not_found'		=> __( 'No Work Types Found', 'newDev' ),
		'search_items'	=> __( 'Search Work Types', 'newDev' ),
	);
	$args = array(
		'labels' 		=> $labels,
		'hierarchical'	=> true,
		'show_ui'		=> true,
		'show_admin_column'	=> true,
		'rewrite'		=> array('slug' => 'work-type'),
		'query_var'		=> true,

	);
	register_taxonomy( 'work_type', 'nd_work', $args);

	//add new taxonomy NOT hierarchical
	register_taxonomy( 'work_tag', 'nd_work', array( 
		'label'    		=> 'Work Tags',
		'rewrite'  		=> array('slug' => 'work-tag'),
		'hierarchical'	=> false,
	) );		
}
add_action( 'init', 'newDev_custom_taxonomies' );


?>