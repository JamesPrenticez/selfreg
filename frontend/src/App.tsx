import React, { lazy, Suspense, type ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from '@models'

import 'dayjs/locale/en-nz'
import 'dayjs/locale/en-gb'

import Layout from "./components/layout/Layout";
import Loading from "./components/common/Loading";

import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import Test from "@pages/Test";
import UserSettings from "@components/user/UserSettings";


function App(): ReactElement {

  return (
    <Suspense fallback={<Loading fullScreen={true} backgroundColor="#F0F" />}>
      <Layout>
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.SIGN_IN} element={<SignIn />} />
          <Route path={Paths.SETTINGS} element={<UserSettings />} />
          <Route path={Paths.TEST} element={<Test />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;