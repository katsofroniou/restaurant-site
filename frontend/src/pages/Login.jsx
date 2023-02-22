import react from "react";
import React,{useState} from "react";
import loginStyle from "../styling/Login.module.css";

function Login(){
    const [show,setShow] = useState();
    var hidden = show ? "form form-hidden" : "form";
    var hidden2 = show ? "form": "form form-hidden";
    function toggleShow(){
        setShow(!show);
    }
        
    return (
    <>
    <div class={loginStyle.torso}>
        <div class={loginStyle.form_container}>
            <form class = {loginStyle.form} id="login">
                <h2 class={loginStyle.form_title}>Login</h2>

                <div class={'${loginStyle.form_message} ${loginStyle.form_message-error}'}></div>
                <div class={loginStyle["form_input-group"]}>
                    <input type="text" class={loginStyle.form_input} autofocus placeholder="Username or Email"/>
                    <div class={loginStyle["form_input-error-message"]}></div>
                </div>
                <div class={loginStyle["form_input-group"]}>
                    <input type="password" class={loginStyle.form_input} autofocus placeholder="Password"/>
                    <div class={loginStyle["form_input-error-message"]}></div>
                </div>
                <button class={loginStyle.form_button} type="submit">Submit</button>
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