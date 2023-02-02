import react from "react";
import "../styling/Login.css";


function Login(){
    return (
    <>
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
                <a href="/" class="form_link">Forgot Password?</a>
            </p>
            <p class="form_text">
                <a href="/" id="linkCreateAccount" class="form_link">Sign Up?</a>
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
            <a href="/" id="linkLogin" class="form_link">Already have an account? Sign in</a>
        </p>
    </form>
</div>
    </>

    );
}

export default Login;