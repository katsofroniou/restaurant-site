import React from "react";
import { useState } from "react";
import axios from "axios";
import "../styling/AddUser.css";
/**
 * @author Natalia Widmann
 * @author Katerina Sofroniou
 * @file AddUser.jsx contains the frontend page used to create new users.
 */

/**
 * @function AddUser
 * @returns {JSX.Element}
 */
function AddUser() {
    /**
     * An array containing the valid user groups.
     * @type {string[]}
     */
    const validGroups = ["Kitchen Staff", "Waiter", "Customer"]

    /**
     * An object representing the user registration form data.
     * @typedef {Object} FormData
     * @property {string} username - The user's username.
     * @property {string} email - The user's email.
     * @property {string} group - The user's group. Must be one of the validGroups.
     * @property {string} password - The user's password.
     */

    /**
     * The stateful object that stores the form data.
     * @type {[FormData, function]}
     */
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        group: '',
        password: ''
    });

    /**
     * Handles changes to the form data state.
     * @param {object} event - The event object.
     */
    const handleChange = event => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    /**
     * Handles the form submission to create a new user
     * @param {Event} event - The event object for the form submission
     * @returns {void}
     */
    const handleSubmit = async event => {
        event.preventDefault();

        // Ensure the password and confirm password fields match
        if (formData.password !== confirmPassword) {
            alert("Passwords do not match");
            setInputError(event.target, "Passwords do not match");
            return;
        }

        // Validate the email field format
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(formData.email)) {
            console.log('email');
            setInputError(event.target, "Invalid email");
            return;
        }

        // Validate the group entered
        if (!validGroups.includes(formData.group)) {
            console.log('group');
            setInputError(event.target, "Not a valid group");
            return;
        }

        console.log(formData)

        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) {
                console.log('User not authenticated');
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${access_token}` },
                method: 'POST',
                url: 'http://127.0.0.1:8000/users/api',
                data: formData
            };

            const response = await axios(config);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const [show, setShow] = useState();
    var hidden = show ? "form form-hidden" : "form";
    var hidden2 = show ? "form" : "form form-hidden";
    /**
     * Toggles the visibility of the form.
     * @function
     * @name toggleShow
     * @returns {void}
     */
    function toggleShow() {
        setShow(!show);
    }

    /**
     * Handles changes to the confirm password field.
     * @function
     * @name handleConfirmPasswordChange
     * @param {object} event - The change event object.
     * @returns {void}
     */
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <>
            <div class="torso">
                <div class="form_container">
                    <form id="createAccount">
                        <h2 class="form_title">Create Account</h2>

                        <div class="form_message-error"></div>
                        <div class="form_input-group">
                            <input
                                type="text"
                                class="form_input"
                                autofocus
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <div class="form_input-error-message"></div>
                        </div>
                        <div class="form_input-group">
                            <input
                                type="text"
                                class="form_input"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <div class="form_input-error-message"></div>
                        </div>
                        <div class="form_input-group">
                            <input
                                type="password"
                                class="form_input"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <div class="form_input-error-message"></div>
                        </div>
                        <div class="form_input-group">
                            <input
                                type="password"
                                class="form_input"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <div class="form_input-error-message"></div>
                        </div>
                        <div class="form_input-group">
                            <input
                                type="text"
                                class="form_input"
                                placeholder="Job Title/Customer"
                                value={formData.group}
                                name = "group"
                                onChange={handleChange}
                            />
                        </div>
                        <button class="form_button" type="submit" onClick={handleSubmit}>
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}


function setErrorMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form_message");
    messageElement.textContent = message;
    messageElement.classList.remove("form_message-error");
    messageElement.classList.add('form_message-$(type)');
}
function setInputError(inputElement, message) {
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form_input-error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = "";
}

export default AddUser;