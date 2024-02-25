import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiRegister } from "../../../services/api";
import { Input, FormFeedback, Button, Alert } from 'reactstrap';
import Cookies from "js-cookie";

const Register = () => {    
    // hooks
    const navigate = useNavigate();

    // form fields' states 
    const [isInvalid, setIsInvalid] = useState(false);    
    const [emailField, setEmailField] = useState(null);
    const [passwordField, setPasswordField] = useState(null);
    const [confirmPasswordField, setConfirmPasswordField] = useState(null);
    const [errorType, setErrorType] = useState(null);

    // validation state
    const [isValidating, setIsValidating] = useState(false);

    // alerts    
    const [errorConnectingAlert, setErrorConnectingAlert] = useState(false);  
    const onErrorConnectingAlertDismiss = () => setErrorConnectingAlert(false);

    // handle input changes
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
    const handleConfirmPasswordChange = event => {
        const input = event.target.value;
        setConfirmPasswordField(input);
        setIsInvalid(false)
    }
    const handleSubmit = e => {
        e.preventDefault();

        setIsValidating(true);
        
        if (emailField === null || passwordField === null || confirmPasswordField === null) return;   
        
        if (passwordField !== confirmPasswordField) {
            setIsInvalid(true);
            setErrorType("password");
            return;
        }

        ApiRegister(emailField, passwordField)
            .then(res => res.json())
            .then(res => {
                if (res.message === "A user with that email already exists") {                    
                    setIsInvalid(true);
                    setErrorType("email");
                    setIsValidating(false);
                    return;
                }

                if (res.message === "Something went wrong creating your account") {
                    setIsInvalid(true);
                    setErrorType("unexpected");
                    setIsValidating(false);
                    return;
                }

                if (res.message === "User has been created!") {
                    setIsValidating(false);
                    navigate('/login?registered=true');
                    return;
                }
            }).catch(err=> {
                if (String(err) === "TypeError: Failed to fetch") {
                    setErrorConnectingAlert(true);
                }
                console.log(`${err}`);
                setIsValidating(false);
            })
    }

    useEffect(() => {
        if (Cookies.get('bearer') !== undefined) {
            navigate('/inventory');
        }
    }, [])
    
    return (        
        <div className="authentication-bg">
            <div className="my-alert">
                <Alert isOpen={errorConnectingAlert} toggle={onErrorConnectingAlertDismiss} color="danger">There was an error when trying to connect to the server. Please try again later.</Alert>
            </div>
            <div className="authentication-form-container">
                <div className="authentication-form">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" invalid={isInvalid} onChange={handleEmailChange} placeholder="Email"/>                 
                        <Input type="password" invalid={isInvalid} onChange={handlePasswordChange} placeholder="Password"/>  
                        <Input type="password" invalid={isInvalid} onChange={handleConfirmPasswordChange} placeholder="Confirm Password"/>                   
                        {
                            errorType === "password" ? 
                            <FormFeedback>
                                Your passwords do not a match
                            </FormFeedback>
                            : errorType === "email" ? 
                            <FormFeedback>
                                This email already exists
                            </FormFeedback>
                            : errorType === "unexpected" ? 
                            <FormFeedback>
                                An unexpected error has occured
                            </FormFeedback>
                            : null
                        }

                        <Button style={{width:"100%"}} color="primary" type="submit" disabled={isValidating}>Submit</Button>
                        <p>Already have an account?<br /><Link to="/login">Log in here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;