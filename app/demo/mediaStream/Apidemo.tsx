 "use client"

import * as React from "react"

export default function Apidemo() {
    
    const constraintList: React.Ref<HTMLUListElement> | null = React.useRef(null)
    const [constraintsState, setConstraintsState] = React.useState({})

    // const capabilityList: React.Ref<HTMLUListElement> | null = React.useRef(null)
    // const [capabilityState, setCapabilityState] = React.useState({})

    React.useEffect(() => {
        setConstraintsState(navigator.mediaDevices.getSupportedConstraints())

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                const tracks = stream.getTracks();
                tracks.map((t) => console.log(t.getCapabilities()));
        });

        // setCapabilityState(navigator.mediaDevices.getCapabilities())

        return () => {

        }
    }, [])
    return (
        <>
            <div className="flex justify-between w-full px-10 py-10">

                <ul className="mx-10 h-[200px] overflow-auto w-[200px] bg-blue-100 " ref={constraintList}>
                    {Object.keys(constraintsState).map((constraint) => (
                        <li key={constraint}>
                            {constraint}
                        </li>
                    ))}    
                </ul>
                
                <div className="flex justify-between">
                    <button className="px-5 py-2 h-10 bg-blue-500">selectAudioOutput()</button>
                </div>
                
            </div>
           
        </>
    )
}