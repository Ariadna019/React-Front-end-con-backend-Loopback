import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function UserComponent() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuario');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const createUsuario = async () => {
    try {
      await axios.post('http://localhost:3000/usuario', { nombre, email, edad });
      loadUsuarios();
      setNombre('');
      setEmail('');
      setEdad('');
      MySwal.fire('Usuario Creado', 'El usuario ha sido creado exitosamente.', 'success');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUsuario = async (id) => {
    try {
      await axios.put(`http://localhost:3000/usuario/${id}`, { nombre, email, edad });
      loadUsuarios();
      setNombre('');
      setEmail('');
      setEdad('');
      setEditingUser(null);
      MySwal.fire('Usuario Actualizado', 'El usuario ha sido actualizado exitosamente.', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUsuario = async (id) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/usuario/${id}`);
          loadUsuarios();
          MySwal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    });
  };

  const handleEdit = (usuario) => {
    setEditingUser(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setEdad(usuario.edad);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUsuario(editingUser);
    } else {
      createUsuario();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Usuarios</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="edad">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {editingUser ? 'Actualizar' : 'Crear'}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.edad}</td>
              <td>
                <Button
                  variant="outline-info"
                  onClick={() => handleEdit(usuario)}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteUsuario(usuario.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
