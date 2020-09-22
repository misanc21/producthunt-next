import React, {useEffect, useState, useContext} from 'react'
import Layout from '../components/layouts/Layout'
import {FirebaseContext} from '../firebase'

import DetalleProducto from '../components/layouts/DetalleProducto'

export default function Home() {
  const [productos, setProductos] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
    }
    obtenerProductos()
  }, [])

  const manejarSnapshot = snapshot => {
    const productos = snapshot.docs.map(doc =>{
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setProductos(productos)
  }

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map(producto =>(
                <DetalleProducto
                  key={producto.id}
                  producto = {producto}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}
