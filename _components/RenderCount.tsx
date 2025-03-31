import * as React from "react"

export default function useRenderCount() {
    const count = React.useRef(0)

    React.useEffect(() => {
        count.current++
    }, [])

    return count
}