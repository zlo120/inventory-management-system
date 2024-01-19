import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Input, FormFeedback, Button, Alert } from 'reactstrap'
import { ApiLogIn } from "../../../services/api";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isInvalid, setIsInvalid] = useState(false);
    const [emailField, setEmailField] = useState(null);
    const [passwordField, setPasswordField] = useState(null);

    // Alerts
    const [errorAlertVisible, setErrorAlertVisible] = useState(true);  
    const onErrorDismiss = () => setErrorAlertVisible(false);
    const [signedOutAlertVisible, setsignedOutAlertVisible] = useState(true);  
    const onSignedOutAlertDismiss = () => setsignedOutAlertVisible(false);
    const [registeredAlertVisisble, setRegisteredAlertVisisble] = useState(true);  
    const onRegisteredAlertDismiss = () => setRegisteredAlertVisisble(false);
    
    const handleEmailChange = event => {
        const input = event.target.value;
        setEmailField(input);
        setIsInvalid(false)
    }
    const handlePasswordChange = event => {
        const input = event.target.value;
        setPasswordField(input);
        setIsInvalid(false)
    }
    const handleSubmit = e => {
        e.preventDefault();
        
        if (emailField === null || passwordField === null) return;
        ApiLogIn(emailField, passwordField)
            .then(res => res.json())
            .then(res => {
                if (res.message === "Invalid credentials") {
                    setIsInvalid(true);
                    return;
                }
                console.log(res)
                if (res.token !== undefined || res.token !== null) {
                    Cookies.set('token', res.token);
                    navigate('/');
                }
            })
            .catch(err=> {
                console.log(`ERROR: ${err}`)
            })
    }

    return (
        <div className="authentication-bg">
            {
                searchParams.get('error') === "true" ? 
                <div className="my-alert">
                    <Alert isOpen={errorAlertVisible} toggle={onErrorDismiss} color="danger">An error has occured, either your token has expired or the connection to the server has been lost. Please try log in again.</Alert>
                </div> 
                : searchParams.get('signedout') === "true" ?
                <div className="my-alert">
                    <Alert isOpen={signedOutAlertVisible} toggle={onSignedOutAlertDismiss} color="success">You have been successfully signed out.</Alert>
                </div>
                : searchParams.get('registered') === "true" ?
                <div className="my-alert">
                    <Alert isOpen={registeredAlertVisisble} toggle={onRegisteredAlertDismiss} color="success">Your account has been successfully registered!</Alert>
                </div> 
                :
                null
            }
            <div className="authentication-form-container">
                <div className="authentication-form">
                    <h2>Please Sign In</h2>                    
                    <form onSubmit={handleSubmit}>
                        <Input invalid={isInvalid} onChange={handleEmailChange} placeholder="Email"/>                 
                        <Input type="password" invalid={isInvalid} onChange={handlePasswordChange} placeholder="Password"/>                    
                        <FormFeedback>
                            Your email or password was incorrect
                        </FormFeedback>   

                        <Button style={{width:"100%"}} color="primary" type="submit">Submit</Button>

                        <p>Don't have an account yet?<br /><Link to="/register">Register here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;