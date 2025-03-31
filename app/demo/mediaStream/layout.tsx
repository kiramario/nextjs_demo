
import '../../globals.css'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <h2 className="bg-cyan-100">This is the app/demo/mediaStream layout</h2>
            {/* Layout UI */}
            {/* Place children where you want to render a page or nested layout */}
            <div>{children}</div>
        </>
    )
}