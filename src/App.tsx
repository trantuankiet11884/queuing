import Layout from "antd/es/layout/layout";
import "./App.css";

import "./index.css";
import Router from "./Router/Router";
import SiderMenu from "./components/Menu/SiderMenu";
import RouterAuth from "./Router/RouterAuth";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <SiderMenu />
          <Router />
        </Layout>
      ) : (
        <RouterAuth />
      )}
    </>
  );
}

export default App;
