"use client"

import * as React from "react"

export default function MicroPhoneAndSpeaker() {
    const [devices, setDevices]: [devices: MediaDeviceInfo[], (_: MediaDeviceInfo[]) => void] = React.useState([] as MediaDeviceInfo[])
    const [mpId, setMpId] = React.useState("")
    const [recordState, setRecordState] = React.useState("idel")
    const [hClass, setHClass] =  React.useState(true)

    const mediaRecorder: React.Ref<MediaRecorder | undefined> = React.useRef(undefined)
    const audiochunks: React.Ref<Blob[]> = React.useRef([] as Blob[])
    const audioeRef: React.Ref<HTMLAudioElement> = React.useRef({} as HTMLAudioElement)
    const download_ref: React.Ref<HTMLAnchorElement> | undefined = React.useRef(null)

    const filter_vdi = () => devices.filter((dinfo) => dinfo.kind == "videoinput")

    const filter_adi = () => devices.filter((dinfo) => dinfo.kind == "audioinput")

    const filter_ado = () => devices.filter((dinfo) => dinfo.kind == "audiooutput")

    const getAudioDevices = async () => {
        await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevice = devices.find((device) => device.kind === "audiooutput");

        // console.log(devices)
        console.log(audioDevice)
        setDevices(devices)
    }

    React.useEffect(() => {
        getAudioDevices()
    }, [])

    const mpInpOnchange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setMpId(target.value)
    }

    const refresh_audiochunks = async () => {
        audiochunks.current = []
    }

    const start_click = async () => {
        // console.log(`audiochunks len = ${audiochunks.current!.length}`)
        const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: mpId
            },
            video: false
        });

        // var options = {
        //     audioBitsPerSecond : 128000,
        //     mimeType : 'audio/ogg'
        // }
        // mediaRecorder.current = new MediaRecorder(audioStream, options);

        mediaRecorder.current = new MediaRecorder(audioStream);
        mediaRecorder.current.start()

        setRecordState(mediaRecorder.current.state)

        // 感觉要远程接收才用得上srcObject，mediaTrack其实是不是不包含任何数据
        // const stream = new MediaStream([...mediaRecorder.current!.stream.getAudioTracks()])
        // console.log(mediaRecorder.current!.stream.getAudioTracks())
        // audioeRef.current!.srcObject = stream

        mediaRecorder.current!.ondataavailable = function(e: BlobEvent) {
            audiochunks.current!.push(e.data);
        };

        mediaRecorder.current!.onstop = async () => {
            setRecordState(mediaRecorder.current!.state)
            // console.log(`stop audiochunks len = ${audiochunks.current!.length}`)


            // const blob_type = { type: "audio/ogg; codecs=opus" }
            const blob_type = {type: 'audio/mpeg-3; codecs=MPEG-1 Audio Layer III' }
            const blob = new Blob(audiochunks.current!, blob_type);
            const audioURL = window.URL.createObjectURL(blob);

            // await audioeRef.current!.setSinkId("2af8392e7d726a5b29a6ea38de5903a944f40ac767969ce5192b096b0caf0089"); //  输出设备
            audioeRef.current!.src = audioURL;

            if (download_ref.current) {
                download_ref.current.href = audioURL
            }


            audioeRef.current!.play()
        }; 
    }

    const start_play = async () => {
        mediaRecorder.current!.stop()
    }

    const speech_rec = async () => {
        const form_data = new FormData()
        form_data.append("audio_file", new Blob(audiochunks.current!, { 'type' : 'audio/wav; codecs=MS_PCM' }))


        const options = {
            method: 'POST',
            // headers:  {
            //     "Content-Type": "multipart/form-data"
            // },
            // body: JSON.stringify({
            //     "audio": "auido_name.wav"
            // })
            body: form_data
        };

        fetch(`/api/in2urheart/ai/stt`, options)
            .then(response => response.json())
            .then(response => {
                console.log("[microPhoneAndSpeaker speech_rec] response: ", response)
                // console.log(`${response.status_code}, ${response.status} , ${response.message}, ${response.data}`)
            })
            .catch(err => console.error("[microPhoneAndSpeaker speech_rec] error: ", err));
    }

    return (
        <div className="mt-20">
            
            <div className="w-2/3">
                <h2 onClick={() => setHClass(!hClass)}>
                    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 ">
                        <span>Toggle device ids</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                    </button>
                </h2>
                <div className={ hClass ? "hidden": "block" } >
                    <p className="bg-gray-200 font-bold">video input</p>
                    <ul>
                        {filter_vdi().map((mdi, index) => {
                            return (
                                <li key={index}>device_id: {mdi.deviceId}; label: {mdi.label}</li>
                            )
                        })}
                    </ul>

                    <p className="bg-gray-200 font-bold">audio input</p>
                    <ul>
                        {filter_adi().map((mdi, index) => {
                            return (
                                <li key={index}>device_id: {mdi.deviceId}; label: {mdi.label}</li>
                            )
                        })}
                    </ul>

                    <p className="bg-gray-200 font-bold">audio output</p>
                    <ul>
                        {filter_ado().map((mdi, index) => {
                            return (
                                <li key={index}>device_id: {mdi.deviceId}; label: {mdi.label}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            

            <form className="w-1/4 border-1 border-gray-300 p-5 relative my-5 ml-5">
                <audio ref={audioeRef} className="ml-10 w-[400px] h-[50px] border border-1"></audio>
                <span className="bg-blue-100 text-blue-800 text-[16px] font-medium me-2 px-4 py-0.5 rounded-lg absolute top-0 right-0">{recordState}</span>

                <div className="grid gap-6 mb-6">
                    <div>
                        <label htmlFor="audio_devId" className="block mb-2 text-sm font-bold text-gray-900">audio deviceID</label>
                        <input onChange={mpInpOnchange} type="text" id="audio_devId" value={mpId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                </div>
            </form>
            
            <button onClick = {refresh_audiochunks} className="cursor-pointer bg-teal-500 px-5 py-2">refresh audiochunks</button>
            <button onClick = {start_click} className="cursor-pointer bg-blue-200 px-5 py-2">start record audio</button>
            <button onClick = {start_play} className="cursor-pointer bg-blue-400 px-5 py-2">stop and play</button>
            <a href="#" ref={download_ref} className="cursor-pointer bg-blue-600 px-5 py-2 text-[#fff]" download="media_stream_audio.mp3">download audio</a>

            <button onClick = {speech_rec} className="cursor-pointer bg-cyan-200 px-5 py-2">fastapi server SST</button>
        </div>
    )
}


/*
  Sick? Definitely!
*/

// var isPlaying = false;
// var audioContext;
// var mooSound;
// var gainNode;
// var reverbNode;
// var pannerNode;
// var π = Math.PI;
// var tick = 3/2*π;
// var updateTime = 200;
// var timeForOneRev = 30000;
// // From 0 to 2π should take timeForOneRev ms
// var increaseFactor = (π * 2) / (timeForOneRev / updateTime);

// function updatePanValue() {
//   if(isPlaying) {
//     var panValue = Math.sin(tick);
//     pannerNode.pan.value = panValue;

//     var gainValue = (Math.cos(tick) / 2 + 0.5) * 0.9 + 0.1;
//     gainNode.gain.value = gainValue;
//   }
//   tick += increaseFactor;
// }

// // http://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
// function base64ToArrayBuffer(base64) {
//     var binaryString = window.atob(base64);
//     var len = binaryString.length;
//     var bytes = new Uint8Array(len);
//     for (var i = 0; i < len; i++)        {
//         bytes[i] = binaryString.charCodeAt(i);
//     }
//     return bytes.buffer;
// }

// function initSound() {
//   if (audioContext) {
//     return;
//   }
//   audioContext = new AudioContext();
  
//   // soundData is defined in another Pen
//   // It is an ogg file encoded as a Data URI
//   // (MIME type plus base64 string).
//   mooSound = new Audio(mooSoundDataUri);
  
//   mooSound.crossOrigin = "anonymous";
//   mooSound.loop = true;
//   var source = audioContext.createMediaElementSource(mooSound);

//   // The gain node lets us toggle sound on/off,
//   // but we also use it to increase volume when
//   // the object is near and decrease volume when
//   // far away.
//   gainNode = audioContext.createGain();
//   gainNode.gain.value = 0;
  
//   reverbNode = audioContext.createConvolver();
//   // impulseResponse is defined in another Pen
//   // It's a base64 encoded string.
//   // Convert it to a binary array first
//   var reverbSoundArrayBuffer = base64ToArrayBuffer(impulseResponse);
//   audioContext.decodeAudioData(reverbSoundArrayBuffer, 
//     function(buffer) {
//       reverbNode.buffer = buffer;
//     },
//     function(e) {
//       alert("Error when decoding audio data" + e.err);
//     }
//   );

//   // Pans the sound left/right. Synced with the
//   // object's screen position.
//   pannerNode = audioContext.createStereoPanner();
  
//   // Connect the audio chain together
//   source.connect(gainNode);
//   gainNode.connect(pannerNode);
//   pannerNode.connect(reverbNode);
//   reverbNode.connect(audioContext.destination);
  
//   mooSound.play();
//   var intervalId = setInterval(updatePanValue, updateTime);
// }

// function toggleSound(toggleButton) {
//   isPlaying = !isPlaying;
//   if(isPlaying) {
//     toggleButton.innerHTML = "<h3>Stop sound!</h3>";
//   } else {
//     gainNode.gain.value = 0;
//     initSound();
//     toggleButton.innerHTML = "<h3>Start sound</h3>";    
//   }
// }

// function random(max) {
//   return Math.floor(Math.random() * max);
// }

// function addStar(type, zIndex) {
//   var div = document.createElement("div");
//   div.classList.add("star", type);
//   div.style.top = random(window.innerHeight) + "px";
//   div.style.zIndex = zIndex;
//   document.body.appendChild(div);
// }

// function initGraphics(){
//   for(var i = 0; i < 20; ++i) {
//     var delay = i * 333;
//     window.setTimeout(addStar, delay, "small", -200);
//     window.setTimeout(addStar, delay + 333, "medium", -100);
//     window.setTimeout(addStar, delay + 666, "big");
//   }
// }


// initSound();
// initGraphics();

