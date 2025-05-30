import GoogleOAuth from "../googleauth"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    if (slug == "gauth") {
        return <GoogleOAuth />
    } 
    
}