'use client';

// localAudio, localVedio 

const LocalAudioVedio = () => {
    

    const lavFn = () => {
        try {
            
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                console.log("不支持 enumerateDevices() .");
                return;
              }
              
              navigator.mediaDevices.getUserMedia({audio: true, video: true});
              // 列出相机和麦克风。
              
              navigator.mediaDevices
                .enumerateDevices()
                .then(function (devices) {
                  devices.forEach(function (device) {
                    console.log(
                      device.kind + ": " + device.label + " id = " + device.deviceId,
                    );
                  });
                })
                .catch(function (err) {
                  console.log(err.name + ": " + err.message);
                });
        } catch (err) {
            console.error(err);
        } finally {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                console.log("不支持mediaDevices.enumerateDevices(), 未识别到多媒体设备！");
            }
        }
    }

    // 处理媒体流数据
    function handleMediaStream(MediaStream: MediaStream) {
        console.log('MediaStream 流媒体对象：', MediaStream)

        const video = document.createElement('video');
        video.controls = true;
        video.srcObject = MediaStream;
        video.onloadedmetadata = function () {
            video.play();
        };
        document.body.appendChild(video);
    };

    // 获取媒体流数据
    function getUserMedia() {
        try {
            const options = {
                audio: true,    // 注：这里 audio、video 默认都为false【一定要确保有麦克风或摄像头（有啥设备就开启啥设备）硬件设备的情况下才设为true 或 {...}，否则会报DOMException: Requested device not found 等错！！】
                video: true,	// 获取视频 默认video: { facingMode: 'user' } }前置相机
                // video: {
                //     width: 1280, // 设置摄像头分辨率
                //     height: 720,
                //     facingMode: { exact: 'environment' } // 获取视频 后置相机
                // }
            }
            if (navigator.mediaDevices.getUserMedia) {

                navigator.mediaDevices.getUserMedia(options).then(function (MediaStream) {
                    handleMediaStream(MediaStream)
    
                }).catch(function (err) {
                    console.error("访问用户媒体设备失败：权限被拒绝 或 未识别到多媒体设备！", err);
    
                }).finally(() => {
                    console.log('navigator.mediaDevices.getUserMedia API')
                });
            } else {
                if (0 > location.origin.indexOf('https://')) {
                    console.error("提示: 请尝试在本地localhost域名 或 https协议 的Web服务器环境中重新运行！");
                }
            }
        } catch (error) {
            console.error("访问用户媒体设备失败：", error);
        }
    };
    getUserMedia();
    

    return (
        <>
        <div className="flex flex-wrap gap-2.5 mb-5">
            
            <button
                onClick={lavFn} 
                id="local_av" 
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              local_av
            </button>
        </div>
        </>
    )
}

export { LocalAudioVedio }