import {validateForm, processForm} from "@js/ui-scripts/formProcessing";
import runAos from "@js/ui-scripts/runAos.js";
import loadMorePosts from "@js/ui-scripts/loadMorePosts.js";

function executeUiScripts () {
    //validateForm();
    //processForm();

    runAos();
}

function deferredUiScripts () {

  loadMorePosts();

}

export {executeUiScripts, deferredUiScripts};
