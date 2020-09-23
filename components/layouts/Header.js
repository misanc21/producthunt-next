import React, { useContext } from 'react';
import styled from '@emotion/styled'
import Link from 'next/link'

import Boton from '../ui/Boton'
import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'

import {FirebaseContext} from '../../firebase'

const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext)

    return (
        <StyledHeader>
            <ContenedorHeader>
                <DivBotones>
                    {usuario ? 
                    (
                        <>
                        <Pnombre>
                            Hola {usuario.displayName}
                        </Pnombre>
                        <Boton
                            bgColor="true"
                            onClick={() => firebase.cerrarSesion()}
                        >
                            Cerrar sesión
                        </Boton>
                        </>
                    ):(
                        <>
                        <Link href="/login">
                            <Boton bgColor="true">
                                Login
                            </Boton>
                        </Link>
                        <Link href="/crear-cuenta">
                            <Boton>Crear cuenta</Boton> 
                        </Link>
                        </>
                    )}
                </DivBotones>
                <NavArriba>
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Buscar />
                    <Navegacion />
                </NavArriba>
            </ContenedorHeader>
        </StyledHeader>
    );
}

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    flex-direction: row-reverse;

    @media (min-width:768px){
        display: flex;
        justify-content: space-between;
    }
`
const NavArriba = styled.div`
    display:flex;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 694px){
        justify-content: center;
    }

`
const DivBotones = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`

const Pnombre = styled.p `
    margin-right: 2rem;
` 

const StyledHeader = styled.header`
    border-bottom: 2px solid var(--gris3);
    padding-bottom: 1rem;
`

export default Header;