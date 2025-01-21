<?php
get_header();
?>
    <main id="main-content">
         <?php while (have_posts()) : the_post();
            if (have_rows('flexible_content')) {
                while (have_rows('flexible_content')) : the_row();
                    include 'components/_' . get_row_layout() . '.php';
                endwhile;
            } else { ?>
                <div class="container">
                    <div class="container-inner">
                            <div class="wp-page-title">
                                <h2><?php the_title() ?></h2>
                            </div>
                            <?php the_content(); ?>
                    </div>
                </div>
            <?php } ?>
         <?php endwhile; ?>
    </main>

<?php
get_footer();
?>
