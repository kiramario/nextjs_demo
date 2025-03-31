"use client"

import * as React from "react"
import { MediaDeviceMenu, TrackToggle, useMediaDevices, VideoConference, LiveKitRoom } from '@livekit/components-react';
import useRenderCount from "@/_components/RenderCount"
import RoomInfoTable from "@/_components/livekit/RoomInfo"
import { PreJoin, LocalUserChoices } from "@/_components/livekit/PreJoin"
import RoomSetting from "@/_components/livekit/RoomSetting"

function generateRoomId(): string {
    return `${randomString(4)}-${randomString(4)}`;
}

function randomString(length: number): string {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function Meeting() {
    const [roomid, setRoomid] = React.useState("")
    const audio_devices = useMediaDevices({ kind: "audioinput" });
    const video_devices = useMediaDevices({ kind: "videoinput" });
    const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(undefined);
    
    React.useEffect(() => {
        setRoomid(generateRoomId())

        return () => {
            
        }
    }, [])

    // Fixm: 还是重新渲染了，如何解决
    const room_setting = React.useMemo(() => <RoomSetting setPreJoinChoices={setPreJoinChoices} />, []);

    return (
        <>
            <div className="bg-gray-300 w-full h-full px-10 mt-5">
                <p className="text-center">Meeting room</p>
                <div className="flex justify-between">
                    <div className="flex justify-between">
                        <RoomInfoTable roomid={roomid} audio_devices={audio_devices} video_devices={video_devices}/>
                        {room_setting}
                    </div>
                    
                    <div>
                        {
                            preJoinChoices 
                            ? 
                                <LiveKitRoom className="flex flex-col h-full w-full"
                                serverUrl={"wsUrl"}
                                token={"token"}
                                onError={(e) => {
                                    console.error(e);
                                }}>
                                    <VideoConference />
                                </LiveKitRoom>
                            : 
                                <PreJoin />
                        }
                    </div>
                </div>
                
            </div>
        </>
    )
}