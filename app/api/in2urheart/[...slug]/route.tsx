import type { NextRequest, NextResponse } from 'next/server'
import { stt } from "@/_components/in2urheart_api/Ai_Handler"


// 定义请求参数的类型
interface Params {
    slug: string[];
}

// 定义请求处理函数的类型
export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { slug } : { slug: string[] } = await params; // 获取动态参数

    const full_slug = slug.join("/")

    console.log("[...]slug: " + full_slug)

    return Response.json({
        "msg": `Get success ${full_slug}`
    })
}

// 定义请求处理函数的类型
export async function POST(request: NextRequest, { params }: { params: Params }) {
    const { slug } : { slug: string[] } = await params; 

    const full_slug = slug.join("/")

    console.log("[...]slug: " + full_slug)

    if (full_slug == "ai/stt") {
        // const data = await request.json()

        const contentType = request.headers.get('content-type');
        // console.log(`contentType = ${contentType}`)
        if (!contentType) {
            return Response.json({ error: 'Content-Type header is missing' }, { status: 400 });
        }
        
        const data = await request.formData()

        // const stt_res = {
        //     "msg": "no content"
        // }

        const audio_blob: Blob = data.get("audio_file") as Blob
        console.log(data.get("audio_file"))
        const stt_res = await stt(audio_blob)

        return Response.json(stt_res)
        
    } else {
        return Response.json({
            "msg": `POST success ${full_slug}`
        })
    }
}