//Importamos paquetes.
import axios from "axios";
//Llamamos al archivo ".env" para que nos muestre la variable de entorno
const apiUrl = process.env.REACT_APP_API_URL;

//Componente que se conecta mediante axios a la base de datos y crea una reserva automáica
// TODO:https://naturxtreme.herokuapp.com/api/reserve/create
export const createReserve = async (type, user) => await axios.post(`${apiUrl}/reserve/create`, {type, user});

//Componente que se conecta mediante axios a la base de datos y trae a todas las reservas
// TODO:https://naturxtreme.herokuapp.com/api/reserve
export const getReserves = async () => await axios.get(`${apiUrl}/reserve`);

export const deleteReserve = async (id) => await axios.delete(`${apiUrl}/reserve/delete/${id}`);

export const updateReserve = async (reserve, id) => await axios.put(`${apiUrl}/reserve/update`, {reserve, id});