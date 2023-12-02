//Importamos paquetes.
import axios from "axios";

//Variable de entorno sacada en ".env"
const apiUrl = process.env.REACT_APP_API_URL;

//Componente que se conecta mediante axios a la base de datos y muestra todos los monitores
export const getHelps = async () => await axios.get(`${apiUrl}/help`);
export const createHelp = async (message) => await axios.post(`${apiUrl}/help/create`, message);
export const changeHelp = async () => await axios.post(`${apiUrl}/help/change`);
export const messageHelp = async (message, email) => await axios.post(`${apiUrl}/help/message`, {message, email});
export const respuestaHelp = async (id) => await axios.post(`${apiUrl}/help/respuesta`, {id: id});
export const deleteHelp = async (id) => await axios.delete(`${apiUrl}/help/delete/${id}`);

