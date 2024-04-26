import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./app/route";
import { generateMAC } from "./helper/generateMAC";

function App() {
  useEffect(() => {
    const deviceId = JSON.parse(localStorage.getItem("deviceId"));
    if (!deviceId) {
      localStorage.setItem("deviceId", JSON.stringify(generateMAC()));
    }

    const _il = localStorage.getItem("_il");
    if (!_il) {
      localStorage.setItem("_il", "4E8WL");
    }
  }, []);

  const mappedRoute = routes.map(({ path, component: Component }) => {
    return <Route key={path} path={path} element={<Component />}></Route>;
  });

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>{mappedRoute}</Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
