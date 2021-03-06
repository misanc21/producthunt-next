import styled from '@emotion/styled'

export const Formulario = styled.form `
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;
    padding: 1rem 3rem;

    fieldset {
        margin: 2rem 0;
        border: 1px solid #E1E1E1;
        font-size: 2rem;
        padding: 2rem;
    }
`

export const Campo = styled.div `
    margin-bottom: 1rem;
    display:flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input, textarea {
        flex: 1;
        padding: 1rem;
        border: 1px solid #cacaca;
    }

    textarea {
        height: 100px
    }

    @media(max-width: 700px){
        width: 350px;

        label {
            flex: 0 0 100px;
        }
    }
`

export const Inputsubmit = styled.input `
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover{
        cursor: pointer;
    }

`

export const Error = styled.p`
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color:red;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 2rem;
    margin-top: 0;
`