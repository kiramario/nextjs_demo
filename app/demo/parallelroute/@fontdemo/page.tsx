"use client"
import * as React from "react"
import localFont from 'next/font/local'
import fontStyle from  './fontdemo.module.css';


const inter = localFont({
    src: [
        {
        //   path: '../../_fonts/inter-4.1-web/Inter-Thin.woff2',
          path: '../../../../public/Inter-4.1/web/Inter-Thin.woff2',
          weight: '100',
          style: 'normal',
        },
        {
          path: '../../../_fonts/inter-4.1-web/Inter-ThinItalic.woff2',
          weight: '100',
          style: 'italic',
        },
    ]
})

export default function Page() {
    // const [msg, setMsg] = React.useState("")


    const c1 = fontStyle.inter_normal + "  text-[24px]"
    // const c2 = inter.className + " text-[24px] italic"
    return (
        <>
            <div className="border border-1 w-200 h-20">
                <p className="text-[24px]">font-inter:   without </p>
                <p className={c1}>font-inter:   with</p>
                <p className={`text-[24px] ${inter.className}`}>font-inter:   with</p>
            </div>
        </>
    )
}