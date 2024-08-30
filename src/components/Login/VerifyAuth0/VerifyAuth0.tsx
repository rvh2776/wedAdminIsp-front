'use client'
import Loading from '@/components/Dashboard/Loading/Loading';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/user.services';
import { ITokenSession, IUserSession } from '@/types/login.types';
import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect } from 'react'
import Swal from 'sweetalert2';

const VerifyAuth0 = () => {
    const { login } = useAuth();
    const searchParams = useSearchParams()
    const router = useRouter();
    
    const verify = searchParams.get('verify');
    const token = searchParams.get('token');
    const issuedAt = searchParams.get('issuedAt');
    const expiresAt = searchParams.get('expiresAt');
    const agente = searchParams.get('agente');
    const userId = searchParams.get('userId');
    const userEmail = searchParams.get('userEmail');
    const userNombre = searchParams.get('userNombre');
    const userRole = searchParams.get('userRole');


    useEffect(() => {
        const loginSesion = async () => {
          if (verify === "true") {  
            if (token && issuedAt && expiresAt && userId && userEmail && userNombre && userRole && agente) {
                const tokenData: ITokenSession = {
                    succes: "ok",
                    token: token,
                    issuedAt: issuedAt,
                    expiresAt: expiresAt,
                    agente: agente,
                    user: {
                        id: userId,
                        email: userEmail,
                        nombre: userNombre,
                        roles: [userRole],
                    },
                    keyProperty: null,
                };

                try {
                    const userData: IUserSession = await loginUser(userId, token);
                    if (userData) {
                        login({ tokenData, userData });

                        Swal.fire({
                            title: "¡Acceso exitoso!",
                            html: `<h1 style="color:gray; font-size:25px; font-weight: 500;">Bienvenido(a):</h1>
                                   <p style="margin-top:10px">${userData.email}</p> 
                                   <p style="font-size:20px">${userData.nombre}</p>`,
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Ok"
                        });
                    }
                } catch (err: any) {
                    const errorMessage = err.message;
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: errorMessage,
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok"
                    });
                }
            }
        } else {
            router.push("/");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario no reconocido en el sistema, porfavor pongase en contacto con el administrador",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok"
            });
        }
    };

        loginSesion();
    }, [agente, expiresAt, issuedAt, login, router, token, userEmail, userId, userNombre, userRole, verify]);
 
  return (
      <>
    <Loading />
      <h1 className='text-gray-500 font-medium text-2xl text-center mt-[30%]'>Verificando credenciales...</h1>
      </>
  )
}

export default VerifyAuth0;