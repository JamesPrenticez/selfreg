import React, { lazy, Suspense, type ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";


import Layout from "./components/layout/Layout";
import Loading from "./components/common/Loading";

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./components/auth/SignIn";

const Admin = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import("./pages/Admin"),
    new Promise((resolve) => setTimeout(resolve, 500)), // Adds a controlled delay to suspense
  ]);
  return moduleExports;
});

const Sleep = lazy(() => import("./pages/Sleep"));
const Exercise = lazy(() => import("./pages/Exercise"));
const Meditation = lazy(() => import("./pages/Meditation"));
const Business = lazy(() => import("./pages/Business"));

const NotFound = (): ReactElement  => <h1>404 - Not Found</h1>;

function App(): ReactElement {
  return (
    <ReduxProvider store={store}>
      <Suspense
        fallback={
          <Loading fullScreen={true} backgroundColor="rgb(249 250 251)" />
        }
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/sleep" element={<Sleep/>} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/business" element={<Business />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<SignIn csrfToken="123456"  providers={["github", "facebook"]} />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Suspense>
    </ReduxProvider>
  );
};

export default App;
