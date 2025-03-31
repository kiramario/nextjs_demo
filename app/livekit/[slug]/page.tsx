import * as React from "react"
import Meeting from "@/_components/livekit/Meeting"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params

    if (slug == "meeting") {
        return <Meeting />
    } else {
        return (
            <>
                Nothing
            </>
        )
    }
}
