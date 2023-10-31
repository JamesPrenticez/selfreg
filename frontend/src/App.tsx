import React, { lazy, Suspense, type ReactElement, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Loading from "./components/common/Loading";

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./components/auth/SignIn";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setLocale } from "@redux/slices";
import dayjs from "dayjs";
import 'dayjs/locale/en-nz'
import 'dayjs/locale/en-gb'
import { getUser } from "@redux/thunk/userThunk";

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
const Settings = lazy(() => import("./pages/Settings"));

const NotFound = (): ReactElement  => <h1>404 - Not Found</h1>;

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
      // dispatch(getUser({ _id: '123456' }));
    // .then() ???
      const fetchedLocale = user.data?.locale; // e.g., fetch from an API or localStorage
      dayjs.locale(fetchedLocale); // this must be set first before the dispatch
      dispatch(setLocale(fetchedLocale));
  }, [dispatch]);

  useEffect(() => {
    dayjs.locale(user.data?.locale); // Update dayjs locale whenever the user's setting changes
  }, [user]);

  return (
    <Suspense
      fallback={
        <Loading fullScreen={true} backgroundColor="#FF00FF" />
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
          <Route path="/settings" element={<Settings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
