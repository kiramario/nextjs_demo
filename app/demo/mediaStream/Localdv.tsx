'use client'

import React from 'react';
import ReactPlayer from 'react-player';

// const av_folder = "E:\\crawVideos\\torrent\\av"
const video_list = [
    "34opvBMeeeDLvLsY.mp4",
"4LAKG6HsL0FfGdZl.mp4",
"6m3VKUQZRLVERvdd.mp4",
"7llLPtoAEUBCG02g.mp4",
"DmFvsuv-3TdhjntK.mp4",
"fG7sYEhhiMQIt0WR.mp4",
"GO3930BT5AJ5Vsbv.mp4",
"HUvW9mW7gX_XO92J.mp4",
"hYTkrQH5EpJfWGuv.mp4",
"Krq7P_3gKlxjRA2r.mp4",
"lnduYuqkKzSe3mjc.mp4",
"LtmIWHVlhYAe9KW2.mp4",
"onwoG8BMif_DVt5L.mp4",
"szjwR50UGuNz9Qpz.mp4",
"TUUixQIrukb6_Jsy.mp4",
"UWOM-4hyHAlo1YNK.mp4",
"UWwXihksyBHGUx-F.mp4",
"Uz6aMev7HeqWPwWl.mp4",
"_YZ6BCZxgy3Pc5wK.mp4",
"rKCKXFSZqOR81vys.mp4",
"cE3s20VgnqXeX_C4.mp4"]



export default function VideoComponent () {
    const [showPlayer, setShowPlayer] = React.useState(false)
    const [videoOpt, setVideOpt] = React.useState(video_list[0])
    React.useEffect(() => {
        setShowPlayer(true);
    }, []);

    
    const videoListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const idx: number = parseInt(e.target.value)
        setVideOpt(video_list[idx])
    }

    return (
        <div>
            <form className="max-w-sm mx-auto">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your video</label>
                <select id="countries" onChange={ videoListChange } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {Array.from(Array(video_list.length).keys(), key => key + 1).map(index => {
                        return <option key={index} value={index}>{video_list[index]}</option>
                    })
                    }
                </select>
            </form>
            <div className='w-[50%] h-[70vh]'>
                {
                    showPlayer && 
                    <ReactPlayer
                        url={`/video/${videoOpt}`}
                        width="100%"
                        height="100%"
                        controls = {true}
                    />
                }
            </div>
            
            
        </div>
    );
};
