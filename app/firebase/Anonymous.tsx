 "use client"

import * as React from "react"
import { FirebaseApp, initializeApp } from '@firebase/app';
import { getAuth, signInAnonymously, Auth, User, onAuthStateChanged, UserCredential, EmailAuthProvider, 
    EmailAuthCredential, linkWithCredential  } from "firebase/auth";

export default function Anonymous() {
    let app: FirebaseApp | null = null
    const auth: React.Ref<Auth | undefined> = React.useRef(undefined)
    const current_user: React.Ref<User | undefined> = React.useRef(undefined)
    const current_usercredential: React.Ref<UserCredential | undefined> = React.useRef(undefined) 
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('abc@WWW123');

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
        authDomain: "127.0.0.1",
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
    };

    React.useEffect(() => {
            
        // Initialize Firebase
        app = initializeApp(firebaseConfig);
        // const analytics = getAnalytics(app);
        auth.current = getAuth(app);

        onAuthStateChanged(auth.current, async (user) => {
            console.log("onAuthStateChanged")
            if (user) {
                current_user.current = user
            } else {
                alert("user sign out")
            }
        });

        return () => {

        }
    }, [])

    const anonymouse_register = () => {
        alert("anonymouse_register")
        current_usercredential.current = undefined

        if (auth.current!!!) {
            signInAnonymously(auth.current)
                .then((userCredential: UserCredential) => {
                    console.log("set anonymouse_register")
                    current_usercredential.current = userCredential
                })
            .catch((error) => {
                console.log("error: ", error)
            });
        }
    }

    const show_current_user = async () => {
        if (current_user.current!!!) {
            console.log(">>>>current_user.current not null<<<<")
            const user: User = current_user.current;
            
            const id_token = await user.getIdToken()
            const id_token_result = await user.getIdTokenResult()

            console.log("user id_token: ", id_token)
            console.log("user id_token_result: ", id_token_result)
            console.log("user toJSON: ", user.toJSON())
            console.log("user: ", user)
        }

        if (current_usercredential.current!!!) {
            console.log(">>>>current_usercredential.current not null<<<<")
            console.log(current_usercredential.current)
        }
    }

    const anonymouse_swtich_to_standard = async () => {
        const credential: EmailAuthCredential = EmailAuthProvider.credential(email, pass);
        console.log("anonymouse_swtich_to_standard res: ")
        console.log(credential.toJSON()) // {email: 'anonymous@xxx1.com', password: 'abc@WWW123', signInMethod: 'password', tenantId: null}

        if (auth.current!!!) {
            linkWithCredential(auth.current.currentUser!, credential)
            .then((usercred: UserCredential) => {
                const user = usercred.user;
                console.log("Anonymous account successfully upgraded: ", user);
            }).catch((error) => {
                console.log("Error upgrading anonymous account", error);
            });
        }
    }

    return (
        <>
        <div className="flex justify-start w-full px-10 py-10">
            <span onClick={show_current_user} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px]  mr-[10px] select-none">
                show Current User
            </span>

            <span onClick={anonymouse_register} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px]  mr-[10px] select-none">
                anonymouse_register
            </span>
        </div>

        <div className="w-fit flex-col justify-between px-10 py-10">
            <div>
                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900">Emial</label>
                <input type="text" id="Email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  />
            </div>
            <div>
                <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="text" id="Password" value={pass} onChange={e => setPass(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   />
            </div>
            <span onClick={anonymouse_swtich_to_standard} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px]  mr-[10px] select-none">
                anonymouse_switch_to_standard
            </span>
        </div>
        
           
        </>
    )
}