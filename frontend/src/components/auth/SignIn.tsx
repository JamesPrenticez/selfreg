import React, {type ReactElement} from 'react'

interface Props {
  providers?: any[];
  csrfToken?: string;
}

const SignIn = ({
  providers = ["github", "facebook"],
  csrfToken
}: Props): ReactElement => {

  const login = (): void => {}

  return (
    <>
    <div className="h-screenNav w-full flex flex-wrap justify-center items-center">
      <div className="h-5/6 w-5/6 border border-gray-600 rounded">
          <div className="flex flex-wrap justify-center h-1/4 w-full">
            <div className="h-1/4 w-2/4 p-3 full-rounded">
              <img
                  src={'/icon_green.svg'}
                  className="rounded-full"
                  width="1000px"
                  height="1000px"
                  alt=""
              />
            </div>
          </div>

          <form 
                method="post"
                action="/api/auth/callback/credentials"
                className="w-full p-4"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <label className="text-green-600 font-bold">
              Username:
              <input name="username" type="text" className="w-full mb-2 p-1 bg-transparent border border-gray-600 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
            </label>
           
            <label className="text-green-600 font-bold">
              Password:
              <input name="password" type="password" className="w-full mb-6 p-1 bg-transparent border border-gray-600 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
            </label>

            <button 
              type="submit"
              className="w-full border border-gray-600 hover:border-green-600 hover:text-green-600 text-base text-white p-2 rounded"
            >
              
              Sign in
            </button>
          </form>

          <div className="flex items-center">
            <div className="h-px flex-1 bg-green-600"></div>
            <p className="pl-2 pr-2">or</p>
            <div className="h-px flex-1 bg-green-600"></div>
          </div>

          <div className="flex flex-wrap justify-center w-full p-4">
            {Object.values(providers).map((provider, index) => (
              <div key={index} className="mt-2 p-2 border border-gray-600 rounded w-full text-center">
                <button onClick={() => { login() }}>
                  Sign in with 
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn