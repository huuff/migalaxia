import Cabecera from "./Cabecera.js";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Root = () => {
  const [mode, setMode] = useState("dark");

  function changeMode() {
    const body = document.getElementsByTagName("body")[0];
    let texto;
    if (mode === "dark") {
      setMode("light");
      body.setAttribute("data-bs-theme", "light");
      texto = "Cambiar a modo oscuro";
    } else {
      setMode("dark");
      body.setAttribute("data-bs-theme", "dark");
      texto = "Cambiar a modo claro";
    }

    return texto;
  }

  return (
    <>
      <Cabecera changeMode={changeMode} />
      <Outlet />
    </>
  );
};

export default Root;
