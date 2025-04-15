 "use client"

import * as React from "react"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    validatePassword, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification,
    updatePassword, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider   } from "firebase/auth";

import { FirebaseApp } from '@firebase/app';
import { Auth, User } from '@firebase/auth';


const emails = [
    "test1@kiramario.com", "645364525@qq.com"
]
const passwords = [
    "abc123EF", "abc123EF"
]


export default function AuthDemo() {
    let app: FirebaseApp | null = null

    const auth: React.Ref<Auth | undefined> = React.useRef(undefined)

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAnSfRa6KjggUD0BHGMo_aHAOjMXArVR6M",
        authDomain: "fir-fe63d.firebaseapp.com",
        projectId: "fir-fe63d",
        storageBucket: "fir-fe63d.firebasestorage.app",
        messagingSenderId: "703845645457",
        appId: "1:703845645457:web:826df5de98c7a33cf05330",
        measurementId: "G-VL5RP3KKNB"
    };

    const display_user_info = (user: User) => {
        const userJson = user.toJSON()

        console.log("userJson: ")
        console.table(userJson)


        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
      
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;

        console.log(`uid = ${uid}, displayName = ${displayName}, email = ${email}, photoURL = ${photoURL}, emailVerified = ${emailVerified}`)

        user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
    }

    const signUp = async () => {
        const email = emails[1]
        alert(`start signUp:  email = ${email};  password = ${passwords[1]}`)

        const status = await validatePassword(getAuth(), passwords[1]);
        if (!status.isValid) {
            console.error("password illegal: ", status)
            return
        }

        if (auth.current) {
            createUserWithEmailAndPassword(auth.current, email, passwords[1])
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user: ", user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
    
                console.log("errorCode: ", errorCode)
                console.log("errorMessage: ", errorMessage)
            });
        } else {
            alert("FirebaseApp do not finish 'initializeApp'")
        }
    }

    const signIn = () => {
        const email = emails[1]
        alert(`sign in ${email} ${passwords[1]}`)

        if (auth.current) {
            signInWithEmailAndPassword(auth.current, email, passwords[1])
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("signIn success: ", user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("signIn errorCode: ", errorCode)
                    console.log("signIn errorMessage: ", errorMessage)
                });
        }
    }

    const signOut = () => {
        alert("signOut")
        if (auth.current && auth.current.currentUser) {
            auth.current.signOut().then((r) => {
                console.log("signOut: ", r)
            })
        }
    }

    const upateUserInfo = () => {
        alert("upateUserInfo")
        if (auth.current && auth.current.currentUser) {
            updateProfile(auth.current.currentUser, {
                displayName: "KM"
            }).then(() => {
                console.log("Profile updated!")
                // ...
            }).catch((error) => {
                console.error("Profile updated failed!: ", error)
            });
        }
    }

    const updateUserEmail = () => {
        alert("updateUserEmail")
        if (auth.current && auth.current.currentUser) {
            updateEmail(auth.current.currentUser, "user@example.com").then(() => {
                 console.log("Email updated!")
            }).catch((error) => {
                console.error("Email updated! failed", error)
            });
        }
    }

    const verifyEmail = () => {
        alert("verifyEmail")
        if (auth.current && auth.current.currentUser) {
            auth.current.languageCode = 'fr';
            sendEmailVerification(auth.current.currentUser)
                .then(() => {
                    console.log("Email verification sent!")
                });
        }
    }

    const refreshPwd = () => {
        alert("refresh password")
        if (auth.current && auth.current.currentUser) {
            updatePassword(auth.current.currentUser, "123456").then(() => {
                console.log("Email verification sent!")
            });
        }
    }

    const sendEmailAndRefreshPwd = () => {
        alert("sendEmailAndRefreshPwd")
        if (auth.current && auth.current.currentUser) {
            auth.current.languageCode = 'zh';
            sendPasswordResetEmail(auth.current, auth.current.currentUser.email!)
            .then(() => {
                console.log("consolePassword reset email sent!")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("sendEmailAndRefreshPwd! failed", errorCode)
                console.error("sendEmailAndRefreshPwd! failed", errorMessage)
            });
        }
    }

    const removeUser = () => {
        alert("removeUser")
        if (auth.current && auth.current.currentUser) {
            deleteUser(auth.current.currentUser).then(() => {
                console.log("User deleted.")
            }).catch((error) => {
                console.error("removeUser failed", error)
            });
        }
    }

    const reCredential = () => {
        alert("reCredential")
        if (auth.current && auth.current.currentUser) {
            // const credential = auth.current.currentUser.

            const credential = EmailAuthProvider.credential(
                auth.current.currentUser.email!,
                passwords[1]
            )

            reauthenticateWithCredential(auth.current.currentUser, credential).then(() => {
                console.log("User re-authenticated.")
            }).catch((error) => {
                console.error("reCredential failed: ", error)
            });
        }
    }


    const showCurrentUserState = () => {
        alert("start showCurrentUserState")
        if (auth.current && auth.current.currentUser) {
            
            display_user_info(auth.current.currentUser)
        } else {
            console.log("no active user")
        }
    }

    React.useEffect(() => {
        
        // Initialize Firebase
        app = initializeApp(firebaseConfig);
        // const analytics = getAnalytics(app);
        auth.current = getAuth(app);

        onAuthStateChanged(auth.current, (user) => {
            if (user) {
                const uid = user.uid;
                alert(`user uid: ${uid}`)
                console.log(user)
            } else {
                alert("user sign out")
            }
        });


        return () => {

        }
    }, [])

    return (
        <>
            <div className="flex justify-between w-full px-10 py-10">
                <span onClick={signUp} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    signUp
                </span>

                <span onClick={signIn} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    signIn
                </span>

                <span onClick={signOut} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    signOut
                </span>
                

                <span onClick={upateUserInfo} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    upateUserInfo
                </span>
                
                <span onClick={updateUserEmail} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    updateUserEmail
                </span>


                <span onClick={verifyEmail} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    verifyEmail
                </span>


                <span onClick={refreshPwd} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    refreshPwd
                </span>
                
                <span onClick={sendEmailAndRefreshPwd} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    sendEmailAndRefreshPwd
                </span>

                <span onClick={removeUser} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    removeUser
                </span>
                
                <span onClick={reCredential} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    reCredential
                </span>
                
                <span onClick={showCurrentUserState} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] select-none">
                    showUserState
                </span>
                
            </div>
        </>
    )
}