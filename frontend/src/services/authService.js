//Importamos paquetes.
import axios from "axios";
import Swal from "sweetalert2";


//Variable de entorno sacada en ".env"
const apiUrl = process.env.REACT_APP_API_URL;

// Conexión mediante "Axios" a la api creada anteriormente por Node(login).
export const loginUser = async (user) => {
    const response = await axios.post(`${apiUrl}/auth/login`, user);
    const { user: userData, token } = response.data;
    const { _id, ...userStored } = userData;

    localStorage.setItem("jwtString", JSON.stringify({ user: userStored, token }));

    return response;
};


// Conexión mediante "Axios" a la api creada anteriormente por Node(Register).
export const registerUser = async user => await axios.post(`${apiUrl}/auth/register`, user);


// Conexión mediante "Axios" a la api creada anteriormente por Node(checkAccount).
export const accountAcepted = async params => await axios.get(`${apiUrl}/auth/account/${params}`);


// Conexión mediante "Axios" a la api creada anteriormente por Node(forgotPassword).
export const checkEmail = async email => await axios.post(`${apiUrl}/auth/forgotPassword`, email);


// Conexión mediante "Axios" a la api creada anteriormente por Node(checkPin).
export const checkPin = async pin => await axios.post(`${apiUrl}/auth/checkPin`, pin);


// Conexión mediante "Axios" a la api creada anteriormente por Node(resetPasswordCntrol).
export const newPassword = async password => await axios.post(`${apiUrl}/auth/resetPasswordCtrl`, password);

// Plugin de JQuery que podremos dar un aspecto profesional a los mensajes(Para las informaciones)
export const sweetAlert = (title, text, icon) => {
    return Swal.fire({
        title,
        text,
        icon
    })
}

// Plugin de JQuery que podremos dar un aspecto profesional a los mensajes(Para las confirmaciones)
export const sweetAlertConfirmation = (name) => {
    let confirmation = "";
    return Swal.fire({
        title: `"Eliminación de ${name}"`,
        text: `¿Estas seguro que desea borrar este ${name}?`,
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        denyButtonText: `No borrar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire(`El ${name} ha borrado correctamente!`, '', 'success').then(() => window.location.reload());
            return confirmation = true;
        } else if (result.isDenied) {
            Swal.fire(`No se ha borrado el ${name}`, '', 'info').then(() => window.location.reload());
            return confirmation = false;
        }
    })
}

// Plugin de JQuery que podremos dar un aspecto profesional a los mensajes(Para los mensajes de ayuda de los usuarios)
export const sweetAlertMessage = () => {
    let confirmation = "";
    return Swal.fire({
        title: `Tiene un mensaje`,
        text: `¿Quieres ir a la bandeja de entrada?`,
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            return confirmation = true;
        } else {
            return confirmation = false;
        }

    })
}

//Expresiones Regulares
export const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{3,10}$/, // Letras, números, guion y guion_bajo
    password: /^[a-zA-Z0-9]{5,15}$/, // 5 a 15 dígitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //Deberá introducirse un "@" y al final un dominio.
    telefono: /^\d{9}$/ // 9 números(Teléfonos Españoles).
};
