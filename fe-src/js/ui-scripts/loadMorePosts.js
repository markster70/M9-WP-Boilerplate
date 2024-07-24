import { $qall, $q1,addClassN, removeClassN} from '@js/utility-scripts/domHelpers';

function loadMorePosts () {

  const loadMoreBtn = $q1('.load-more-posts');

  if(!loadMoreBtn) {
    return;
  }

  const loadMoreContent = $q1('.load-more-btn-content');

  let currentPage = 1;
  let loadMoreWrap = $q1('.load-more-wrap');
  let totalPages =  loadMoreWrap.dataset.totalPages;

  const postsContainer = $q1('.news-posts-items');
  let url = document.location.href;
  let fetchUrl = url.match(/[?]/) ? url + '&paged=' : url + '?paged=';
  let parser = new DOMParser();

  const postSelector = 'li.news-posts-card';

  if( currentPage == totalPages ) {

    //run if there is only 1 page
    addClassN(loadMoreBtn, 'all-posts-loaded');
    loadMoreBtn.disabled = true
    loadMoreContent.innerHTML = 'All posts loaded';

  } else if( currentPage < totalPages ){

    //run if there is more than 1 page
    loadMoreBtn.disabled = false;

    loadMoreBtn.addEventListener( 'click',  retrievePosts );


  }

  async function retrievePosts (e) {

    e.preventDefault();

    currentPage ++;

    let data = await ( await fetch( fetchUrl + currentPage ).catch(  ) ).text(),

      //use DOMParser to convert text string to HTML nodes
      htmlData = parser.parseFromString( data, 'text/html' ),

      //select posts that will be appended
      posts = htmlData.querySelectorAll(postSelector);

    for( let i = 0; i<posts.length; i++ ){

      //initially add 'hide' class to the posts for fadein effect
      //posts[i].classList.add('hide')

      //then append it to the container
      postsContainer.append( posts[i] )
    }

    if( currentPage == totalPages ){

      //if there is no more page,
      //disable the button
      //run if there is only 1 page
      addClassN(this, 'all-posts-loaded');
      addClassN(this, 'disabled');
      this.disabled = true
      loadMoreContent.innerHTML = 'All posts loaded';

    }else{

      //if there is more pages,
      //change the button text
      this.innerHTML = 'Load More'
    }

  }



}

 export default loadMorePosts;
