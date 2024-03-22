import React from "react";
import { useAppSelector } from "@redux/hooks";
import { capitalizeFirstLetter, formatDate } from "@utils";
import { Button } from "@components/common";
import { useGetUserQuery } from "@redux/services";

function UserSettings() {
  const user = useAppSelector((state) => state.user.data);

  // TODO fix rtk query chache??
  useGetUserQuery(undefined, {
    skip: true
  });

  return (
    <div className="text-primary px-4">
      <div className="flex flex-col max-w-7xl w-full mx-auto mt-4 space-y-4 ">

        <div className="grid grid-cols-[128px_1fr] md:grid-cols-[192px_1fr] bg-ghost p-4 rounded-md">
          <div
            className="w-full aspect-square rounded-full border-major border-2"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              backgroundImage: `url('${user.profilePicture}')`,
            }}
          />

          <div className="p-4 overflow-hidden whitespace-nowrap text-ellipsis">
            <h1 className="text-3xl md:text-6xl bold overflow-hidden whitespace-nowrap text-ellipsis">
              {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}
            </h1>
            <h2 className="text-xl w-full text-muted overflow-hidden whitespace-nowrap text-ellipsis">
              {user.email}
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-4">

          <div className="w-full bg-ghost rounded-md p-4">  
            <h1 className="text-3xl text-muted mb-4 font-bold">Details</h1>

            <div className='grid grid-cols-2  text-2xl gap-4 '>
              <h4 className="font-bold">Subscription:</h4>
              <div className="flex">
                <p className="text-gray-400 flex">
                  {user.subscription}
                </p>
                <Button className="bg-green-600 hover:bg-green-500 ml-auto text-sm px-[6px] py-[4px]">
                  Upgrade
                </Button>
              </div>

              <h4 className="font-bold">Joined:</h4>
              <p>{formatDate(user.dateCreated)}</p>

              <h4 className="font-bold">Location:</h4>
              <p>{user.country}</p>

              <h4 className="font-bold">Phone:</h4>
              <p>{user.phone}</p>
            </div>
          </div>

          <div className="w-full md:mt-0 bg-ghost rounded-md p-4">  
            <h1 className="text-3xl text-muted mb-4 font-bold">Settings</h1>

            <div className='grid grid-cols-2 text-2xl gap-4 '>
              {/* <h4 className="font-bold">Subscription:</h4>
              <p className="text-green-600">{user.subscription}</p>

              <h4 className="font-bold">Joined:</h4>
              <p>{formatDate(user.dateCreated)}</p>

              <h4 className="font-bold">Location:</h4>
              <p>{user.country}</p>

              <h4 className="font-bold">Phone:</h4>
              <p>{user.phone}</p> */}
            </div>
          </div>
        </div>

  


      </div>
    </div>
  );
}

export default UserSettings;
