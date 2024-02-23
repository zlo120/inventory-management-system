import Cookies from "js-cookie";

const checkValidation = (navigate) => {
    if (Cookies.get("bearer") === undefined) {
        navigate("/login?error=true");
        return false;
    } else {
        return true;
    }
}

export default checkValidation;