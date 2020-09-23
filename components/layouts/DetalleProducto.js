import React from 'react';
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {es} from 'date-fns/locale'
import Link from 'next/link'

const DestalleProducto = ({producto}) => {
    const {id, comentarios, creado, descripcion, empresa, nombre, url, imagen, votos} = producto
    return (
        <Producto>
            <DescripcionProducto>
                    <Img src={imagen}/>
                <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                        <Titulo>{nombre}</Titulo>
                    </Link>
                    <TextoDescripcion>{descripcion}</TextoDescripcion>
                    <Comentarios>
                        <div>
                            <img src="/static/img/comentario.png"/>
                            <p>{comentarios.length} comentarios</p>
                        </div>
                        <Votos>
                            <div> &#9650;</div>
                            <p>{votos}votos</p>
                        </Votos>
                    </Comentarios>
                    <p>Publicado {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                </div>
            </DescripcionProducto>
        </Producto>
      );
}


const Img = styled.img`
    width: 300px;
    margin-right: 4rem;
`

const Producto = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E1E1E1;
`

const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: flex;
    justify-content: space-between;
    @media(max-width:640px){
        display: block;
    }
`

const Comentarios = styled.div `
    margin-top: 2rem;
    display: flex;
    align-items: center;

    div{
        display: flex;
        align-items: center;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }

    img{
        width: 2rem;
        margin-right: 2rem;
    }

    p{
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;

        &:last-of-type{
            margin:0;
        }
    }
`

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 1rem 3rem;

    div {
        font-size: 2rem;
    }

    p {
        margin: 0;
        font-size: 2rem;
        font-weight:700;
    }
    @media(max-width:700px){
        margin-left: 1rem;
        width: 100px;

        p {
            font-size: 1.5rem;
        }
    }
`
const Titulo = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;

    &:hover{
        cursor: pointer;
    }
`

const TextoDescripcion = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;
`
 
export default DestalleProducto;