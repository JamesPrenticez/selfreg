import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { 
  Label,
  InputText,
  Button,
  ErrorMessage
} from "@components/ui";
import { ArrowLeftIcon, EyeClosedIcon, EyeOpenIcon, InfoIcon } from "@components/icons";

import { useForm, createValidationSchema, resolver, v } from "@utils/formValidation";
import { useAppSelector } from "@redux/hooks";
import { useRegisterMutation } from "@redux/services/authApi";

import { Paths, IRegisterDeatils } from "@models";

function Register() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const user = useAppSelector((state) => state.user.data);
  const [showPassword, setShowPassword] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false)

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
  } = useForm<IRegisterDeatils>({
    initialState: initialState, 
    validationSchema: validationSchema,
    validatorFn: resolver,
    onSubmit: handleRegister
  });

  //TODO
  async function handleRegister() {
    try {
      await register(formData).unwrap();
      navigate(Paths.SETTINGS);
      console.log('Registration successful. Redirecting...');
    } catch (error: any) {
      if(error.status === 400){
        setEmailAlreadyExists(true)
      }
      console.error('Error during registration:', error);
    }
  };
  
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
          <div className="absolute bg-gradient-to-r from-fern to-moss opacity-80 inset-0"/> 

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">Register</h1>
            <p className="">Start your self improvement journey today!</p>
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

          <Label value="Password:" htmlFor="password">
            <InputText 
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div 
              className="absolute cursor-pointer right-[10px] bottom-[24px] text-disabled hover:text-mist"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)} 
            >
              {showPassword ? (
                <EyeClosedIcon height={24} width={24}/>
                ) : (
                <EyeOpenIcon height={24} width={24}/>
              )}
            </div>
            <ErrorMessage message={formErrors.password.errorMessage}/>
          </Label>

          <Button 
            color="minor"
            className="w-full mt-2"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

          <div className="mt-4 text-[12px] text-center">
            <p>By registering you agree to our&nbsp;
              <NavLink to={Paths.TERMS_OF_SERVICE}>
                <Button 
                  variant="link"
                  className="inline-flex p-0 items-center text-sage hover:text-sage/50 font-bold"
                >
                  Terms of Service
                </Button>
              </NavLink>
              &nbsp;and our&nbsp;
              <NavLink to={Paths.PRIVACY_POLICY}>
                <Button 
                  variant="link"
                  className="inline-flex p-0 items-center text-sage hover:text-sage/50 font-bold"
                >
                  Privacy Policy
                </Button>
              </NavLink>
            </p>
          </div>

          <div className="text-center mt-4 flex items-center justify-center flex-col">
            <p>Already have an account?</p>
            <NavLink to={Paths.LOGIN}>
              <Button 
                variant="link"
                className="flex items-center text-sage font-bold"
              >
                Login
                <ArrowLeftIcon width={18} strokeWidth={2} className="ml-2 rotate-[120deg]"/>
              </Button>
            </NavLink>

            {/* TODO - add modal for this */}
            <ErrorMessage message={emailAlreadyExists ? "Email address already in user" : ""}/>
          </div>

        </form> 

      </div>
    </div>
  );
}

export default Register;
