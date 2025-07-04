
import Index from "../Index"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    if (slug == "index") {
        return <Index />
    } 
    
}