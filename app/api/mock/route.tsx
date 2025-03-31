import type { NextRequest } from 'next/server'


const sleep = (ms: number) => new Promise((resolve) => setTimeout(() => resolve("ok"), ms));


async function handler1() 
{
    await sleep(3000)
    return {
        "conversation_id": "c12345",
        "conversation_name": "Music Chat with DJ Kot",
        "status": "active",
        "conversation_url": "https://tavus.daily.co/c12345",
        "replica_id": "re8e740a42",
        "persona_id": "p24293d6",
        "created_at": "2024-08-13T12:34:56Z"
    }
}


export async function GET(request: NextRequest ) {
    // console.log(request.cookies)
    // console.log(request.nextUrl)

    if ((request.nextUrl.searchParams).get("target") === "conversation_id") {
        const interviewData = await handler1()
        return Response.json(interviewData)
    } else {
        await sleep(6000)
        return Response.json({ message: 'Hello World' })
    }
}
 
// export async function HEAD(request: Request) {}
 
// export async function POST(request: Request) {}
 
// export async function PUT(request: Request) {}
 
// export async function DELETE(request: Request) {}
 
// export async function PATCH(request: Request) {}
 
// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
// export async function OPTIONS(request: Request) {}