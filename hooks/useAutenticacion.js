import React, { useEffect, useState } from 'react';
import firebase from '../firebase'

const useAutenticacion = () => {
    const [usuarioAutenticado, setUsuarioautenticado] = useState(null)

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                setUsuarioautenticado(usuario)
            } else {
                setUsuarioautenticado(null)
            }
        })
        return () => unsuscribe()
    }, [])
    return usuarioAutenticado
}

export default useAutenticacion