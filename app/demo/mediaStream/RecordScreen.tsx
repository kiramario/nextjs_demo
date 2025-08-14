 "use client"

import * as React from "react"

export default function RecordScreen() {
    const recorder: React.RefObject<MediaRecorder> = React.useRef({} as MediaRecorder)
    const data: React.RefObject<Blob[]> = React.useRef([])

    const video_ref: React.Ref<HTMLVideoElement> | undefined = React.useRef(null)
    const out_video_ref: React.Ref<HTMLVideoElement> | undefined = React.useRef(null)
    const download_ref: React.Ref<HTMLAnchorElement> | undefined = React.useRef(null)

    React.useEffect(() => {
        navigator.mediaDevices.getDisplayMedia(
            {
                video: true,
                // {
                //      displaySurface: "monitor", // browser monitor
                // }, 
                audio: true,
                // monitorTypeSurfaces: "include"
            } 
        ).then(async (a) => {
            // For recording the mic audio 
            const audio = await navigator.mediaDevices.getUserMedia({audio: true, video: false }) 

            // Assign the recorded mediastream to the src object
            if (video_ref.current) {
                video_ref.current.srcObject = a;
            }
            
            // Combine both video/audio stream with MediaStream object 
            const combine = new MediaStream([...a.getTracks(), ...audio.getTracks()])

             /* Record the captured mediastream  with MediaRecorder constructor */
             recorder.current = new MediaRecorder(combine); 

             initListener()
        })

        

        return () => {
            
        }
    }, [])

    const initListener = () => {
        /* Push the recorded data to data array when data available */
        recorder.current.ondataavailable = (e) => {
            data.current.push(e.data); 
        };

        recorder.current.onstop = () => {
            /* Convert the recorded audio to blob type mp4 media */
            const blobData = new Blob(data.current, { type: 'video/mp4' }); 
            // Convert the blob data to a url 
            const url = URL.createObjectURL(blobData) 
            // Assign the url to the output video tag and anchor
            if (out_video_ref.current) {
                out_video_ref.current.src = url
            }

            if (download_ref.current) {
                download_ref.current.href = url
            }
        }; 
    }

    const start_recording = () => {
        recorder.current.start()
    }

    const stop_recording = () => {
        recorder.current.stop()
    }

    const start_recording_and_stop_in_future = () => {
        recorder.current.start()
        setTimeout(
            () => {
                recorder.current.stop()
                alert("stop record")
            }, 
            3600000
            // 60000
        );
    }

    const show_record = () => {

    }
    
    return (
        <>
            <div className="float-left"> 
                <video className="" ref={video_ref} autoPlay muted width="500px" 
                    height="500px"></video>

                <div className="mt-5">
                    <button onClick={start_recording} className="bg-blue-400 rounded-xl px-5 py-1 mr-1 text-[#fff] cursor-pointer hover:ring-4 hover:ring-blue-300">Start Recording</button>
                    <button onClick={stop_recording} className="bg-cyan-600 rounded-xl px-5 py-1 mr-1 text-[#fff] cursor-pointer hover:ring-4 hover:ring-cyan-500">Stop Recording</button>
                    <button onClick={start_recording_and_stop_in_future} className="bg-cyan-600 rounded-xl px-5 py-1 mr-1 text-[#fff] cursor-pointer hover:ring-4 hover:ring-cyan-500">Start Stop</button>
                    <a href="#" ref={download_ref} download="media_stream_recording.mp4" className="bg-emerald-700 rounded-xl px-5 py-1 text-[#fff] cursor-pointer hover:ring-4 hover:ring-emerald-600">Download</a>
                </div>
            </div> 
            <div>
                <h1></h1> 
                <video className="" autoPlay controls width="500px" 
                    height="500px"></video> 
                <button onClick={show_record} className="bg-rose-200 rounded-xl px-5 py-1 mr-1 text-[#fff] cursor-pointer hover:ring-4 hover:ring-rose-100">show record</button>
                
                
            </div> 
        </>
    )
}