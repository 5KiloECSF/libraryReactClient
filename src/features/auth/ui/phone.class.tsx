import React from 'react'
import firebase from '../../../Constants/firebaseConstants'

class App extends React.Component{
    state = {
        mobile: "",
        otp:""
    }
    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    // configureCaptcha = () =>{
    //
    //     // @ts-ignore
    //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //         'size': 'invisible',
    //         'callback': (response) => {
    //             // reCAPTCHA solved, allow signInWithPhoneNumber.
    //             // @ts-ignore
    //             this.onSignInSubmit();
    //             console.log("Recaptca varified")
    //         },
    //         defaultCountry: "IN"
    //     });
    // }

    // onSignInSubmit = (e) => {
    //     e.preventDefault()
    //     this.configureCaptcha()
    //     const phoneNumber = "+251" + this.state.mobile
    //
    //     console.log(phoneNumber)
    //
    //     // @ts-ignore
    //     const appVerifier = window.recaptchaVerifier;
    //     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    //         .then((confirmationResult) => {
    //             // SMS sent. Prompt user to type the code from the message, then sign the
    //             // user in with confirmationResult.confirm(code).
    //             // @ts-ignore
    //             window.confirmationResult = confirmationResult;
    //             console.log("OTP has been sent--", confirmationResult)
    //             // ...
    //         }).catch((error) => {
    //         console.log("err", error)
    //         // Error; SMS not sent
    //         // ...
    //         console.log("SMS not sent")
    //     });
    // }

    onSubmitOTP  = (e) =>  {
        e.preventDefault()

        const code = this.state.otp
        console.log(code)

        // @ts-ignore
        window.confirmationResult.confirm(code).then(async (result) => {
            // User signed in successfully.
            const user = result.user
            console.log("user =", JSON.stringify(user))
            console.log("result=>", JSON.stringify(result))

            try {
                // const auth = result.getIdToken()

                // console.log("resultIdTOken=", JSON.stringify(auth))
                const userIdToken = await result.user.getIdToken()
                // console.log("userIdToken=", JSON.stringify(userIdToken))
                console.log("userIdToken=", userIdToken)

            } catch (e) {
                console.log("tryError=", e)
            }

            alert("User is verified")
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    render() {
        return (
            <>
                {/* ---------------  form for phone authentication -------------------*/}
                <h2>Login Form</h2>
                {/*<form onSubmit={this.onSignInSubmit}>*/}
                {/*    <div id="sign-in-button"></div>*/}
                {/*    <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>*/}
                {/*    <button type="submit">Submit</button>*/}
                {/*</form>*/}

                {/* ---------------  form for Otp Verification -------------------*/}
                <h2>Enter OTP</h2>
                <form onSubmit={this.onSubmitOTP}>
                    <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
                    <button type="submit">Submit</button>
                </form>
            </>
        )
    }
}
export default App
