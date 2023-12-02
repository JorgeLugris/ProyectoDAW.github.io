//Importamos paquetes.
import axios from "axios";

//Variable de entorno sacada en ".env"
const apiUrl = process.env.REACT_APP_API_URL;

//Componente que se conecta mediante axios a la base de datos y muestra todos los monitores
export const sendNewsletter = async (email) => await axios.post(`${apiUrl}/newsletter`, email);
