export default function Layout({
    children,
    fontdemo,
}: {
    children: React.ReactNode
    fontdemo: React.ReactNode
}) {
    return (
        <>
            <h2 className="bg-cyan-200">This is the app/demo/prallelroute layout</h2>
            {children}
            {fontdemo}
        </>
    )
}