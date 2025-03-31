
export default function RoomInfoTable(props: any) {

    const video_tds = props.video_devices
        .filter((info: {[key: string]: string}) => info.deviceId != "default" && info.deviceId != "communications")
        .map((info: {[key: string]: string}, index: number) => {
            if (index == 0) {
                return (
                    <td className="px-2 py-1" key={index}>
                        ({info.label}): {info.deviceId}
                    </td>
                )
            } else {
                return (
                    <tr className="bg-white border-b" key={index}>
                        <td className="px-2 py-1" >
                            ({info.label}): {info.deviceId}
                        </td>
                    </tr>
                )
            }
    })

    const audio_tds = props.audio_devices
        .filter((info: {[key: string]: string}) => info.deviceId != "default" && info.deviceId != "communications")
        .map((info: {[key: string]: string}, index: number) => {

            if (index == 0) {
                return (
                    <td className="px-2 py-1" key={index}>
                        ({info.label}): {info.deviceId}
                    </td>
                )
            } else {
                return (
                    <tr className="bg-white border-b" key={index}>
                        <td className="px-2 py-1" >
                            ({info.label}): {info.deviceId}
                        </td>
                    </tr>
                    
                )
            }
            
    })

    return (
        <>
        <table className="text-[12px] w-[400px] break-words text-left rtl:text-right text-gray-500">
            <tbody>
                <tr className="bg-white border-b ">
                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">
                        RoomName
                    </th>
                    <td className="px-2 py-1">
                        {props.roomid}
                    </td>
                </tr>

                <tr className="bg-white border-b ">
                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap"  rowSpan={video_tds.length}>
                        video_devices
                    </th>
                    {video_tds[0]}
                </tr>

                {video_tds.slice(1)}

                <tr className="bg-white border-b ">
                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap"  rowSpan={audio_tds.length}>
                        audio_devices
                    </th>
                    {audio_tds[0]}
                </tr>

                {audio_tds.slice(1)}
                
            </tbody>
        </table>

        </>
    )
}
