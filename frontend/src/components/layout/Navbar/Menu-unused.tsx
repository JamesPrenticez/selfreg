// function Menu({isMenuOpen}: {isMenuOpen: boolean}){
//   const user = useAppSelector((state) => state.user);

//   return (
//     <div 
//       className={`
//     bg-gray-50
//       absolute 
//       top-[45px]
//       md:top-[65px]
//       right-0
//       w-[400px]
//       h-[375px]
//       shadow-[6px_6px_6px_0px_rgba(0,0,0,0.3)]

//       rounded-md
//       p-[32px]
//       z-50
//       ${isMenuOpen  ? 'visible' : 'hidden'}
//     `}
//     >
//       {/* Triangle */}
//       <svg 
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox='0 0 60.666 55.214'
//         height={22}
//         width={24}
//         className="
//          absolute
//          fill-gray-50
//          top-[-15px]
//          right-[4px]
//          md:right-[12px]
//         "
//       >
//         <path 
//           d="M275.649,287.65,255.41,322.7a9.58,9.58,0,0,0,8.3,14.37h40.478a9.58,9.58,0,0,0,8.3-14.37L292.241,287.65A9.579,9.579,0,0,0,275.649,287.65Z" 
//           transform="translate(-253.612 -282.36)"
//           strokeMiterlimit="10" 
//         />
//       </svg>

//       <div className="bg-gray-400 cursor-pointer items-center">
//         {pages.map((item) => (
//           <MenuItem key={item._id} {...{...item}}/>
//         ))}
//       </div>

//       {userHasPermission(user.data, IUserPermissions.ADMIN) &&
//         <AdminMenuItems />
//       }


//     </div>
//   )
// }

// function MenuItem(page: INavigationItem){
//   return (
//     <NavLink
//       key={page.name}
//       to={page.url}
//       style={({ isActive }) =>
//         isActive
//           ? { color: "  #0F0" }
//           : { color: "rgb(249 250 251)" }
//       }
//     >
//       <p className="hover:text-[#0F0]">{page.name}</p>
//     </NavLink>
//   )
// }

// function AdminMenuItems(){
//   return (
//     <div>
//       <div className="bg-red-500 text-white font-bold">
//         ADMIN
//       </div>
//       <div className="flex p-2">
//         <div>
//           <p className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white rounded-md px-4 py-2" onClick={() => { 
//             persistor.purge().then(() => {
//               window.location.reload();
//             });
//            }}>PURGE</p>
//         </div>
//       </div>
//     </div>
//   )
// }