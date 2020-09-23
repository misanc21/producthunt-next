/** @jsx jsx */
import React from 'react';
import {css, jsx} from '@emotion/core'

const Error404 = () => {
    return ( 
        <h2
            css={css`
                margin-top: 5rem;
                text-align: center;
            `}
        >No se puede mostrar</h2>
    );
}
 
export default Error404;