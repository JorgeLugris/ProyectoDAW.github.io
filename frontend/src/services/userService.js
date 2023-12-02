//Importamos paquetes.
import axios from "axios";

//Variable de entorno sacada en ".env"
const apiUrl = process.env.REACT_APP_API_URL;

//Componente que se conecta mediante axios a la base de datos y muestra todos los usuarios
export const getUsers = async () => await axios.get(`${apiUrl}/user`);

//Componente que se conecta mediante axios a la base de datos y muestra un solo usuario
export const getUser = async (id) => await axios.get(`${apiUrl}/user/${id}`);

//Componente que se conecta mediante axios a la base de datos y elimina un usuario
export const deleteUser = async (id) => await axios.delete(`${apiUrl}/user/delete/${id}`, id);

//Componente que se conecta mediante axios a la base de datos y actualiza un usuario
export const updateUser = async (user) => await axios.put(`${apiUrl}/user/update/${user._id}`, user);