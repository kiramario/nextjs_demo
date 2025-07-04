 "use client"

import * as React from "react"
import { createClient } from '@supabase/supabase-js'

export default function Supabase() {

    const supabaseUrl = 'https://pvypfqfbpfroctakknoy.supabase.co'
    const supabaseKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eXBmcWZicGZyb2N0YWtrbm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyODg2MjQsImV4cCI6MjA2Njg2NDYyNH0.ldhBEKNxmGgKEnGmjJ8KYZmYFiak6E5gFyegpNExhJo"
    const supabase = createClient(supabaseUrl, supabaseKey)

    const email_signup = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: '645364525@qq.com',
            password: 'abcECD@123',
            options: {
                emailRedirectTo: 'http://127.0.0.1:3001/demo/ai_chat',
            },
        })
    }


    const email_signin = async () => {
        const sign_res = await supabase.auth.signInWithPassword({
            email: '645364525@qq.com',
            password: 'abcECD@123',
        })
        console.log("sign_res: ", sign_res)
        if (!!sign_res.error) {
            alert(sign_res.error.code)
        }
    }

    const github_signin = async () => {
        const sign_res = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                scopes: 'repo gist notifications'
            }
        })
        console.log("sign_res: ", sign_res)
        if (!!sign_res.error) {
            alert(sign_res.error.code)
        }
    }


    React.useEffect(() => {
        

        return () => {

        }
    }, [])

    return (
        <>
            <div className="flex justify-start flex-wrap w-full px-10 py-10">
                
                <span onClick={email_signup} className="cursor-pointer block bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px]  mr-[10px] select-none">
                    email_signUp
                </span>

                <span onClick={email_signin} className="cursor-pointer block  bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px]  mr-[10px] select-none">
                    email_signin
                </span>

                <span onClick={github_signin} className="cursor-pointer block  bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px]  mr-[10px] select-none">
                    github_signin
                </span>
            </div>
        </>
    )
}