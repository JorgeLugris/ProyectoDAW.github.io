import jwt_decode from "jwt-decode";


export const session = () => {
    let token = localStorage.getItem("authToken");

    let decodedToken = jwt_decode(token);
    let dateNow = new Date();

    return decodedToken.exp < dateNow.getTime() / 1000;

}