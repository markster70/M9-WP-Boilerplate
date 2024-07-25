<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

// Vite Includes

require 'dev-includes/setup-vite.php';

// Register theme defaults.
add_action('after_setup_theme', function () {
    add_theme_support('menus');
    add_theme_support('post-thumbnails');

});

/* ----------------------------------- */
// CUSTOM THEME SETTINGS
/* ----------------------------------- */

//customise register to add additional theme settings
add_action('customize_register', 'theme_customize_register');

//custom theme settings
function theme_customize_register($wp_customize) {

}

/* ----------------------------------- */
// NAV CLASS
/* ----------------------------------- */
function active_nav_class ($classes, $item) {
    return $classes;
}

//register nav class
add_filter('nav_menu_css_class' , 'active_nav_class' , 10 , 2);

/* ----------------------------------- */
// CUSTOM CONTACT FORM
/* ----------------------------------- */
add_action('wp_ajax_nopriv_process_contact_form', 'process_contact_form');
add_action('wp_ajax_process_contact_form', 'process_contact_form');

function process_contact_form()
{
    $to = "hello@kimco.dev";
    $subject = 'Website Enquiry';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = 'From: KIMCO Website <noreply@kimco.dev>';
    $message = '<b>First Name:</b> '.$_POST["firstname"]."<br />";
    $message = '<b>Last Name:</b> '.$_POST["lastname"]."<br />";
    $message .= '<b>Email Address:</b> '.$_POST["email"]."<br />";
    $message .= '<b>Contact Number:</b> '.$_POST["contact"]."<br />";
    $message .= '<b>Company Name:</b> '.$_POST["company"]."<br />";
    $message .= '<b>Website URL:</b> '.$_POST["website"]."<br />";
    $message .= '<b>Message:</b><br />'.nl2br($_POST["message"]);
    $attachments = "";
    $sent = wp_mail($to, $subject, $message, $headers, $attachments);
    if (!$sent) {
        echo '<div class="form__error"><p>There was a problem submitting this form. Please re-complete and try again.</p></div>';
    } else {
        echo '<div class="form__success"><p>Message received, thank you.<br />We\'ll be in touch shortly.</p></div>';
    }
    wp_die();
}

//// Remove admin dashboard widgets.
add_action('wp_dashboard_setup', function () {
    remove_meta_box('dashboard_activity', 'dashboard', 'normal'); // Activity
    // remove_meta_box('dashboard_right_now', 'dashboard', 'normal'); // At a Glance
    remove_meta_box('dashboard_site_health', 'dashboard', 'normal'); // Site Health Status
    remove_meta_box('dashboard_primary', 'dashboard', 'side'); // WordPress Events and News
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side'); // Quick Draft
});

// needs to be setup for each build
function override_MCE_options($init)
{
    // Define custom colors with their corresponding HEX codes and names
    // see map of css vars in comment above
    $custom_colors = '
        "ffffff", "White",
        "000000", "Black",
        "E879F9", "Bright Purple",
        "820069", "Dark Purple",
        "12D8D", " Light Purple",
        "F0ABFC", "Extra Light Purple",
        "0284C7", "Light Blue",
        "334155", "Dark Steel",
        "475569", "Light Steel",
        "EFEFEF", "Light Grey",
    ';

    // Build the color grid palette using custom colors
    $init['textcolor_map'] = '[' . $custom_colors . ']';

    // Change the number of rows in the color grid (1 row in this case)
    $init['textcolor_rows'] = 1;

    return $init;
}

// Add a filter to apply the custom color settings
add_filter('tiny_mce_before_init', 'override_MCE_options');

// MOVE ANY SCRIPTS TO FOOTER
add_action('init', function () {
    remove_action('wp_head', 'wp_print_scripts');
    remove_action('wp_head', 'wp_print_head_scripts', 9);
    //add_action('wp_footer', 'prnt_emoji_detection_script', 5);
    add_action('wp_footer', 'wp_print_scripts', 5);
    add_action('wp_footer', 'wp_print_head_scripts', 5);
});

// REMOVING SUPERFLUOUS SCRIPTS AND CSS HERE
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
add_action( 'wp_enqueue_scripts', function() {
    wp_dequeue_style( 'classic-theme-styles' );
}, 20 );

function remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
}
add_action( 'wp_enqueue_scripts', 'remove_wp_block_library_css', 100 );

/*  DISABLE GUTENBERG STYLE IN HEADER| WordPress 5.9 */
function remove_global_wp_styles_css(){
    wp_dequeue_style( 'global-styles' );
}
add_action( 'wp_enqueue_scripts', 'remove_global_wp_styles_css', 100 );
