import React from 'react';
import logo_01 from '../../../../public/images/Logo01.png'; 
import styles from './Loading.module.css'
import Image from 'next/image';

const Loading = () => {

  return (
    <>
      <Image src={logo_01} className={styles.iconoImage}  alt="Logo" />
    </>
  );
};

export default Loading;