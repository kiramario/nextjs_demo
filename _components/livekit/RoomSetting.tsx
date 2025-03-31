"use client"

import * as React from "react"
import { LocalUserChoices } from "@/_components/livekit/PreJoin"
import { useForm, SubmitHandler } from "react-hook-form"
import { MediaDeviceMenu, TrackToggle, useMediaDevices } from '@livekit/components-react';
import {
    LocalAudioTrack,
    LocalVideoTrack,
    Track,
    VideoPresets,
    createLocalAudioTrack,
    createLocalVideoTrack,
} from 'livekit-client';

export default function RoomSetting(
    {
        setPreJoinChoices
    }:
    {
        setPreJoinChoices: (c: LocalUserChoices) => void
    }
) {
    const renderCount = React.useRef(0)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LocalUserChoices>()

    const [newChoice, setNewChoice] = React.useState({} as LocalUserChoices)

    const onSubmit: SubmitHandler<LocalUserChoices> = (data) => {
        console.log(data)
        const newChoice: LocalUserChoices = {
            username: data.username,
            videoEnabled: (data.videoDeviceId.length > 0) ? true : false,
            audioEnabled: (data.audioDeviceId.length > 0) ? true : false,
            videoDeviceId: data.videoDeviceId,
            audioDeviceId: data.audioDeviceId,
            language: "anonymous"
        }
        setPreJoinChoices(newChoice)
    }


    console.log("RoomSetting render count: " , renderCount.current++)

    return (
        <>
        <div>

            <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <input type="text" {...register("username", { required: true })}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="username" />
                </div>

                <div className="mb-2">
                    <input type="text" {...register("videoDeviceId")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="video device id"  />
                </div>
                <div className="mb-2">
                    <input type="text" {...register("audioDeviceId")}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="audio device id" />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Set</button>
            </form>

            <TrackToggle
                initialState={false}
                source={Track.Source.Microphone}
                onChange={(enabled) => console.log(enabled)}
            >
                {"audio kind"}
            </TrackToggle>

            <MediaDeviceMenu
              initialSelection={""}
              kind="audioinput"
              onActiveDeviceChange={(_, deviceId) => {
                console.log('audioinput chanaged', deviceId);
              }}
              disabled={false}
            >
                <span className="cursor-pointer bg-purple-100 px-2 py-1 rounded-lg ml-1">audio list</span>
            </MediaDeviceMenu>

            <TrackToggle
                initialState={false}
                source={Track.Source.Camera}
                onChange={(enabled) => console.log(enabled)}
            >
                {"camera kind"}
            </TrackToggle>

            <MediaDeviceMenu
              initialSelection={""}
              kind="videoinput"
              onActiveDeviceChange={(_, deviceId) => {
                console.log('videoinput chanaged', deviceId);
              }}
              disabled={false}
            >
                <span className="cursor-pointer bg-purple-100 px-2 py-1 rounded-lg ml-1">camera list</span>
            </MediaDeviceMenu>
        </div>
            
        </>
    )
}