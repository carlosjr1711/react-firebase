import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

class App extends React.Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form: {
      Id: '',
      Nombre: '',
      Apellido: '',
      Edad: ''
    },
    n: 0,
  };

  peticionGet = () => {
    firebase.child('usuarios').on('value', usuario => {
      if (usuario.val() !== null) {
        this.setState({ ...this.state.data, data: usuario.val() });
      } else {
        this.setState({ data: [] });
      }
    }
    );
  };

  peticionPost = () => {
    firebase.child('usuarios').push(this.state.form,
      error => {
        if (error) console.log(error)
      }
    );
    this.setState({ modalInsertar: false });
  };

  peticionPut = () => {
    firebase.child(`usuarios/${this.state.n}`).set(
      this.state.form,
      error => {
        if (error) console.log(error)
      });
    this.setState({ modalEditar: false });
  }

  peticionDelete = () => {
    if (window.confirm(`Estás seguro que deseas eliminar el usuario identificado con el Id: ${this.state.form && this.state.form.Id}?`)) {
      firebase.child(`usuarios/${this.state.n}`).remove(
        error => {
          if (error) console.log(error)
        });
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state.form);
  }

  seleccionarUsuario = async (usuario, n, caso) => {

    await this.setState({ form: usuario, n: n });

    (caso === "Editar") ? this.setState({ modalEditar: true }) :
    this.peticionDelete()
  }

  componentDidMount() {
    this.peticionGet();
  }
  render() {
    return (
      <div className='App'>
        <br />
        <button className='btn btn-success' onClick={() => this.setState({ modalInsertar: true })}>Agregar</button>
        <br /><br />

        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i => {
              return <tr key={i}>
                <td>{this.state.data[i].Id}</td>
                <td>{this.state.data[i].Nombre}</td>
                <td>{this.state.data[i].Apellido}</td>
                <td>{this.state.data[i].Edad}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => this.seleccionarUsuario(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                  <button className='btn btn-danger' onClick={() => this.seleccionarUsuario(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>Agregar Registro</ModalHeader>
          <ModalBody>
            <div className='form-gruoup'>
              <label>Id: </label>
              <br />
              <input type='number' className='form-control' name="Id" onChange={this.handleChange} />
              <label>Nombre: </label>
              <br />
              <input type='text' className='form-control' name="Nombre" onChange={this.handleChange} />
              <label>Apellido: </label>
              <br />
              <input type='text' className='form-control' name="Apellido" onChange={this.handleChange} />
              <label>Edad: </label>
              <br />
              <input type='number' className='form-control' name="Edad" onChange={this.handleChange} />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={() => this.peticionPost()}>Agregar</button> {"   "}
            <button className='btn btn-danger' onClick={() => this.setState({ modalInsertar: false })}>Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>Editar Registro</ModalHeader>
          <ModalBody>
            <div className='form-gruoup'>
              <label>Id: </label>
              <br />
              <input type='number' className='form-control' name="Id" onChange={this.handleChange} value={this.state.form && this.state.form.Id} />
              <label>Nombre: </label>
              <br />
              <input type='text' className='form-control' name="Nombre" onChange={this.handleChange} value={this.state.form && this.state.form.Nombre} />
              <label>Apellido: </label>
              <br />
              <input type='text' className='form-control' name="Apellido" onChange={this.handleChange} value={this.state.form && this.state.form.Apellido} />
              <label>Edad: </label>
              <br />
              <input type='number' className='form-control' name="Edad" onChange={this.handleChange} value={this.state.form && this.state.form.Edad} />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={() => this.peticionPut()}>Editar</button> {"   "}
            <button className='btn btn-danger' onClick={() => this.setState({ modalEditar: false })}>Cancelar</button>
          </ModalFooter>
        </Modal>
      </div>)

  }

}

export default App;
