"use client"

import * as React from "react"

export const ShowAllLayout = React.createContext<boolean>(true);

const Default_Layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const show = React.useContext(ShowAllLayout)

    const return_fn = () => {
        if (show) {
            return (
                <>
                    <h2 className="bg-cyan-200">This is the app/demo layout</h2>
                    {children}
                </>
            )
        } else {
            return (
                <>
                    {children}
                </>
            )
        }
    }


    return (
        <>
            {return_fn()}
        </>
    )
}



export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    
    
    return (
        <>
            <ShowAllLayout.Provider value={false}>
                <Default_Layout children = {children}/>
            </ShowAllLayout.Provider>
        </>
    )
}