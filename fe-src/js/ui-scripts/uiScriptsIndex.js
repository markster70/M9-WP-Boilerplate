import runAos from "@js/ui-scripts/runAos.js";
import loadMorePosts from "@js/ui-scripts/loadMorePosts.js";

function executeUiScripts () {

    runAos();
}

function deferredUiScripts () {

  loadMorePosts();

}

export {executeUiScripts, deferredUiScripts};
