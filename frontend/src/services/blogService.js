//Importamos paquetes.
import axios from "axios";
//Variable de entorno sacada en ".env"
const apiUrl = process.env.REACT_APP_API_URL;

//Componente que se conecta mediante axios a la base de datos y muestra un solo blog
export const getBlog = async (id) => await axios.get(`${apiUrl}/blog/id/${id}`);

//Componente que se conecta mediante axios a la base de datos y muestra todos los blogs
export const getBlogs = async (username) => await axios.get(`${apiUrl}/blog/${username}`, );

//Componente que se conecta mediante axios a la base de datos y muestra todos los blogs
export const getAllBlogs = async () => await axios.get(`${apiUrl}/blog/`);

//Componente que se conecta mediante axios a la base de datos y permite actualizar un blog
export const createBlog = async (blog) => await axios.post(`${apiUrl}/blog/create`, blog);

//Componente que se conecta mediante axios a la base de datos y permite actualizar un blog
export const updateBlog = async (format) => await axios.put(`${apiUrl}/blog/update`, format);


//Componente que se conecta mediante axios a la base de datos y permite borrar un blog
export const deleteBlog = async (id) => await axios.delete(`${apiUrl}/blog/delete/${id}`);