import Auth from "../Auth"
import SignInSuc from "../signInSuc"
import Anonymous from "../Anonymous"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    if (slug == "auth") {
        return <Auth />
    } else if (slug == "signInSuc") {
        return <SignInSuc />
    } else if (slug == "anonymous") {
        return <Anonymous />
    }
    
}