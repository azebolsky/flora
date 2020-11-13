// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Switch, Route, Redirect } from 'react-router-dom';
// /* Layout Components */
// import Header from './Header';
// import Footer from './Footer';
// /* Page Level Components */
// import Home from '../pages/home';
// import Login from '../pages/login';
// import Launches from '../pages/launches';
// import { auth } from '../services/firebase';
// const StyledLayout = styled.div`
//     min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//     main {
//         flex-grow: 1;
//     }
// `;
// export default function Layout(props) {
//     const [authState, setAuthState] = useState({});
//     useEffect(() => {
//         const clearObserver = auth.onAuthStateChanged(user => {
//             if (user) {
//                 setAuthState({
//                     displayName: user.displayName,
//                     photoURL: user.photoURL,
//                     authenticated: true
//                 });
//             } else {
//                 setAuthState({
//                     displayName: null,
//                     photoURL: null,
//                     authenticated: false
//                 });
//             }
//         })
//         return () => {
//             clearObserver();
//         }
//     }, []);
//     console.log(authState)
//     return (
//         <StyledLayout>
//             <Header
//                 avatar={authState.photoURL}
//                 authenticated={authState.authenticated}
//             />
//             <main>
//                 <Switch>
//                     <Route exact path="/" render={props =>
//                         <Home {...props} />
//                     } />
//                     <Route exact path="/launches" render={props => {
//                         if (authState.authenticated) {
//                             return <Launches {...props} />
//                         } else {
//                             return <Redirect to="/login" />
//                         }
//                     }} />
//                     <Route exact path="/login" render={props =>
//                         <Login authenticated={authState.authenticated} {...props} />
//                     } />
//                 </Switch>
//             </main>
//             <Footer />
//         </StyledLayout>
//     );
// };
