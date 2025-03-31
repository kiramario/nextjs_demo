"use client"


export default function Page({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const getParam = async () => {
        const slug = (await params)
        const filters = (await searchParams)
        console.log(slug)
        console.log(filters)
    }

    getParam()

    return (
        <>
            <h1 className="text-center text-xl font-bold">app/demo/dynamicroute/slug page</h1>
            <p>router.query.slug:  </p>
        </>
    )
}
