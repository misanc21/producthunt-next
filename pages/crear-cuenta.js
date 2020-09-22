/** @jsx jsx */
import Layout from '../components/layouts/Layout'
import React, {useState} from 'react'
import firebase from '../firebase'

import {Formulario, Campo, Inputsubmit, Error} from '../components/ui/Formulario'
import {css, jsx} from '@emotion/core'
import Router from 'next/router'

import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearcuenta'

const CrearCuenta = ()=> {
  const [stateInicial, setStateInicial] = useState({
    nombre:'',
    email:'',
    password:''
  })

  const [error, setError] = useState(false)
  
  const crearCuentafunc = async () => {
    try {
      await firebase.registrar(nombre, email, password)
      Router.push('/')
    } catch (error) {
      console.error('hubo un error al crear el usuario', error)
      setError(error.message)
    }
  }

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
  } = useValidacion(stateInicial, validarCrearCuenta, crearCuentafunc )

  const {nombre, email, password} = valores

  return (
    <div>
      <Layout>
        <>
          <h2
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Crear cuenta</h2>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
                value={nombre}
                onChange= {handleChange}
              />
            </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}
            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange= {handleChange}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange= {handleChange}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}
            <Inputsubmit
              type="submit"
              value="crear cuenta"
            />
            {error && <Error>{error}</Error> }
          </Formulario>
        </>

      </Layout>
    </div>
  )
}

export default CrearCuenta