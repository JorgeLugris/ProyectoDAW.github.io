//Importamos paquetes.
import axios from "axios";

//Llamamos al archivo ".env" para que nos muestre la variable de entorno
const apiUrl = process.env.REACT_APP_API_URL;

//Componente que se conecta mediante axios a la base de datos y crea un paquete
export const createPackage = async (item) => await axios.post(`${apiUrl}/package/create`, item);

//Componente que se conecta mediante axios a la base de datos y muestra todos los paquetes
export const getPackages = async () => await axios.get(`${apiUrl}/package`);

//Componente que se conecta mediante axios a la base de datos y muestra un paquete
export const getPackage = async (id) => await axios.get(`${apiUrl}/package/${id}`);

//Componente que se conecta mediante axios a la base de datos y borra un paquete
export const deletePackage = async (id) => await axios.delete(`${apiUrl}/package/delete/${id}`);

//Componente que se conecta mediante axios a la base de datos y actualiza un paquete
export const updatePackage = async (format) => await axios.put(`${apiUrl}/package/update`, format);
