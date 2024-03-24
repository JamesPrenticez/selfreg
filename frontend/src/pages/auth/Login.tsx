import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { 
  Label,
  InputText,
  Button,
  ErrorMessage
} from "@components/ui";
import { ArrowLeftIcon, InfoIcon } from "@components/icons";
import { useForm, createValidationSchema, resolver, v } from "@utils/formValidation";

import { useAppSelector } from "@redux/hooks";
import { useLoginMutation } from "@redux/services/authApi";

import { Paths, ILoginDeatils } from "@models";

function Login() {
  const navigate = useNavigate();
  const [signIn] = useLoginMutation();
  const user = useAppSelector((state) => state.user.data);

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
    onSubmit: handleLogin
  });

  async function handleLogin() {
    await signIn(formData)
      .then(() => {
        navigate(Paths.SETTINGS);
      })
      .catch((error: any) => {
        if (error.status === 401) {
          // TODO handle message "this user already exists - login instead?"
          console.log(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      });
  }
  
  // TODO remove this!
  function autoFillDetails(){
    setFieldValue("email", "jamesprenticez@gmail.com");
    setFieldValue("password", "password123");
  }

  // Redirect if user already logged in
  useEffect(() => {
    if (user.email !== "") {
      navigate(Paths.SETTINGS);
    }
  }, [user.email, navigate]);

  return (
    <div className="h-screen-4rem md:h-screen-5rem text-muted p-12 bg-night">
      
      <div className="w-full max-w-[460px] bg-shadow rounded mx-auto overflow-hidden">

        <div className="h-[180px]  relative bg-[url('/bg.jpeg')] bg-cover">
          {/* here */}
          <div className="absolute bg-gradient-to-r from-fern to-moss opacity-80 inset-0"/> 

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
            <p className="">Sign in to continue your journey</p>
            <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-shadow absolute bottom-[-40px]">
              <Link to="/" className="w-[60%] h-[60%]">
                <div className="rounded-full">
                  <img src="/logo.svg" className="rounded-full" alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div> 

        <form className="p-6">
          <div className="flex items-center">
            <span className="ml-auto cursor-pointer hover:text-sage">
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

          <Label value="Password:" htmlFor="password" className="relative">
            <Link to="/password-reset" className="w-[60%] h-[60%]">
              <p className="absolute top-[2px] right-0 text-[11px] text-mist hover:text-sage">
                Forgot password?
              </p>
            </Link>
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
            className="w-full mt-2 bg-green-600"
            onClick={handleSubmit}
          >
            Sign In
          </Button>

          <div className="text-center mt-4 flex items-center justify-center flex-col">
            <p>Dont have an account?</p>
            <NavLink to={Paths.REGISTER}>
              <Button 
                variant="link"
                className="flex items-center text-sage font-bold"
              >
                Register now
                <ArrowLeftIcon width={18} strokeWidth={2} className="ml-2 rotate-[120deg]"/>
              </Button>
            </NavLink>
          </div>
        </form> 

      </div>
    </div>
  );
}

export default Login;
