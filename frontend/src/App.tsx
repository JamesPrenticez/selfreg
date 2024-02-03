import React, { lazy, Suspense, type ReactElement, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Loading from "./components/common/Loading";
import { redirect } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setLocale } from "@redux/slices";
import dayjs from "dayjs";
import 'dayjs/locale/en-nz'
import 'dayjs/locale/en-gb'

import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import Habits from "@pages/Habits"; // dont want to lazy load 
import { useGetUserDetailsQuery } from "@redux/services";
import RequiresAuth from "@components/auth/RequiresAuth";
import Test from "@pages/Test";
import Calendar from "@pages/Calendar";
const Timer = lazy(() => import("./pages/Timer"));
const Stats = lazy(() => import("./pages/Stats"));
const Settings = lazy(() => import("./pages/Settings"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = (): ReactElement  => <h1 className="text-primary">404 - Not Found</h1>;

function App(): ReactElement {
  let location = useLocation();

  // useEffect(() => {
  //     const fetchedLocale = user.data?.locale; // e.g., fetch from an API or localStorage
  //     dayjs.locale(fetchedLocale); // this must be set first before the dispatch
  //     dispatch(setLocale(fetchedLocale));
  // }, [dispatch]);

  // useEffect(() => {
  //   dayjs.locale(user.data?.locale); // Update dayjs locale whenever the user's setting changes
  // }, [user]);

  return (
    <Suspense
      fallback={
        <Loading fullScreen={true} backgroundColor="#F0F" />
      }
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/calendar" element={<Calendar />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />

          {/* <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<Navigate to="/404" state={{ from: location }} replace />} /> */}


          <Route path="user/:_id/habits" element={
            <RequiresAuth>
              <Habits />
            </RequiresAuth>
          }/>

          {/* 
          <Route path="/timer" element={
            <RequiresAuth>
              <Timer />
            </RequiresAuth>
          } />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
  
        */}
        <Route path="/admin" element={<Admin />} />

        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
