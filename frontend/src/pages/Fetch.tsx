import { useGetHabitsQuery } from "@redux/services/habitsApi";

function Fetch() {
  const { data, error, isLoading } = useGetHabitsQuery();
  console.log(isLoading)

  return (
    <div className="text-major">
    {error ? (
      <>Oh no, there was an error</>
    ) : isLoading ? (
      <>Loading...</>
    ) : data ? (
      <>
        <h3>{JSON.stringify(data)}</h3>
      </>
    ) : null}
  </div>
  )
}

export default Fetch;


// const [data, setData] = useState(null);

// const getData = (): void => {
//   fetch("http://localhost:5000/api/habits", {
//     method: "GET",
//     headers: {},
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       setData(data);
//       console.log(data);
//     })
//     .catch((error) => console.log(error));

//     console.log("done")
// }