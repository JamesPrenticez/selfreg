import React, { useState } from "react";
import { 
  Label,
  InputText
} from "@components/ui";
import { Button } from "@components/common";
import { ArrowLeftIcon, InfoIcon } from "@components/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { createValidationSchema, resolver, v } from "@utils/formValidation";
import { IUser } from "@models";
import useForm from "@utils/formValidation/useForm";
import ErrorMessage from "@components/ui/ErrorMessage";
import { ILoginDeatils } from "@models/auth";
import { useSignInMutation } from "@redux/services/authApi";
import axios from "axios";
import { axiosInstance } from "@redux/services/axiosInstance";
import { setJWTCookie } from "@utils";
import { useGetUserDetailsQuery } from "@redux/services";

function SignIn() {
  const navigate = useNavigate();
  const [signIn, mutationResult] = useSignInMutation();

  const [shit, setSHit] = useState(true)
  const { isSuccess: isSuccessUser, isLoading: isLoadingUser, refetch: refetchUserDetails } = useGetUserDetailsQuery(undefined, { skip: shit });

  const validationSchema = createValidationSchema({
    email: v.required().email().minLength(3),
    password: v.required().string(),
  })

  const initialState = {
    email: "",
    password: ""
  }

  const { 
    formData,
    formErrors,
    handleChange,
    setFieldValue,
    handleSubmit
  } = useForm<ILoginDeatils>({
    initialState: initialState, 
    validationSchema: validationSchema,
    validatorFn: resolver,
    onSubmit: handleSignIn
  });

  async function handleSignIn() {
    try {
      const result = await signIn(formData)
      console.log(result)
      // redirect
    } catch (error: any) {

      if(error.status === 401){
        return console.log(error.message)
      }

      return console.log("An unexpected error has occured")
    }
  }

  // TODO remove this!
  function autoFillDetails(){
    setFieldValue("email", "jamesprenticez@gmail.com");
    setFieldValue("password", "password123");
  }

  
  // function deleteRTK() {
  //   console.log("fuck rtk")
  
  //   axiosInstance.get(`http://localhost:5000/api/user/${getUserId()}`)
  //   .then(response => {
  //     // Log the response data
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     // Log any errors
  //     console.error('Error fetching data:', error);
  //   });
  // }

  return (
    <div className="h-screen-4rem md:h-screen-5rem full flex justify-center text-muted">
      <div className="w-full max-w-[460px] border bg-ghost border-major/50 rounded md:my-12 p-6">
        <div className="flex items-center justify-center h-[120px] full-rounded">
          <Link to="/">
            <img src="/logo.svg" className="rounded-full" width="120px" height="120px" alt="" />
          </Link>
        </div>

        <form className="mt-6">

          {/* <h1 className="text-3xl text-center font-bold mb-6">
            Sign In
          </h1> */}

          <div className="flex items-center">
            <h1 className="text-3xl font-bold mb-2">
              Sign In
            </h1>
            <span className="ml-auto cursor-pointer hover:text-sky-400">
              {/* TODO display some info here */}
              <InfoIcon width={24} onClick={() => autoFillDetails()}/>
            </span>
          </div>

          <Label value="Email:" htmlFor="email">
            <InputText
              id="email"
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
            <ErrorMessage message={formErrors.email.errorMessage}/>
          </Label>

          <Label value="Password:" htmlFor="password">
            <InputText 
              id="password"
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
            <ErrorMessage message={formErrors.password.errorMessage}/>
          </Label>

          <Button 
            color="success"
            className="w-full mt-4"
            onClick={handleSubmit}
          >
            Sign In
          </Button>

          <div className="text-center mt-4 flex items-center justify-center flex-col">
            <p>Dont have an account?</p>
            <NavLink to="/sign-up">
              <Button 
                variant="link"
                className="flex items-center "
              >
                Sign Up
                <ArrowLeftIcon width={18} strokeWidth={2} className="ml-2 rotate-[120deg]"/>
              </Button>
            </NavLink>
          </div>

          <div className="flex items-center my-6">
            <div className="h-px flex-1 bg-secondary" />
            <p className="pl-2 pr-2">or</p>
            <div className="h-px flex-1 bg-secondary" />
          </div>



        </form>
          <div>
            <h1 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h1>
            <p>We will email you when we are ready to launch user accounts, where data will be stored and accessable accross multiple devices</p>
          </div>
          <Button 
            color="minor"
            className="w-full mt-6"
            onClick={() => { console.log("asdf"), setSHit(false) }}
          >
            get user
          </Button>
      </div>
    </div>
  );
}

export default SignIn;
