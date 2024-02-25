import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ApiCreateUserPassword } from "../../../services/api";
import { Input, FormFeedback, Button, Alert } from 'reactstrap';
import Cookies from "js-cookie";

const Register = () => {    
    // hooks
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // form fields' states 
    const [isInvalid, setIsInvalid] = useState(false);    
    const [email, setEmail] = useState(searchParams.get("user"));
    const [passwordField, setPasswordField] = useState(null);
    const [confirmPasswordField, setConfirmPasswordField] = useState(null);
    const [errorType, setErrorType] = useState(null);

    // validation state
    const [isValidating, setIsValidating] = useState(false);

    // alerts    
    const [errorConnectingAlert, setErrorConnectingAlert] = useState(false);  
    const onErrorConnectingAlertDismiss = () => setErrorConnectingAlert(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState("");
    const createAlert = (text) => {
        setAlertText(text);
        setAlertVisible(true);
    }
    const onAlertDismiss = () => setAlertVisible(false);

    // handle input changes
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
        
        if (passwordField === null || confirmPasswordField === null) return;   
        
        if (passwordField !== confirmPasswordField) {
            setIsInvalid(true);
            setErrorType("password");
            return;
        }

        ApiCreateUserPassword(email, passwordField)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (String(res) === "No account exists with that email") {
                    setIsInvalid(true);
                    setErrorType("No email");
                    setIsValidating(false);
                    return;
                }

                if (String(res) === "Your password is now created!") {
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
        createAlert("You must now create your own password to finish setting up your account");
        if (Cookies.get('bearer') !== undefined) {
            navigate('/inventory');
        }

        if (searchParams.get("user") === null) {
            navigate("/login");
        }
    }, [])
    
    return (        
        <div className="authentication-bg">
            <div className="my-alert">
                <Alert isOpen={errorConnectingAlert} toggle={onErrorConnectingAlertDismiss} color="danger">There was an error when trying to connect to the server. Please try again later.</Alert>
                <Alert isOpen={alertVisible} toggle={onAlertDismiss} color="success">{alertText}</Alert>
            </div>
            <div className="authentication-form-container">
                <div className="authentication-form">
                    <h2>Create your own password</h2>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" placeholder="Email" value={email} disabled/>
                        <Input type="password" invalid={isInvalid} onChange={handlePasswordChange} placeholder="Password"/>
                        <Input type="password" invalid={isInvalid} onChange={handleConfirmPasswordChange} placeholder="Confirm Password"/>                   
                        {
                            errorType === "No email" ? 
                            <FormFeedback>
                                No account exists with that email. Please contact a systems administrator
                            </FormFeedback>
                            : errorType === "unexpected" ? 
                            <FormFeedback>
                                An unexpected error has occured
                            </FormFeedback>
                            : null
                        }

                        <Button style={{width:"100%"}} color="primary" type="submit" disabled={isValidating}>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;