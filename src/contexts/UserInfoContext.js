import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
export const UserInfoContext = createContext();


const UserInfoContextProvider = (props) => {

 const [users, setstate] = useState();
 const [userStatus, setuserStatus] = useState();

 const fetchUsers = async () => {
  const res = await fetch("/map/aboutme", {
   crossDomain: true
  })
  return res.json();
 }

 const usersQuery = useQuery('users', fetchUsers);

 useEffect(() => {
  if (usersQuery.status === "success") {
   setstate(usersQuery.data);
  }
  setuserStatus(usersQuery.status);
  console.log("users", users)
  console.log("userstatus", userStatus)
 }, [usersQuery])

 return (
  <UserInfoContext.Provider value={{ users, userStatus }}>
   {props.children}
  </UserInfoContext.Provider>
 )

}

export default UserInfoContextProvider
