import { Button } from "@components/common";
import Loading from "@components/common/Loading";
import { useGetHabitsQuery } from "@redux/services";
import { useState } from "react";

function Home() {

  const [toggle, setToggle] = useState(false)
  const {data: habitsData, isLoading, isError, error} = useGetHabitsQuery(undefined, {skip: toggle});

  const [data, setData] = useState(null);

  const getData = (): void => {
    fetch("https://selfregulator.azurewebsites.net/api/habits", {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));

      console.log("done")
  }

  return (
    <div className="text-primary max-w-7xl mx-auto w-full mt-12">
      <p>Home</p>

      {isLoading && (
        <Loading />
      )}

      {habitsData && JSON.stringify(habitsData)}
      {isError && JSON.stringify(error)}

      <Button variant="link" onClick={() => getData()}>
        Fetch
      </Button>

      {data && JSON.stringify(data)}

    </div>
  )
}

export default Home;
