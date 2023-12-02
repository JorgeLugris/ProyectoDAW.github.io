//Importamos paquetes.
import axios from "axios";

//Variable de entorno sacada en ".env"
const apiUrl = process.env.REACT_APP_API_URL;

//Componente que se conecta mediante axios a la base de datos y muestra todos los monitores
export const getMonitors = async () => await axios.get(`${apiUrl}/monitor`);

//Componente que se conecta mediante axios a la base de datos y muestra un solo monitor
export const getMonitor = async (id) => await axios.get(`${apiUrl}/monitor/${id}`);

//Componente que se conecta mediante axios a la base de datos y crea un monitor
export const createMonitor = async monitor => await axios.post(`${apiUrl}/monitor/upload`, monitor);

//Componente que se conecta mediante axios a la base de datos y actualiza un monitor
export const updateMonitor = async (format) => await axios.put(`${apiUrl}/monitor/update`, format);

//Componente que se conecta mediante axios a la base de datos y borra un monitor
export const deleteMonitor = async (id) => await axios.delete(`${apiUrl}/monitor/delete/${id}`);

