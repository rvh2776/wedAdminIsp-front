import React from "react";

import ExpirationAlert from "../ExpirationAlert/ExpirationAlert";
import Loading from "@/components/Dashboard/Loading/Loading";

const Main = ({ page }: { page: string }) => {
  const router = page.charAt(0).toUpperCase() + page.slice(1);
  const ComponentToRender = React.lazy(() => import(`./${router}/${router}`));
  return (
    <>
      <ComponentToRender />
      <ExpirationAlert />
      <Loading />
    </>
  );
};

export default Main;
