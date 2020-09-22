/** @jsx jsx */
import Layout from '../components/layouts/Layout'
import React, {useState} from 'react'
import firebase from '../firebase'

import {Formulario, Campo, Inputsubmit, Error} from '../components/ui/Formulario'
import {css, jsx} from '@emotion/core'
import Router from 'next/router'

import useValidacion from '../hooks/useValidacion'
import validarIniciarSesion from '../validacion/validarIniciarSesion'

const Login = ()=> {
  
  const [stateInicial, setStateInicial] = useState({
    email:'',
    password:''
  })

  const [error, setError] = useState(false)
  
  const iniciarSesionFunc = async () => {
    try {
      await firebase.login(email, password)
      Router.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
  } = useValidacion(stateInicial, validarIniciarSesion, iniciarSesionFunc)

  const {email, password} = valores

  return (
    <div>
      <Layout>
        <>
          <h2
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Inicio de sesion</h2>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
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
              value="iniciar sesión"
            />
            {error && <Error>{error}</Error> }
          </Formulario>
        </>

      </Layout>
    </div>
  )
}

export default Login