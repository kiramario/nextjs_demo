export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <h2 className="text-center text-xl font-bold">This is the app/livekit layout</h2>
            {children}
        </>
    )
}