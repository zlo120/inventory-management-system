import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const checkUserGroup = (requiredUserGroup) => {
    const token = Cookies.get("bearer");
    const decodedToken = jwtDecode(token);

    const currentUsersGroup = parseInt(decodedToken.group_id, 10);

    if (currentUsersGroup >= requiredUserGroup) return true;
    return false;
}

export default checkUserGroup;