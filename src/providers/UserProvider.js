// import React, { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase";

// export const UserContext = createContext({ user: null });
// const UserProvider = (props) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged((userAuth) => {
//       setUser(userAuth);
//     });
//   });

//   return (
//     <div>
//       <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
//     </div>
//   );
// };

// export default UserProvider;
