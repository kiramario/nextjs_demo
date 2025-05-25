import RecordScreen from "../RecordScreen"
import Apidemo from "../Apidemo"
import RecordCamera from "../RecordCamera"
import MicroPhoneAndSpeaker from "../MicroPhoneAndSpeaker"
import Localdv from "../Localdv"
import RtcRecord from "../RtcRecord"
import NoSSRWrapper from "../NoSSRWrapper";
import FFmpegHome from "../ffmpegdemo";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    if (slug == "recordScreen") {
        return <RecordScreen />
    } else if (slug == "apiDemo") {
        return <Apidemo />
    } else if (slug == "recordCamera") {
        return <RecordCamera />
    } else if (slug == "microPhoneAndSpeaker") {
        return <MicroPhoneAndSpeaker />
    } else if (slug == "rtcR") {
        return <RtcRecord />
    } else if (slug == "ffmpegD") {
        return <FFmpegHome />
    } else if (slug == "locDv") {
        return <Localdv />
    }
    
}