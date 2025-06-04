"use client"

import * as React from "react"

export default function RtcRecord() {
    // 等待 3 秒
    const sleep = (m: number) => new Promise(r => setTimeout(r, m));

    function getRandomString() {
        if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
            var a = window.crypto.getRandomValues(new Uint32Array(3)),
                token = '';
            for (var i = 0, l = a.length; i < l; i++) {
                token += a[i].toString(36);
            }
            return token;
        } else {
            return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
        }
    }

    function getFileName(fileExtension: string) {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var date = d.getDate();
        return 'RecordRTC-' + year + month + date + '-' + getRandomString() + '.' + fileExtension;
    }


    const [recordState, setRecordState] = React.useState("idel")
    const audiochunks: React.Ref<Blob[]> = React.useRef([] as Blob[])
    const audioeRef: React.Ref<HTMLAudioElement> = React.useRef({} as HTMLAudioElement)
    const aRef: React.Ref<HTMLAnchorElement> = React.useRef({} as HTMLAnchorElement)
    const recorder: React.Ref<any> = React.useRef(undefined)

    const [loaded, setLoaded] = React.useState(false);
    // const ffmpegRef = React.useRef(new FFmpeg());
    const messageRef: React.Ref<HTMLDivElement> = React.useRef({} as HTMLDivElement);


    let RecordRTC: any = undefined

    React.useLayoutEffect(() => {
        import('recordrtc').then(rtc => {
            RecordRTC = rtc
        })

    }, [])

    function arrayBufferToWav(arrayBuffer: Uint8Array, sampleRate: number, numChannels: number) {
        const wavHeader = new Uint8Array(44);

        // 设置文件类型为Wav
        wavHeader.set([82, 73, 70, 70], 0); // RIFF

        // 设置文件大小，暂时先设置为0
        wavHeader.set([0, 0, 0, 0], 4); // File size

        // 设置文件格式为Wav
        wavHeader.set([87, 65, 86, 69], 8); // WAVE

        // 设置音频格式为PCM
        wavHeader.set([102, 109, 116, 32], 12); // fmt 

        // 设置PCM数据大小
        wavHeader.set([16, 0, 0, 0], 16); // Subchunk1Size

        // 设置音频格式为PCM
        wavHeader.set([1, 0], 20); // Audio Format

        // 设置声道数
        wavHeader.set([numChannels, 0], 22); // NumChannels

        // 设置采样率
        wavHeader.set([(sampleRate & 255), (sampleRate >> 8) & 255, (sampleRate >> 16) & 255, (sampleRate >> 24) & 255], 24); // SampleRate

        // 设置比特率
        const bitsPerSample = 16; // 设置为16位
        wavHeader.set([bitsPerSample, 0], 34); // BitsPerSample

        // 设置数据块大小
        const dataChunkSize = arrayBuffer.byteLength;
        wavHeader.set([(dataChunkSize & 255), (dataChunkSize >> 8) & 255, (dataChunkSize >> 16) & 255, (dataChunkSize >> 24) & 255], 40); // DataChunkSize

        // 合并文件头和音频数据
        const wavFile = new Uint8Array(wavHeader.length + arrayBuffer.byteLength);
        wavFile.set(wavHeader);
        wavFile.set(new Uint8Array(arrayBuffer), wavHeader.length);

        return wavFile.buffer;
    }

    
    const download_audio = async () => {

        var blob = recorder.current.getBlob();

        // const buf = await blob.arrayBuffer();
        // const arrB = await arrayBufferToWav(buf, 44100, 1)
        // const blob2 = new Blob([arrB]);

        var file = new File([blob], getFileName('webm'));

        const url = window.URL.createObjectURL(file);
        aRef.current!.href = url;
        aRef.current!.download = file.name;
        aRef.current!.click();
    }

    const download_wav_audio = async () => {
        const buf = await recorder.current.getBlob().arrayBuffer();
        const arrB = await arrayBufferToWav(buf, 44100, 1)
        const blob = new Blob([arrB], { 'type' : 'audio/wav; codecs=MS_PCM' });

        const file = new File([blob], getFileName('wav'));

        const url = window.URL.createObjectURL(file);
        aRef.current!.href = url;
        aRef.current!.download = file.name;
        aRef.current!.click();
    }

    const release_micro = async () => {
       
    }

    const stop_recording = async () => {

        const stopRecordingCallback = async () => {
            console.log(recorder.current.getBlob())

            
            audioeRef.current!.src = URL.createObjectURL(recorder.current.getBlob())

            await sleep(1000)

            audioeRef.current!.play()
        }


        recorder.current.stopRecording(stopRecordingCallback);
    }

    const start_recording = async () => {
        alert("start recording")

        // 获取用户媒体流 (麦克风)
        let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});

        // audioeRef.current!.srcObject = stream;

        var options = {
            type: 'audio',
            // mimeType: 'audio/wav',
            numberOfAudioChannels: 1,
            checkForInactiveTracks: true,
            bufferSize: 16384
        };

        if(recorder.current) {
            recorder.current.destroy();
        }
        recorder.current = RecordRTC(stream, options);

        // 开始录制
        recorder.current?.startRecording();
    }

    const speech_rec = async () => {

        const buf = await recorder.current.getBlob().arrayBuffer();
        const arrB = await arrayBufferToWav(buf, 44100, 1)
        const blob = new Blob([arrB], { 'type' : 'audio/wav; codecs=MS_PCM' });

        const form_data = new FormData()
        // form_data.append("audio_file", new Blob(audiochunks.current!, { 'type' : 'audio/wav; codecs=MS_PCM' }))
        form_data.append("audio_file", blob)

        const options = {
            method: 'POST',
            body: form_data
        };

        fetch(`/api/in2urheart/ai/stt`, options)
            .then(response => response.json())
            .then(response => {
                console.log("[microPhoneAndSpeaker speech_rec] response: ", response)
            })
            .catch(err => console.error("[RtcRecord speech_rec] error: ", err));
    }

    return (
        <div className="mt-20">
            <audio autoPlay ref={audioeRef}></audio>
            <a ref={aRef}></a>

            <div className="flex flex-col justify-between w-[200px]">
                <span className="bg-blue-100 text-blue-800 text-[16px] font-medium me-2 px-4 py-0.5 rounded-lg text-center mb-5">{recordState}</span>

                <button onClick = {start_recording} className="cursor-pointer bg-teal-500 px-5 py-2 text-[#fff] font-bold mt-1 rounded-xl">Start Recording</button>
                <button onClick = {stop_recording} className="cursor-pointer bg-blue-200 px-5 py-2 text-[#fff] font-bold mt-1 rounded-xl">Stop Recording</button>
                <button onClick = {release_micro} className="cursor-pointer bg-blue-400 px-5 py-2 text-[#fff] font-bold mt-1 rounded-xl">Release Microphone</button>
                <button onClick = {download_audio} className="cursor-pointer bg-blue-600 px-5 py-2 text-[#fff] font-bold mt-1 rounded-xl">download audio</button>
                <button onClick = {download_wav_audio} className="cursor-pointer bg-blue-300 px-5 py-2 text-[#fff] font-bold mt-1 rounded-xl">download audio</button>
                <button onClick = {speech_rec} className="cursor-pointer bg-cyan-200 px-5 py-2 text-[#fff] font-bold mt-1 rounded-xl">fastapi server SST</button>
            </div>

            <div ref={messageRef} className="border-1 border-color-red w-[300px] h-[200px]">

            </div>
            
        </div>
    )
}

