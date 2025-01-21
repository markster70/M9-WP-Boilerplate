<?php
get_header();
?>
<main id="main-content">
    <!-- include a hero here if you need one -->
    <div class="container">
        <div class="container-inner">
            <div class="all-posts-wrapper all-posts">
                <?php  global $wp_query; ?>
                <div class="all-posts-intro">
                    <div class="container">
                        <div class="container-inner">
                            <!-- add intro / title for all posts page here from acf if needed -->
                        </div>
                    </div>
                </div>
                <ul class="news-posts-items">
                    <?php
                    if(have_posts()) :
                        $aos_item_delay = 100;
                        while (have_posts()) : the_post(); ?>
                            <li class="news-posts-card" data-aos="fade-up" data-aos-delay="<?php echo $aos_item_delay;?>">
                                <?php
                                $single_post_id = get_the_ID();
                                $aos_item_delay += 200;
                                ?>
                                <div class="news-posts-card-wrap">
                                    <div class="news-posts-card-content">
                                        <div class="news-posts-card-summary"><?php the_excerpt(); ?> </div>
                                        <p class="news-posts-card-time">
                                            <span>
                                            <?php echo get_post_time('d M Y'); ?>
                                            </span>
                                        </p>
                                        <?php $post_categories = wp_get_post_categories( $single_post_id, array( 'fields' => 'names' ) ); ?>
                                        <?php if( $post_categories ): // Always Check before loop! ?>
                                            <div class="news-posts-categories-wrapper">
                                                <?php
                                                foreach($post_categories as $name) : ?>
                                                    <span class="news-posts-card-category"><?php echo $name?></span>
                                                <?php endforeach; ?>
                                            </div>
                                        <?php endif; ?>

                                    </div>
                                    <div  class="news-posts-card-content-cta">
                                        <a class="btn btn-quarternary" href="<?php the_permalink(); ?>">
                                            <span>Read more</span>
                                        </a>
                                    </div>
                                </div>

                            </li>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </ul>
                <?php printf(
                    '<div class="load-more-wrap mt-lg mb-lg" data-total-pages="%s"><button class="btn btn-tertiary load-more-posts" id="load_more_posts"><span class="load-more-btn-content">Load More Articles</span>
                        </button></div>',
                    esc_attr( $wp_query->max_num_pages )
                ); ?>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
