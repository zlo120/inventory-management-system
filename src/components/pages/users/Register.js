import { Link } from "react-router-dom";

const Register = () => {
    return (        
        <div className="authentication-bg">
            <div className="authentication-form-container">
                <div className="authentication-form">
                    <h2>Register</h2>
                    <p>Already have an account?<br /><Link to="/login">Log in here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register;