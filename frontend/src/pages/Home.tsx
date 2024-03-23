import { Button } from "@components/common";
import Loading from "@components/common/Loading";
import { useGetHabitsQuery } from "@redux/services";
import { useState } from "react";

function Home() {

  const [toggle, setToggle] = useState(false)
  const {data, isLoading, isError, error} = useGetHabitsQuery(undefined, {skip: toggle});

  console.log(data)

  return (
    <div className="text-primary max-w-7xl mx-auto w-full mt-12">
      <p>Home</p>

      {isLoading && (
        <Loading />
      )}

      {data && JSON.stringify(data)}
      {isError && JSON.stringify(error)}

    </div>
  )
}

export default Home;
