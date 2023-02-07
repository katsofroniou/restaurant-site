import react from "react";
import React,{useState} from "react";
import "../styling/Login.css";


function Login(){

    const [show,setShow] = useState();
    var hidden = show ? "form form-hidden" : "form";
    var hidden2 = show ? "form": "form form-hidden";
    function toggleShow(){
        setShow(!show);
    }
        
    return (
    <>
    <div class="torso">
        <div class="form_container">
            <form class = {hidden} id="login">
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
                    <a onClick={toggleShow} class = "form_link" id="linkCreateAccount">Sign Up?</a>
                </p>
            </form>

             <form class = {hidden2} id="createAccount">
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
                <button class="form_button" type="submit">Create Account</button>
                <p class="form_text">
                    <a onClick={toggleShow}  class = "form_link" id="linkLogin">Already have an account? Sign in</a>
                </p>
            </form>
        </div>
    </div>
    </>

    );
}


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



export default Login;