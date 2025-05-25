import type { NextRequest } from 'next/server'

const serverurl_aihome = "http://34.85.107.237"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(() => resolve("ok"), ms));


async function handler() 
{
    // await sleep(3000)
    // return {
    //     "conversation_id": "c12345",
    //     "conversation_name": "Music Chat with DJ Kot",
    //     "status": "active",
    //     "conversation_url": "https://tavus.daily.co/c12345",
    //     "replica_id": "re8e740a42",
    //     "persona_id": "p24293d6",
    //     "created_at": "2024-08-13T12:34:56Z"
    // }

    const post_data = {
        token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5MWYxNWRlZTg0OTUzNjZjOTgyZTA1MTMzYmNhOGYyNDg5ZWFjNzIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi5YGl6L6JIOenpiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9pbjJ1cmhlYXJ0LTc1NGJmIiwiYXVkIjoiaW4ydXJoZWFydC03NTRiZiIsImF1dGhfdGltZSI6MTc0NzI0MjUyNywidXNlcl9pZCI6Imh0NERYUnY3aWRaWUVyNWJBWkdiOTZGaWM3MjMiLCJzdWIiOiJodDREWFJ2N2lkWllFcjViQVpHYjk2RmljNzIzIiwiaWF0IjoxNzQ3MjQyNTI3LCJleHAiOjE3NDcyNDYxMjcsImVtYWlsIjoiMjgwNDQyMTYyQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImFwcGxlLmNvbSI6WyIwMDE4MzguZjNiZmVmOTYwOGEzNDM4ZWJmYjAyZWJiZTliOWExYjAuMDA1NiJdLCJlbWFpbCI6WyIyODA0NDIxNjJAcXEuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.s7wC6TOCKLc6QrFXxSbvpQB7jEQPILgHyyiEyGqODNh79Q1IK5n-h550NG-CARBd55-cELMmt2uFiCqb-Twm8dWw8421r-1-4QrpzSHaLVokfbozudMCytUMah9aijebAUj9yFidzGi3DmJqJWpmK7YngrZIJIldPU0EA6pqGlWPNrdUzjmpUnxMOJVG2lBnabc2qqM1L3UbBnl9zAcu-5qUmHnw609pj5MrRkbqH11gzzxslhhnRY91MlM7euvIV7Bf27CIBlaxRJeaUGZvsKCdjxzRqkPPpqlPsDJudLQy_0s70IwdJ5c3syZeo8V-sTN4nHvjuhSRSnOrrMKH_A",
        token_type: "Bearer"
    }

    const options = {
        method: 'POST', 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(post_data)
    };

    const fetch_res = await fetch(`${serverurl_aihome}/auth/verify`, options)
        .then(response => response.json())
        .then(response => {
            console.log("get auth verify res: ", response)
            return response
        })
        .catch(err => console.error(err));

    return fetch_res
}


export async function POST(request: NextRequest ) {
    // console.log(request.cookies)
    // console.log(request.nextUrl)

    // if ((request.nextUrl.searchParams).get("target") === "conversation_id") {
    //     const interviewData = await handler1()
    //     return Response.json(interviewData)
    // } else {
    //     await sleep(6000)
    //     return Response.json({ message: 'Hello World' })
    // }
    // console.log(request)

    const fetch_res = await handler()
    console.log(fetch_res)
    return Response.json(fetch_res)
}

export async function GET(request: NextRequest ) {
    return Response.json({
        "msg": "Get success"
    })
}
 
// export async function HEAD(request: Request) {}
 
// export async function POST(request: Request) {}
 
// export async function PUT(request: Request) {}
 
// export async function DELETE(request: Request) {}
 
// export async function PATCH(request: Request) {}
 
// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
// export async function OPTIONS(request: Request) {}