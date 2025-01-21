<?php
	get_header();
?>

<?php
    while ( have_posts() ) :the_post(); ?>
        <div class="container">
            <div class="container-inner">
                <div class="wp-page-title">
                    <h2><?php the_title(); ?></h2>
                </div>
                <?php the_content(); ?>
            </div>
        </div>
    <?php endwhile; ?>

<?php
	get_footer();
?>
