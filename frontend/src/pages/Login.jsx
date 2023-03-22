import react from "react";
import React,{useEffect, useState,useRef} from "react";
import loginStyle from "../styling/Login.module.css";
import axios from 'axios'
/**
 * @author Davit Gevorgyan
 * @author Natalia Widmann
 * @author Katertina Sofroniou
 * @author Jonathan Lloyd
 * @file Login.jsx contains the login page.
 */

/**
 * @function Login
 * @returns {JSX.Element} Returns the constructed Login page.
 */
function Login() {
  /**
   * React component state variables for managing a login form.
   * @typedef {Object} LoginFormState
   * @property {boolean} show - Determines whether to show the login form.
   * @property {string} username - The username entered by the user.
   * @property {string} password - The password entered by the user.
   * @property {string} errorMessage - Error message to display to the user (if any).
   */

  /**
   * React state variables for managing the login form.
   * @type {LoginFormState}
   */
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Toggles the `show` state variable.
   * @function toggleShow
   * @returns {void}
   */
  function toggleShow() {
    setShow(!show);
  }

  /**
   * Handles the form submission by sending a POST request to the server and
   * storing the access and refresh tokens in localStorage.
   * @function handleFormSubmit
   * @param {Event} event - The form submission event.
   * @returns {void}
   */
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

  /**
   * Handles a change to the username input element by updating the state and clearing any input errors.
   * @function handleUsernameChange
   * @param {Event} event - The input change event.
   * @returns {void}
   */
  function handleUsernameChange(event) {
    setUsername(event.target.value);
    clearInputError(event.target);
  }

  /**
   * Handles a change to the password input element by updating the state and clearing any input errors.
   * @function handlePasswordChange
   * @param {Event} event - The input change event.
   * @returns {void}
   */
  function handlePasswordChange(event) {
    setPassword(event.target.value);
    clearInputError(event.target);
  }

  /**
   * Sets an input error message and styles the input element accordingly.
   * @function setInputError
   * @param {HTMLElement} inputElement - The input element to set the error on.
   * @param {string} message - The error message to display.
   * @returns {void}
   */
  function setInputError(inputElement, message) {
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = message;
  }

  /**
   * Clears any input errors and resets the styling on an input element.
   * @function clearInputError
   * @param {HTMLElement} inputElement - The input element to clear the error on.
   * @returns {void}
   */
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