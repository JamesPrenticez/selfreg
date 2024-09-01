import React, { lazy, Suspense, type ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from '@models'

import 'dayjs/locale/en-nz'
import 'dayjs/locale/en-gb'

import Layout from "./components/layout/Layout";
import Loading from "./components/common/Loading";

import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Test from "@pages/Test";
import UserSettings from "@components/user/UserSettings";
import Register from "@pages/auth/Register";
import NotFound from "@pages/errors/NotFound";
import Timer from "@pages/Timer";
import CountdownTimer from "@components/timer/CountdownTimer";


function App(): ReactElement {

  return (
    <Suspense fallback={<Loading fullScreen={true} backgroundColor="#F0F" />}>
      <Layout>
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.LOGIN} element={<Login />} />
          <Route path={Paths.REGISTER} element={<Register />} />
          <Route path={Paths.SETTINGS} element={<UserSettings />} />
          <Route path={Paths.TEST} element={<Test />} />
          <Route path={Paths.TIMER} element={<Timer />} />
          <Route path={Paths.COUNTDOWN} element={<CountdownTimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;