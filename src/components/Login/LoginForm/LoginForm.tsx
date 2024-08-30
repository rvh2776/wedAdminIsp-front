'use client'
import { useAuth } from '@/context/AuthContext';
import { validateLogin } from '@/helpers/validateLogin';
import { apiURL, loginSesion, loginUser, pathAuth0 } from '@/services/user.services';
import { ITokenSession, IUserSession } from '@/types/login.types';
import Link from 'next/link';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import iconGoogle from "../../../../public/images/iconGoogle.png";
import Image from 'next/image';
import { usePathname } from 'next/navigation';


const LoginForm = () => {   
    const { login } = useAuth();
	const pathname = usePathname()
console.log("pathname: ", pathname);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	  });

	const [errors, setErrors] = useState({
		email: '',    
		password: '',   
	  });  
	  
	  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let updatedValue = value;
		//if (name === 'email') updatedValue = value.toLowerCase();
		setFormData({ ...formData, [name]: updatedValue });
	
		const fieldErrors = validateLogin({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: fieldErrors[name] });
	  };
	
	  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

			try{
				const firstTokenData: ITokenSession = await loginSesion(formData);
                const { token } = firstTokenData
                if (token){
				setFormData({ email: '', password: ''});
				const userData: IUserSession = await loginUser(firstTokenData.user.id, firstTokenData.token);

				const tokenData = {...firstTokenData, keyProperty: formData.password}
				if (userData) {
                login({ tokenData,  userData}); 

                Swal.fire({
                  title: "¡Acceso exitoso!",
                  html: `  <h1 style="color:gray; font-size:25px; font-weight: 500;" > Bienvenido(a):</h1>
				  		   <p style="margin-top:10px">${userData.email}</p> 
                           <p style="font-size:20px">${userData.nombre} </p>	
                   `,
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
				  confirmButtonText: "Ok"
                })
				}
              }
          } 
          catch (err: any) {
              const errorMessage = err.message;
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
              });
            }	
          }

		  const handleLoginGoogle = async () => {
		 	window.location.href = apiURL+pathAuth0;
		   }

     return (
		<div className=" mt-[30%] w-96 h-80 overflow-hidden bg-gray-100 rounded-xl shadow-2xl p-4 ">
		  <div>
			<form onSubmit={handleSubmit} className='px-5'>
			  <input
                className=' w-11/12 h-10 bg-gray-300 justify-center flex p-4 mt-6 outline-none rounded-md text-sm placeholder-gray-700'
				type="text"
				name="email"
				placeholder="Usuario"
				value={formData.email}
				onChange={handleChange}
			  />
				{errors.email  && <p className=" text-red-700 text-sm pl-4 fixed italic whitespace-pre-line"> {errors.email} </p>}
			  <input
                className=' w-11/12 h-10 bg-gray-300 justify-center flex p-4 mt-6 outline-none rounded-md text-sm placeholder-gray-700'
				type="password"
				name="password"
				placeholder="Contraseña"
				value={formData.password}
				onChange={handleChange}
			  />
			    {errors.password  && <p className=" text-red-700 text-sm pl-4 fixed italic whitespace-pre-line"> {errors.password} </p>}

			  <button disabled={Object.values(errors).some(error =>  error !== undefined)} className={Object.values(errors).some(error =>  error !== undefined) ? "w-11/12 h-10 mt-6 bg-gray-400 justify-center block text-gray-100 text-sm rounded-md ease-in cursor-not-allowed" : "w-11/12 h-10 mt-6 bg-blue-700 justify-center block text-gray-100 text-sm rounded-md ease-in cursor-pointer"} type="submit">INICIAR SESIÓN</button>
			</form>
            <div className='mt-1'>
            <Link href="/" className='text-gray-500 text-sm'>¿Olvidaste tu contraseña?</Link>	
            </div>
			<div className='mt-1 '>
				<button 
					className=" w-10/12 h-10 mt-6 bg-gray-300 flex items-center justify-center text-gray-800 text-sm rounded-3xl ease-in cursor-pointer"
					onClick={handleLoginGoogle}
					>
						<Image className="mr-2" src={iconGoogle} alt="Google Icon" width={20} height={20} />
						Iniciar sesión con Google
				</button>
            </div>		
		  </div>
		</div>
	  )
	};

export default LoginForm;