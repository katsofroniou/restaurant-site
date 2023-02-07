import react from "react";
import "../styling/Login.css";


function Login(){

    const toggleHidden = (e) =>{
        e.preventDefault()
        e.classList.remove("form-hidden")
        //e.classList.add("form-hidden")

    }
    return (
    <>
    <div class="torso">
        <div class="form_container">
            <form class = "form" id="login">
                <h2 class="form_title">Login</h2>

                <div class="form_message form_message-error"></div>
                <div class="form_input-group">
                    <input type="text" class="form_input" autofocus placeholder="Username or Email"/>
                    <div class="form_input-error-message"></div>
                </div>
                <div class="form_input-group">
                    <input type="password" class="form_input" autofocus placeholder="Password"/>
                    <div class="form_input-error-message"></div>
                </div>
                <button class="form_button" type="submit">Submit</button>
                <p class="form_text">
                    <a href="" class="form_link">Forgot Password?</a>
                </p>
                <p class="form_text">
                    <button onClick={toggleHidden} class = "form_link" id="linkCreateAccount">Sign Up?</button>
                </p>
            </form>

            <form class = "form form-hidden" id="createAccount">
                <h2 class="form_title">Create Account</h2>

                <div class="form_message-error"></div>
                <div class="form_input-group">
                    <input type="text" class="form_input" autofocus placeholder="Username"/>
                    <div class="form_input-error-message"></div>
                </div>
                <div class="form_input-group">
                    <input type="text" class="form_input" autofocus placeholder="Email"/>
                    <div class="form_input-error-message"></div>
                </div>
                <div class="form_input-group">
                    <input type="password" class="form_input" autofocus placeholder="Password"/>
                    <div class="form_input-error-message"></div>
                </div>
                <div class="form_input-group">
                    <input type="text" class="form_input" autofocus placeholder="Confirm password"/>
                    <div class="form_input-error-message"></div>
                </div>
                <button class="form_button" type="submit">Login</button>
                <p class="form_text">
                    <button  onClick={toggleHidden}  class = "form_link" id="linkLogin">Already have an account? Sign in</button>
                </p>
            </form>
        </div>
    </div>
    </>

    );
}

/*
function setErrorMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form_message");
    messageElement.textContent=message;
    messageElement.classList.remove("form_message-error");
    messageElement.classList.add('form_message-$(type)');
}
function setInputError(inputElement, message){
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = message;
}

function clearInputError(inputElement){
    inputElement.classList.remove("form_input-error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = "";
}

*/

/*document.addEventListener("DOMContentLoaded",() =>{
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click",e =>{
        e.stopPropagation();
        createAccountForm.classList.remove("form-hidden");
        loginForm.classList.add("form-hidden");
    });
    document.querySelector("#linkLogin").addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });

    loginForm.addEventListener("submit", e =>{
        e.preventDefault();

        //login code
        setErrorMessage(loginForm,"error","Invalid username or password");
    });
    /*document.querySelectorAll(".form_input").forEach(inputElement =>{
        inputElement.addEventListener("blur", e =>{
            // can put in conditions to be met when creating an account
        });
    })

    inputElement.addEventListener("input", e => {
        clearInputError(inputElement);
    })*/



export default Login;