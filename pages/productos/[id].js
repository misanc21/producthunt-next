/** @jsx jsx */
import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import { css, jsx } from '@emotion/core'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import styled from '@emotion/styled'
import Layout from '../../components/layouts/Layout'
import { Campo, Inputsubmit } from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton'

import Error404 from '../../components/layouts/404'

const Producto = () => {
    const router = useRouter()
    
    const { firebase, usuario } = useContext(FirebaseContext)
    const { query: { id } } = router

    const [producto, setProducto] = useState({
        haVotado: []
    })
    const [error, setError] = useState(false)
    const [comentario, setComentario] = useState({})
    const [consulta, setConsulta] = useState(true)

    useEffect(() => {
        if (id && consulta) {
            const getProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id)
                const producto = await productoQuery.get()
                if (producto.exists) {
                    setProducto(producto.data())
                    setConsulta(false)
                } else {
                    setError(true)
                    setConsulta(false)
                }
            }
            getProducto();
        }
    }, [id])

    const { comentarios, creado, descripcion, empresa, nombre, url, imagen, votos, creador, haVotado } = producto

    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login')
        }
        const nuevoTotal = votos + 1;
        const hanVotado = [...haVotado, usuario.uid]
        setProducto({
            ...producto,
            votos: nuevoTotal,
            haVotado: hanVotado
        })
        setConsulta(true)

        firebase.db.collection('productos').doc(id).update({ votos: nuevoTotal, haVotado: hanVotado })
    }

    const desvotarProducto = () => {
        if (!usuario) {
            return router.push('/login')
        }
        const nuevoTotal = votos - 1;
        const hanVotado = haVotado.filter(e => e !== usuario.uid)
        setProducto({
            ...producto,
            votos: nuevoTotal,
            haVotado: hanVotado
        })
        setConsulta(true)
        firebase.db.collection('productos').doc(id).update({ votos: nuevoTotal, haVotado: hanVotado })
    }

    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    const esCreador = id => {
        return creador.id === id ? true : false

    }

    const addComentario = e => {
        e.preventDefault()
        if (!usuario) {
            return router.push('/login')
        }
        comentario.usuarioId = usuario.uid
        comentario.usuarioNombre = usuario.displayName

        const nuevosComen = [...comentarios, comentario]
        setProducto({
            ...producto,
            comentarios: nuevosComen
        })
        setConsulta(true)
        firebase.db.collection('productos').doc(id).update({ comentarios: nuevosComen })
    }

    const puedeBorrar = () => {
        if(!usuario) return false
        
        return creador.id === usuario.uid? true : false
    }

    const eliminarProducto = async () => {
        if (!usuario) {
            return router.push('/')
        }
        
        if(creador.id !== usuario.uid){
            return router.push('/')
        }

        try {
            console.log('eliminaaaaaa')
            await firebase.db.collection('productos').doc(id).delete()
            return router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            {error ? <Error404 />
                :
                <div className="contenedor">
                    <h2
                        css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                    >
                        {nombre}
                    </h2>
                    <ContenedorProducto>
                        <div>
                            {creado &&
                                <>
                                    <p>Publicado {formatDistanceToNow(new Date(creado), { locale: es })}</p>
                                    <p>Por {creador.nombre}</p>
                                    <img src={imagen} />
                                    <p>{descripcion}</p>
                                    {usuario &&
                                        <>
                                            <h2>Agrega tu comentario</h2>
                                            <form
                                                onSubmit={addComentario}
                                            >
                                                <Campo>
                                                    <input
                                                        type="text"
                                                        name="mensaje"
                                                        onChange={comentarioChange}
                                                    />
                                                </Campo>
                                                <Inputsubmit
                                                    type="submit"
                                                    value="agregar comentario"
                                                />
                                            </form>
                                        </>
                                    }
                                    <h2>Comentarios</h2>
                                    <ul>
                                        {
                                            comentarios.map((c, i) => (
                                                <ContenedorComentario
                                                    key={i}
                                                >
                                                    <MensajeComentario>{c.mensaje}</MensajeComentario>
                                                    <AutorComentario>Escrito por: {c.usuarioNombre} {esCreador(c.usuarioId) && <span>(Es creador)</span>}</AutorComentario>
                                                </ContenedorComentario>
                                            ))
                                        }
                                    </ul>
                                </>
                            }
                        </div>
                        <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar Url</Boton>
                            {usuario &&
                                <>
                                    {haVotado.includes(usuario.uid) ?
                                        <Boton
                                            onClick={desvotarProducto}
                                            bgColor={true}
                                        >
                                            Quitar Voto
                                </Boton>
                                        :
                                        <Boton
                                            onClick={votarProducto}
                                        >
                                            Votar
                                </Boton>

                                    }
                                </>
                            }
                            <p
                                css={css`
                                text-align: center;
                            `}
                            >{votos} Votos</p>
                        </aside>
                    </ContenedorProducto>
                    {puedeBorrar && 
                        <Boton onClick={eliminarProducto}>Eliminar producto</Boton>
                    }
                </div>
            }
        </Layout>
    );
}



const ContenedorProducto = styled.div`
    @media(min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`

const ContenedorComentario = styled.li`
    border-bottom: 1px solid #e1e1e1;
    margin-bottom: 1rem;
    padding: 0;
`

const AutorComentario = styled.p`
    color: #c4c4c4;
    padding:0;
`

const MensajeComentario = styled.p`
    padding:0;
`

export default Producto;