"use client"

import * as React from "react"
import DailyCallManager from "@/app/dailyco/DailyManager"

export default function Page() {
    const video_ref_local: React.Ref<HTMLVideoElement> | null = React.useRef(null)
    const audio_ref_local: React.Ref<HTMLAudioElement> | null = React.useRef(null)

    const video_ref_remote: React.Ref<HTMLVideoElement> | null = React.useRef(null)
    const audio_ref_remote: React.Ref<HTMLAudioElement> | null = React.useRef(null)

    const callManagerRef: React.Ref<DailyCallManager> | null = React.useRef(null)
    
    const join_fn = () => {
        callManagerRef.current?.joinRoom("https://linghu.daily.co/linghu_demo")
    }

    const leave_fn = () => {
        callManagerRef.current?.leaveRoom()

        if (video_ref_local.current && callManagerRef.current) {
            video_ref_local.current.srcObject = callManagerRef.current.localMedialStream
        }
    }

    React.useEffect(() => {
        if (!callManagerRef.current) {
            callManagerRef.current = new DailyCallManager()
        }

        return () => {

        }
    })

    return (
        <>
            <h1>daily co page</h1>

            <div className="flex justify-between w-full py-10 px-20">
                <div>
                    <p className="font-bold text-3xl">Local</p>
                    <video ref={video_ref_local} className="borderd border-2" width="500" height="400"></video>
                    <audio ref={audio_ref_local}></audio>
                </div>

                <div>
                    <p className="font-bold text-3xl">Remote</p>
                    <video ref={video_ref_remote} className="borderd border-2" width="500" height="400"></video>
                    <audio ref={audio_ref_remote}></audio>
                </div>
            </div>

            <div className="flex justify-between w-full py-10 px-20">
                <button onClick={join_fn} className="px-10 py-4 bg-blue-300 font-2xl">join room</button>
                <button onClick={leave_fn} className="px-10 py-4 bg-blue-300 font-2xl">leave room</button>
            </div>
        </>
    )
}