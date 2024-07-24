<?php
get_header();
?>
<main id="main-content">
    <?php
    if (have_rows('flexible_content')):
        while (have_rows('flexible_content')) : the_row();
            include 'partials/'.get_row_layout().'.php';
        endwhile;
    endif;
    ?>
</main>

<?php
get_footer();
?>
