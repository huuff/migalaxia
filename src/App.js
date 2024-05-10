import {useState}  from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Componentes
import Cabecera from "./Components/Cabecera.js";
import Noticias from "./Components/Noticias.js";
import Bienvenido from "./Components/Bienvenido.js";
import Aprender from "./Components/Aprender.js";
import Jugar from "./Components/Jugar.js";
import FotoDelDia from "./Components/FotoDelDia.js";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Bienvenido/>
    },
    {
        path: "/aprender",
        element: <Aprender/>
    },
    {
        path: "/jugar",
        element: <Jugar/>
    },
    {
        path: "/foto",
        element: <FotoDelDia/>
    },
    {
        path: "/noticias",
        element: <Noticias/>
    }
]);

const App = () => {
    const [app, setApp] = useState({ mode: "dark" });

    const path = router.state.location.pathname;
    function changeMode(elemento) {
        const body = document.getElementsByTagName("body")[0];
        const classList = document.getElementById("cabecera").classList;

        if (app.mode === "dark") {
            setApp({mode: "light"});
            body.setAttribute("data-bs-theme", "light");
      
            classList.remove("gradient-dark");
            classList.add("gradient-light");

            elemento.textContent = "Cambiar a modo oscuro";
        }
        else {
            setApp({mode: "dark"});
            body.setAttribute("data-bs-theme", "dark");
      
            classList.remove("gradient-light");
            classList.add("gradient-dark");

            elemento.textContent = "Cambiar a modo claro";
        }
    } 

    return (
        <>
            <Cabecera app={app} changeMode={changeMode} path={path}/>
            <RouterProvider router={router}/>
        </>
    )
};

export default App;
  
