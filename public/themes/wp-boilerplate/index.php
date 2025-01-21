<?php
get_header();
?>
<main id="main-content">
    <?php
    while (have_posts()) : the_post();
        if (have_rows('flexible_content')):
            while (have_rows('flexible_content')) : the_row();
                include 'components/_' . get_row_layout() . '.php';
            endwhile;
        endif;
    endwhile;
    ?>
</main>
<?php
get_footer();
?>
