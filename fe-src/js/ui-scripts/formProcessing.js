/* ----------------------------------- */
// FORM VALIDATION
/* ----------------------------------- */
function validateForm(e) {

    //get status box
    const statusMsg = document.getElementById('status');
    //get the parent form
    const theForm = document.getElementById(e.target.closest('form').id);


    //prevent default behaviour
    e.preventDefault();

    //get form values
    var firstname = theForm["firstname"].value;
    var lastname = theForm["lastname"].value;
    var email = theForm["email"].value;
    var contact = theForm["contact"].value;
    var message = theForm["message"].value;
    //reset status
    statusMsg.innerHTML = '';
    //if any fields are left empty
    if (firstname.trim() == "" || lastname.trim() == "" || email.trim() == "" || contact.trim() == "" || message.trim() == "") {
        //define default error message is any fields are empty
        var errorMessage = '<div class="form__error"><p>All fields are required...</p></div>';
        statusMsg.innerHTML = errorMessage;
        return false;
    }
    //define email regex pattern
    var regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //check valid email
    if (!regEx.test(email)) {
        var errorMessage = '<div class="form__error"><p>Invalid email...</p></div>';
        statusMsg.innerHTML = errorMessage;
        return false;
    }
    //process the form
    processForm(theForm);
    return true;
}

/* ----------------------------------- */
// FORM PROCESSING
/* ----------------------------------- */
function processForm(f) {
    //send new http request and wait for change
    var request = new XMLHttpRequest();
    request.open("POST", "/wp-admin/admin-ajax.php?action=process_contact_form");
    request.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            document.getElementById("status").innerHTML = this.responseText;
            f.reset();
        }
    };
    //get form data and send it
    var formData = new FormData(f);
    request.send(formData);
}

export {validateForm, processForm};