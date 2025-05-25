 "use client"

import * as React from "react"


export default function AuthDemo() {
  
    React.useEffect(() => {
        
        return () => {

        }
    }, [])

    const in2urheart_auth_verify = () => {
        const options = {
            method: 'POST', 
        };

        fetch(`/api/in2urheart`, options)
            .then(response => response.json())
            .then(response => {
                console.log("sign in success response: ", response)

                alert(`${response.status_code}, ${response.status} , ${response.message}, ${response.data}`)
            })
            .catch(err => console.error(err));
        }
    

    const in2urheart_auth_verify2 = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "*/*");
        // myHeaders.append("Host", "34.85.107.237");
        myHeaders.append("Host", "127.0.0,1");
        myHeaders.append("Connection", "keep-alive");

        const raw = JSON.stringify({
            "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5MWYxNWRlZTg0OTUzNjZjOTgyZTA1MTMzYmNhOGYyNDg5ZWFjNzIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi5YGl6L6JIOenpiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9pbjJ1cmhlYXJ0LTc1NGJmIiwiYXVkIjoiaW4ydXJoZWFydC03NTRiZiIsImF1dGhfdGltZSI6MTc0NzI0MjUyNywidXNlcl9pZCI6Imh0NERYUnY3aWRaWUVyNWJBWkdiOTZGaWM3MjMiLCJzdWIiOiJodDREWFJ2N2lkWllFcjViQVpHYjk2RmljNzIzIiwiaWF0IjoxNzQ3MjQyNTI3LCJleHAiOjE3NDcyNDYxMjcsImVtYWlsIjoiMjgwNDQyMTYyQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImFwcGxlLmNvbSI6WyIwMDE4MzguZjNiZmVmOTYwOGEzNDM4ZWJmYjAyZWJiZTliOWExYjAuMDA1NiJdLCJlbWFpbCI6WyIyODA0NDIxNjJAcXEuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.s7wC6TOCKLc6QrFXxSbvpQB7jEQPILgHyyiEyGqODNh79Q1IK5n-h550NG-CARBd55-cELMmt2uFiCqb-Twm8dWw8421r-1-4QrpzSHaLVokfbozudMCytUMah9aijebAUj9yFidzGi3DmJqJWpmK7YngrZIJIldPU0EA6pqGlWPNrdUzjmpUnxMOJVG2lBnabc2qqM1L3UbBnl9zAcu-5qUmHnw609pj5MrRkbqH11gzzxslhhnRY91MlM7euvIV7Bf27CIBlaxRJeaUGZvsKCdjxzRqkPPpqlPsDJudLQy_0s70IwdJ5c3syZeo8V-sTN4nHvjuhSRSnOrrMKH_A",
            "token_type": "Bearer"
        });

        const raw2 = JSON.stringify({
            name: "user_name",
            age: 10
        })

        const options = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        
        //fetch("http://34.85.107.237/auth/verify", requestOptions)
        fetch("http://127.0.0.1:8111/auth/verify", options)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }
    return (
        <>
            <div className="flex justify-start w-full px-10 py-10">
                <span onClick={in2urheart_auth_verify} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px]  mr-[10px] select-none">
                    In2urheart auth verify
                </span>

                <span onClick={in2urheart_auth_verify2} className="cursor-pointer block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px]  mr-[10px] select-none">
                    In2urheart auth verify2
                </span>
            </div>
           
        </>
    )
}