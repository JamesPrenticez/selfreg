import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { 
  Label,
  InputText,
  Button,
  ErrorMessage,
  Switch
} from "@components/ui";
import { ArrowLeftIcon, EyeClosedIcon, EyeOpenIcon, InfoIcon } from "@components/icons";

import { useForm, createValidationSchema, resolver, v } from "@utils/formValidation";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import { useRegisterMutation } from "@redux/services/authApi";

import { Paths, IRegisterDeatils, IUser, AccountType } from "@models";
import { saveUserDataToLocalStorage, saveUserLoginToLocalStorage } from "@utils";
import { setSpaToken, updateUser } from "@redux/slices";


function Register() {
  const navigate = useNavigate();
  
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(true);

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

  async function handleRegister() {
    try {
      if (isOfflineMode) {
        console.log("Registering in offline mode");

        // Save user credentails in local storage 
        const spaToken = saveUserLoginToLocalStorage(formData.email, formData.password);
  
        //  Update the Redux state
        const newOfflineUserData: IUser = {
          id: formData.email, // or a generated ID
          email: formData.email,
          dateCreated: dayjs().toISOString(),
          lastModified: dayjs().toISOString(),
          type: AccountType.OFFLINE
        };

        // Save user data in local storage (seperate from the credentials)
        saveUserDataToLocalStorage(newOfflineUserData);

        // Update Redux state with offline account data
        dispatch(updateUser(newOfflineUserData)); 
        dispatch(setSpaToken(spaToken));

        navigate(Paths.SETTINGS);
        console.log('Registration successful. Redirecting...'); // TODO logger

      } else {
        console.log("Registering in online mode");
        await register(formData).unwrap(); // api match updates redux, we dont have handle that here
        navigate(Paths.SETTINGS);
        console.log('Registration successful. Redirecting...');
      }

    } catch (error: any) {
      if (error.status === 400) {
        setEmailAlreadyExists(true);
      }
      console.error('Error during registration:', error);
    }
  }
  
  // TODO remove this!
  function autoFillDetails(){
    setFieldValue("email", "jamesprenticez@gmail.com");
    setFieldValue("password", "password123");
  }

  // Redirect if user already logged in
  // TODO update this to check for SPA token instead
  // useEffect(() => {
  //   if (user.email !== "") {
  //     navigate(Paths.SETTINGS);
  //   }
  // }, [user.email, navigate]);

  return (
    <div className="h-screen-4rem md:h-screen-5rem text-muted p-12 bg-night">
      
      <div className="w-full max-w-[460px] bg-shadow rounded mx-auto overflow-hidden">

        <div className="h-[180px] relative bg-[url('/bg.jpeg')] bg-cover">
          <div id="overlay" className="absolute bg-gradient-to-r from-fern to-moss opacity-80 inset-0"/> 
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <InfoIcon className="absolute top-2 right-2 cursor-pointer hover:text-sage" width={24} onClick={() => autoFillDetails()}/>
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
            <span className="ml-auto ">
            <Label value={isOfflineMode ? "Offline Mode" : "Online Mode"} htmlFor="offlineMode">
                <Switch id="offlineMode" checked={!isOfflineMode} onChange={() => setIsOfflineMode((prev) => !prev)} /> 
              </Label>
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
