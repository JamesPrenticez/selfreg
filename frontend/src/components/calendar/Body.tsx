import React, { ReactNode } from 'react'
import dayjs from 'dayjs'


function Body() {

  const currentDate = dayjs(); // Get current date using dayjs
  const currentMonth = currentDate.month(); // Get current month (0-11)
  const currentYear = currentDate.year(); // Get current year

  const monthsToShow: "Q1" | "Q2" | "Q3" | "Q4" = "Q1" ; // Show calendar for three months
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

  const getMonths = (monthsToShow: string) => {
    if(monthsToShow === "Q1") return ["Jan", "Feb", "Mar"]
    if(monthsToShow === "Q2") return ["Apr", "May", "Jun"]
    if(monthsToShow === "Q3") return ["Jul", "Aug", "Sep"]
    if(monthsToShow === "Q4") return ["Oct", "Nov", "Dec"]
    if(monthsToShow === "All") return daysOfWeek
    return ""
  }  

  // const getDays = (month: string) => {
  //   return [
  //     {id: 1, date: ""}
  //   ]
  // }

  
  // {id: number, date: string}
  const getDays = (year: string, month: string) =>  {
    const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth(); // Get the number of days in the month
    const firstDayOfMonth = dayjs(`${year}-${month}-01`).day(); // Get the starting day of the week (0-6)
    // console.log(firstDayOfMonth)
  
    const daysArray = [];
  
    // Fill in the empty slots for the days before the 1st day of the month
    for (let i = 0; i < 42; i++) {
      if (i < firstDayOfMonth || i >= (daysInMonth + firstDayOfMonth)) {
        daysArray.push({
          id: i,
          date: ""
        });
      } else {
        const date = dayjs(`${year}-${month}-${i - firstDayOfMonth + 1}`).format('YYYY-MM-DD');
        daysArray.push({
          id: i,
          date: date
        });
      }
    }
  
    return daysArray;
  };

  const getAllMonthsDays = (year: string) => {
    const allMonths: { month: string; days: Array<{ id: number; date: string | number }> }[] = [];
  
    for (const month of months) {
      allMonths.push({ month, days: getDays(year, month) });
    }
  
    return allMonths;
  };
  


const myYear = "2024";
const myMonths = getMonths("All");
const myDays = getDays(myYear, myMonths[0]);
const myCalendar = getAllMonthsDays("2024")
// console.log(myCalendar)

  return (
<div className='flex flex-col gap-[8px] p-[24px]'>

  <h1 className='text-muted text-4xl font-bold'>Q1 {myYear}</h1>




  <table style={{
    width: '100%',
    border: '1px solid #0f0',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }}>

    <thead>
      <TRow className="ml-[100px] bg-red-500]">
        {daysOfWeek.map((day, index) => (
          <th 
          key={index}
          className='bg-primary'
          >
            {day}
          </th>
        ))}
      </TRow>
    </thead>

    <tbody>
        {myCalendar.map((month: any, days: any, index: any) => {
          const currentmonth = dayjs().month(month.month).format("MMM")

          return (
          <div className=' relative pl-[100px] ' >

            <h1 className='absolute top-[50%] -left-[50px] text-center w-[200px] text-4xl transform rotate-[270deg] border'>
              {currentmonth}
            </h1>

          <TRow>
          {month.days.map((day: any, index: any) => (
            <td 
              key={index}
              // className='bg-primary'
              style={{
                backgroundColor: day.date === "" ? "red" : "rgb(16 16 16)"
              }}
              >
              <div className='h-32 p-4'>
                <p className='font-bold'>{day.id}</p>
                {/* <p className='font-bold'>{day.date}</p> */}
              </div>
            </td>
          ))}
          </TRow>

          </div>  
          )}
        )}
    </tbody>

  </table> 

</div>

  )
}


interface TRowProps {
  className?: string;
  children: ReactNode;
}

const TRow = ({className, children}: TRowProps) => {
  return (
    <tr
    className={className}
    style={{
      display: 'grid',
      gap: '1px',
      paddingLeft: '1px',
      backgroundColor: "#0f0",
      gridTemplateColumns: 'repeat(7, 1fr)',
    }}>
      {children}
    </tr>
  )
}

export default Body;

