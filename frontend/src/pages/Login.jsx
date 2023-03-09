import react from "react";
import React,{useEffect, useState,useRef} from "react";
import loginStyle from "../styling/Login.module.css";
import axios from 'axios'


function Login() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  

  function toggleShow() {
    setShow(!show);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/token/', {
        username: username,
        password: password
      })
      .then(response => {
        localStorage.setItem('access_token', response.data.access);
        
        localStorage.setItem('refresh_token', response.data.refresh);
        {/* 
            const accessToken = localStorage.getItem('access_token')
        */}

        window.location.href = '/';
      })
      
      .catch(error => {
        console.error(error);
        setErrorMessage('Invalid username or password');
      });
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    clearInputError(event.target);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    clearInputError(event.target);
  }

  function setInputError(inputElement, message) {
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = message;
  }

  function clearInputError(inputElement) {
    inputElement.classList.remove("form_input_error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = "";
  }

  return (
    <>
    <div class={loginStyle.torso}>
        <div class={loginStyle.form_container}>
            <form class = {loginStyle.form} id="login" onSubmit={handleFormSubmit}>
                <h2 class={loginStyle.form_title}>Login</h2>

                <div class={'${loginStyle.form_message} ${loginStyle.form_message-error}'}>{errorMessage}</div>
                <div class={loginStyle["form_input-group"]}>
                    <input type="text" class={loginStyle.form_input} autofocus placeholder="Username" value={username} onChange={handleUsernameChange}/>
                    <div class={loginStyle["form_input-error-message"]}></div>
                </div>
                <div class={loginStyle["form_input-group"]}>
                    <input type="password" class={loginStyle.form_input} autofocus placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    <div class={loginStyle["form_input-error-message"]}></div>
                </div>
                <button class={loginStyle.form_button} type="submit">Submit</button>
            </form>
        </div>
    </div>
    </>
)}

export default Login;