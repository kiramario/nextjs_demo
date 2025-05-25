 "use client"

import * as React from "react"

export default function RecordCamera() {
    const [recordLink, setRecordLink] = React.useState("")
    const videoRef: React.Ref<HTMLVideoElement> = React.useRef(null)
    
    React.useEffect(() => {
        setRecordLink("")
    }, [])
    
    return (
        <>
            <h1 className="text-center text-xl font-bold">app/demo/mediaStream/RecordCamera page</h1>

            <div className="relative w-[447px]">
                <video width="447" height="283" controls ref={videoRef} >
                    <source src={recordLink} type="video/mp4" />
                    您的浏览器不支持视频标签。
                </video>
                <div className="w-full absolute top-[100px] left-0 text-xl text-white text-center">
                    Recorded video feature will be coming soon
                </div>
            </div>
            
        </>
    )
}