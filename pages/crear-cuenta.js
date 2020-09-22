/** @jsx jsx */
import Layout from '../components/layouts/Layout'
import React, {useState} from 'react'

import {Formulario, Campo, Inputsubmit} from '../components/ui/Formulario'
import {css, jsx} from '@emotion/core'

import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearcuenta'

const CrearCuenta = ()=> {
  const [stateInicial, setStateInicial] = useState({
    nombre:'',
    email:'',
    password:''
  })
  
  const crearCuentafunc = () => {
    console.log('creando cuenta')
  }

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange
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
            <Inputsubmit
              type="submit"
              value="crear cuenta"
            />
          </Formulario>
        </>

      </Layout>
    </div>
  )
}

export default CrearCuenta