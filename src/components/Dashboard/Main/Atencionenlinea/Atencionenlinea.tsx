'use client'

import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import AdminChat from './AdminChat';
import UserChat from './UserChat';

const Atencionenlinea = () => {
  const { userData } = useAuth();
  const [isAdmin, setIsAdmin] = useState<string>('');

useEffect(() => {
  if (!userData) return;
  if(userData.tokenData.user.roles.includes('admin')){
    setIsAdmin('admin');
  } else if(userData.tokenData.user.roles.includes('user')){
    setIsAdmin('user');
  }
}, [userData]);


  return (
    <>
{isAdmin == 'admin' ? <AdminChat /> : isAdmin == 'user' ? <UserChat /> : ''}
    </>
  )
}

export default Atencionenlinea
