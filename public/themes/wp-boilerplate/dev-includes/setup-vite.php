<?php

//global $local_site_url;

use Dotenv\Dotenv;
//require 'local-site-variable.php';
require 'version.php';

// Vite / Script Setup
// THIS IS WHERE THE SWITCH BETWEEN DEVELOPMENT AND AND PRODUCTION HAPPENS FOR VITE

if(WP_ENVIRONMENT_TYPE && WP_ENVIRONMENT_TYPE  === 'local') {
    include "vite-inc.php";
} else {

    function wp_fe_assets() {
        wp_enqueue_style( 'm9d-main-style', get_template_directory_uri() .'/dist/assets/css/index.css', array(), _S_VERSION );

        wp_enqueue_script( 'm9d-main-script', get_template_directory_uri() . '/dist/index.js', array(), _S_VERSION, true );
    }

    add_action( 'wp_enqueue_scripts', 'wp_fe_assets' );


    function add_type_to_js_scripts($tag, $handle, $source){
        // Add main js file and all modules to the array.
        $theme_handles = array(
            'm9d-main-script',
        );
        // Loop through the array and filter the tag.
        foreach($theme_handles as $theme_handle) {
            if ($theme_handle === $handle) {
                return $tag = '<script src="'. esc_url($source).'" type="module"></script>';
            } else {
                return $tag;
            }
        }
    }

    if(!is_admin()) {
        add_filter('script_loader_tag', 'add_type_to_js_scripts' , 10, 3);
    }
}
