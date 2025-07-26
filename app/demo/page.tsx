"use client"
import * as React from "react"


export default function Page() {

    React.useEffect(() => {
        
        if (
            navigator.userAgent.match(/Mobi/i) ||
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/iPhone/i)
        ) {
            alert("mobile")
        }
    }, [])

    const p1 = (tm: number) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("good, i resove after: " + tm + " ms")
            }, tm)
        })
    }

    const f1 = async () => {
        const msg1 = await p1(2000)
        console.log(msg1)
        const msg2 = await p1(2000)
        console.log(msg2)
        return 1
    }

    const a = f1()
    console.log("a: ", a)
    console.log("finish demo page")

    return (
        <>
             <h1 className="text-center text-xl font-bold">app/demo/ page</h1>
        </>
    )
}