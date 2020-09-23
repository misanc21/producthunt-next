/** @jsx jsx */
import Layout from '../components/layouts/Layout'
import React, { useState, useContext } from 'react'
import {FirebaseContext} from '../firebase'
import FileUploader from 'react-firebase-file-uploader'

import { Formulario, Campo, Inputsubmit, Error } from '../components/ui/Formulario'
import { css, jsx } from '@emotion/core'
import Router, {useRouter} from 'next/router'

import useValidacion from '../hooks/useValidacion'
import validarCrearProducto from '../validacion/validarCrearProducto'
import Error404 from '../components/layouts/404'

const NuevoProducto = () => {
  const {usuario, firebase} = useContext(FirebaseContext)

  const router = useRouter()
  /* states y funciones para imagen*/
  const [nombreimg, setNombreimg] = useState('')
  const [subiendo, setSubiendo] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [urlImagen, setUrlImagen] = useState('')

  const handleUploadStart = () => {
    setProgreso(0)
    setSubiendo(true)
  }

  const handleProgress = progress => setProgreso(progress)

  const handleUploadError = error => {
    setSubiendo(false)
    console.log(error)
  }

  const handleUploadSuccess = (nombre) => {
    setProgreso(100)
    setSubiendo(false)
    setNombreimg(nombre)
    firebase
      .storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        setUrlImagen(url)
      });
  }

  /* states y funciones para imagen fin*/

  const [stateInicial, setStateInicial] = useState({
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion:'',
    votos:0,
    comentarios: [],
    creado: '',
    haVotado:[]
  })
  const [error, setError] = useState(false)


  const crearProductoFunc = async () => {
    if(!usuario){
      return router.push('/')
    }
    valores.creado = Date.now()
    valores.imagen = urlImagen
    valores.creador = {
      id: usuario.uid,
      nombre: usuario.displayName
    }
    await firebase.db.collection('productos').add(valores)
    return router.push('/')
  }

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
  } = useValidacion(stateInicial, validarCrearProducto, crearProductoFunc)

  const { nombre, empresa, imagen, url, descripcion } = valores

  return (
    <div>
      <Layout>
        {!usuario? <Error404 /> :
        (
          <>
            <h2
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >Nuevo producto</h2>
            <Formulario
              onSubmit={handleSubmit}
              noValidate
            >
              <fieldset>
                <legend>Informacion general del producto</legend>

                <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Tu nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                  />
                </Campo>
                {errores.nombre && <Error>{errores.nombre}</Error>}
                <Campo>
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    placeholder="Tu empresa"
                    name="empresa"
                    value={empresa}
                    onChange={handleChange}
                  />
                </Campo>
                {errores.empresa && <Error>{errores.empresa}</Error>}
                <Campo
                  css={css`
                      @media(max-width: 700px){
                        display:block;
                        text-align:center;
                      }
                   `}
                >
                  <label htmlFor="imagen">Imagen</label>
                  <FileUploader
                    css={css`border: none!important;`}
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Campo>
                {errores.imagen && <Error>{errores.imagen}</Error>}
                <Campo>
                  <label htmlFor="url">url</label>
                  <input
                    type="text"
                    id="url"
                    placeholder="Tu url"
                    name="url"
                    value={url}
                    onChange={handleChange}
                  />
                </Campo>
                {errores.url && <Error>{errores.url}</Error>}
              </fieldset>
              <fieldset>
                <legend>Sobre tu producto</legend>
                <Campo>
                  <label htmlFor="descripcion">Descripcion</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                  />
                </Campo>
                {errores.descripcion && <Error>{errores.descripcion}</Error>}
              </fieldset>
              <Inputsubmit
                type="submit"
                value="crear producto"
              />
              {error && <Error>{error}</Error>}
            </Formulario>
          </>
        )}
      </Layout>
    </div>
  )
}

export default NuevoProducto