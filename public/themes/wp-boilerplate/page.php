<?php
get_header();
?>
    <main id="main-content">
        <?php
        if (have_rows('flexible_content')) {
            while (have_rows('flexible_content')) : the_row();
                include 'components/_' . get_row_layout() . '.php';
            endwhile;
        } else { ?>
            <div class="container">
                <div class="container-inner">
                    <?php while (have_posts()) : the_post(); ?>
                        <div class="vg-page-title">
                            <h2><?php the_title() ?></h2>
                        </div>
                        <?php the_content(); ?>

                    <?php endwhile; ?>
                </div>
            </div>
        <?php } ?>
    </main>

<?php
get_footer();
?>
