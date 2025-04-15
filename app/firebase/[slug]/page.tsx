import Auth from "../Auth"
import SignInSuc from "../signInSuc"

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
    }
    
}