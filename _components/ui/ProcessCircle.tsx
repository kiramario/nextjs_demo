import * as React from "react"

export interface ProcessCircleProps {
    stroke_color: string,
    line_width: number,
    radius: number,
    progress_percent: number,
    text_center?: string,
    text_bottom?: string,
    text_center_size?: number,
    text_bottom_size?: number,
    percent_format?: (a: number) => string
}

export default function ProcessCircle(props: ProcessCircleProps) {
    const canvasRef: React.RefObject<HTMLCanvasElement| null> = React.useRef(null);

    React.useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas ? canvas.getContext('2d') : null;
        if (ctx) {
            ctx.beginPath()
            ctx.arc(props.radius, props.radius, props.radius, 0, (props.progress_percent/100)*2*Math.PI, false);
            ctx.strokeStyle = props.stroke_color;
            ctx.lineWidth = props.line_width;
            ctx.stroke();
    
            ctx.beginPath()
            ctx.arc(props.radius, props.radius, props.radius, 0, (props.progress_percent/100)*2*Math.PI, true);
            ctx.strokeStyle = '#f3f3f4';
            ctx.lineWidth = props.line_width;
            ctx.stroke();
        }
        
    }, [])

    const default_percent_format = (a: number) => a + "%"

    const format_percent_str = props.percent_format ?? default_percent_format

    const text_center_cls = "inline-block text-[" + props.text_center_size + "px] font-bold"
    const canvas_wrap_style = {
        width: props.radius*2 + "px",
        height: props.radius*2 + "px",
    }

    return (
        <>
         {
            <div className="flex flex-col items-center justify-center bg-[#fff]" style={canvas_wrap_style}>
                <canvas ref={canvasRef} width={props.radius*2} height={props.radius*2} className="border border-1 absolute bg-transparent"/>
                <span className={text_center_cls}>{format_percent_str(props.progress_percent)}</span>
                <span className="inline-block text-[18px]">{props.text_center}</span>
            </div>
        }
        </>
       
        
    )
}