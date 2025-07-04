import Auth from "../Auth"
import SignInSuc from "../signInSuc"
import Anonymous from "../Anonymous"
import Supabase from "../Supabase_Auth"

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
    } else if (slug == "supabase") {
        return <Supabase />
    }
    
}