import Layout from '../components/layouts/Layout'
import {useRouter} from 'next/router'
import DetalleProducto from '../components/layouts/DetalleProducto'
import { useEffect, useState, useContext } from 'react'
import {FirebaseContext} from '../firebase'

const Buscar = ()=> {
  const router = useRouter()
  const {query: {q}} = router
  const [productos, setProductos] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(()=>{
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('nombre').startAt(`${q}`).endAt(`${q} \uf8ff`).onSnapshot(manejarSnapshot)
    }
    if(q){
      obtenerProductos()
    }
  },[q])

  const manejarSnapshot = snapshot => {
    console.log(snapshot.docs)
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

export default Buscar