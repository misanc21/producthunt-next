/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/core'

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
    return ( 
        <form
            css={css`
                position: relative;
            `}
        >
            <InputText type="text" placeholder="buscar productos"/>
            <Inputsubmit type="submit">Buscar</Inputsubmit>
        </form>
     );
}
 
export default Buscar;