// import React, { Component } from 'react';
//
// import {firebaseConfig}  from '../../utils/firebase';
// import * as firebaseui from "firebaseui";
// import firebase from "firebase";
//
// class FirebaseUi extends Component {
//     componentDidMount() {
//         const fbase = firebase.initializeApp(firebaseConfig);
//         const uiConfig = {
//             signInSuccessUrl: "https://localhost:4000/", //This URL is used to return to that page when we got success response for phone authentication.
//             signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
//             tosUrl: "https://localhost:4000/"
//         };
//         var ui = new firebaseui.auth.AuthUI(firebase.auth());
//         ui.start("#firebaseui-auth-container", uiConfig);
//     }
//
//     render() {
//         return (
//             <>
//                 <h1>REACT PHONE AUTHENTICATION</h1>
//                 <div id="firebaseui-auth-container"/>
//             </>
//         )
//     }
// }
//
// export default FirebaseUi;