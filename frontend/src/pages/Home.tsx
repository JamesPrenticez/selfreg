import { Button } from "@components/common";
import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState(null);

  const getData = (): void => {
    fetch("http://localhost:5000/api/users", {
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
    <div className="text-[#0f0]">
    <Button variant="link" onClick={() => getData()}>
      fetch
    </Button>
    <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default Home;
