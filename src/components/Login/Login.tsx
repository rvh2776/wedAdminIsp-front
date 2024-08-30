import React from "react";
import Documentation from "./Documentation/Documentation";
import styles from "./Login.module.css";
import AddDocument from "./AddDocument/AddDocument";
import Status from "./Status/Status";
import LoginForm from "./LoginForm/LoginForm";

const Login = ({ page }: { page: number }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-center bg-cover bg-fixed brightness-100 h-svh">
      <div className="p-10 lg:p-20 bg-gray-200 overflow-auto">
        <Documentation />
      </div>
      <div className={`p-10 ${styles.rightComponent}`}>
        {page == 1 && <LoginForm />}
        {page == 2 && <AddDocument />}
        {page == 3 && <Status />}
      </div>
    </div>
  );
};

export default Login;
