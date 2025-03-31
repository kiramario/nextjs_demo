export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <h2 className="bg-cyan-200">This is the app/demo layout</h2>
            {children}
        </>
    )
}