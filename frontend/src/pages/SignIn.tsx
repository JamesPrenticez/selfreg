import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { type UserState, setDemoUser } from "@redux/slices/userSlice";
import { IUser } from "@models";
import { generateFakeObjectId } from "@utils";

import { 
  Label,
  InputText
} from "@components/ui";
import { Button } from "@components/common";
import { InfoIcon } from "@components/icons";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [demoAccountUsername, setDemoAccountUsername] = useState<IUser["email"]>("");

  const handleDemoAccountLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const fakeId = generateFakeObjectId();

    const demoUser: UserState["data"] = {
      _id: fakeId,
      email: demoAccountUsername,
      firstName: "",
      lastName: "",
      locale: "",
      permissions: [],
    };

    dispatch(setDemoUser(demoUser))

    // redirect after login
    navigate(`/user/${fakeId}/habits`, { replace: true })
  };

  return (
    <div className="h-screen-4rem md:h-screen-5rem full flex justify-center text-muted">
      <div className="w-full max-w-[400px] border bg-ghost border-major/50 rounded md:my-12 p-6">
        <div className="flex items-center justify-center h-[120px] full-rounded">
          <Link to="/">
            <img src={"/logo.svg"} className="rounded-full" width="120px" height="120px" alt="" />
          </Link>
        </div>

        <form className="mt-6" onSubmit={handleDemoAccountLogin}>

        <h1 className="text-3xl text-center font-bold mb-6">Sign In</h1>

        <div className="flex">
          <h2 className="text-lg font-bold mb-2">Demo Account</h2>
          <span className="ml-auto text- cursor-pointer"><InfoIcon width={24}/></span>
        </div>

        <Label value="Email:" htmlFor="email">
          <InputText id="email" placeholder="example@email.com" value={demoAccountUsername} onChange={(e) => setDemoAccountUsername(e.target.value)} required />
        </Label>

        <Button 
          color="success"
          className="w-full mt-6"
        >
          Sign In
        </Button>

        <div className="flex items-center my-6">
          <div className="h-px flex-1 bg-secondary" />
          <p className="pl-2 pr-2">or</p>
          <div className="h-px flex-1 bg-secondary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h1>
          <p>We will email you when we are ready to launch user accounts, where data will be stored and accessable accross multiple devices</p>
        </div>
        <Button 
          color="minor"
          className="w-full mt-6"
        >
          Subscribe
        </Button>


        </form>
      </div>
    </div>
  );
}

export default SignIn;
