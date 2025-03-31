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

    return (
        <>
             <h1 className="text-center text-xl font-bold">app/demo/ page</h1>
        </>
    )
}