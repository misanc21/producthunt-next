/** @jsx jsx */
import React, {useState} from 'react';
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/core'
import Router from 'next/router'

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`

const Inputsubmit =  styled.button`
    width: 3rem;
    height: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    position: absolute;
    right: 1rem;
    top: 1px;
    border: none;
    background-color: white;
    text-indent: -55em;

    &:hover{
        cursor: pointer;
    }
`

const Buscar = () => {
    const [busqueda, setBusqueda] = useState('')
    const buscarProducto = e => {
        e.preventDefault();
        if(busqueda.trim() === '') return
        Router.push({
            pathname: '/buscar',
            query:{
                q: busqueda
            }
        })
    }

    return ( 
        <form
            css={css`
                position: relative;
            `}
            onSubmit={buscarProducto}
        >
            <InputText type="text" placeholder="buscar productos" onChange={e => setBusqueda(e.target.value) }/>
            <Inputsubmit type="submit">Buscar</Inputsubmit>
        </form>
     );
}
 
export default Buscar;