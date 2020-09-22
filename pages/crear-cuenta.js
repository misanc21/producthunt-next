/** @jsx jsx */
import Layout from '../components/layouts/Layout'

import {Formulario, Campo, Inputsubmit} from '../components/ui/Formulario'
import {css, jsx} from '@emotion/core'

const CrearCuenta = ()=> {
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
          <Formulario>
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
              />
            </Campo>
            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                placeholder="Tu email"
                name="email"
              />
            </Campo>
            <Campo>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                placeholder="Tu password"
                name="password"
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