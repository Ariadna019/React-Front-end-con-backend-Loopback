// src/UsuarioCRUD.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Asegúrate de importar Bootstrap Icons
import './UsuarioCRUD.css'; // Importa tu archivo CSS
import '@fortawesome/fontawesome-free/css/all.css'; // Importa Font Awesome


const MySwal = withReactContent(Swal);

const UsuarioCRUD = () => {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        const response = await axios.get('http://localhost:3000/usuario');
        setUsuarios(response.data);
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const showAddUserPopup = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Agregar Usuario',
            html: `
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input id="nombre" class="swal2-input" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <label for="edad">Edad</label>
                    <input id="edad" class="swal2-input" type="number" placeholder="Edad">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" class="swal2-input" placeholder="Email">
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const edad = parseInt(document.getElementById('edad').value);
                const email = document.getElementById('email').value;

                if (!nombre || !edad || !email) {
                    Swal.showValidationMessage('Por favor, completa todos los campos');
                }
                return { nombre, edad, email };
            }
        });

        if (formValues) {
            handleAddUser(formValues);
        }
    };

    const handleAddUser = async ({ nombre, edad, email }) => {
        try { //SE USA EL API REST DE LOOPBACK 
            await axios.post('http://localhost:3000/usuario', { nombre, edad, email });
            MySwal.fire({
                icon: 'success',
                title: 'Usuario creado',
                text: 'El usuario ha sido creado exitosamente.',
            });
            fetchUsuarios();
        } catch (error) {
            console.error("Error al enviar los datos:", error.response.data);
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message || 'Hubo un problema al guardar el usuario.',
            });
        }
    };

    const handleEdit = async (usuario) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Editar Usuario',
            html: `
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input id="nombre" class="swal2-input" value="${usuario.nombre}" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <label for="edad">Edad</label>
                    <input id="edad" class="swal2-input" type="number" value="${usuario.edad}" placeholder="Edad">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" class="swal2-input" value="${usuario.email}" placeholder="Email">
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const edad = parseInt(document.getElementById('edad').value);
                const email = document.getElementById('email').value;

                if (!nombre || !edad || !email) {
                    Swal.showValidationMessage('Por favor, completa todos los campos');
                }
                return { nombre, edad, email };
            }
        });

        if (formValues) {
            await handleUpdateUser(usuario.id, formValues);
        }
    };

    const handleUpdateUser = async (id, { nombre, edad, email }) => {
        try {
            await axios.put(`http://localhost:3000/usuario/${id}`, { nombre, edad, email });
            MySwal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                text: 'El usuario ha sido actualizado exitosamente.',
            });
            fetchUsuarios();
        } catch (error) {
            console.error("Error al actualizar los datos:", error.response.data);
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message || 'Hubo un problema al actualizar el usuario.',
            });
        }
    };

    const handleDelete = async (id) => {
        const result = await MySwal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás recuperar este usuario después de eliminarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'SI, eliminarlo!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await axios.delete(`http://localhost:3000/usuario/${id}`);
            MySwal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
            fetchUsuarios();
        }
    };

    return (
        <div className="container mt-5">
            <br></br>
          <center><button className="btn btn-primary mb-4"  onClick={showAddUserPopup} style={{ fontSize: '25px' }} >
                <i className="fas fa-plus-circle"></i> Agregar Usuario
            </button></center> 
            <br></br>
            <br></br>
          
            <table className="table table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.edad}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(usuario)} style={{ fontSize: '20px' }}>
                                    <i className="fas fa-edit"></i> Editar
                                </button> &nbsp;  &nbsp; 
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(usuario.id)}  style={{ fontSize: '20px' }}>
                                    <i className="fas fa-trash-alt"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuarioCRUD;
