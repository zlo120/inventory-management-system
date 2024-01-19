import { Link, useNavigate } from "react-router-dom";
import { ApiLogIn, ApiRegister } from "../../../services/api";import { useEffect, useState } from "react";
import { Input, FormFeedback, Button, Alert } from 'reactstrap'

const Register = () => {    
    const navigate = useNavigate();

    const [isInvalid, setIsInvalid] = useState(false);    
    const [emailField, setEmailField] = useState(null);
    const [passwordField, setPasswordField] = useState(null);
    const [confirmPasswordField, setConfirmPasswordField] = useState(null);
    const [errorType, setErrorType] = useState(null);

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
        
        if (emailField === null || passwordField === null || confirmPasswordField === null) return;   
        
        if (passwordField !== confirmPasswordField) {
            setIsInvalid(true);
            setErrorType("password");
            return;
        }

        ApiRegister(emailField, passwordField)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.message === "A user with that email already exists") {                    
                    setIsInvalid(true);
                    setErrorType("email");
                    return;
                }

                if (res.message === "Something went wrong creating your account") {
                    setIsInvalid(true);
                    setErrorType("unexpected");
                    return;
                }

                if (res.message === "User has been created!") {
                    navigate('/login?registered=true');
                }
            })
    }
    
    return (        
        <div className="authentication-bg">
            <div className="authentication-form-container">
                <div className="authentication-form">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <Input invalid={isInvalid} onChange={handleEmailChange} placeholder="Email"/>                 
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

                        <Button style={{width:"100%"}} color="primary" type="submit">Submit</Button>
                        <p>Already have an account?<br /><Link to="/login">Log in here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;