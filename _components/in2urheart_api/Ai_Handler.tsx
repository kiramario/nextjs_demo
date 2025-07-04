const api_addr = "http://127.0.0.1:8111"

export async function stt(audio_blob: Blob) {

    const raw2 = JSON.stringify({
        name: "user_name",
        age: 10
    })

    const form_data = new FormData()
    form_data.append("user", "fake")
    form_data.append("audio_file", audio_blob, "audio_name.wav")


    const options = {
        method: 'POST',
        headers: {
            "Authorization": 'Bearer xxx'
        },
        body: form_data
    };
    
    fetch(`${api_addr}/stt/recognize`, options)
        .then(response => response.json())
        .then(response => {
            console.log("[AI handler] stt reconginize response:", response)
            return response
        })
        .catch(err => console.error(err));
}

export async function chat_message(data: any) {
    const decoder = new TextDecoder('utf-8');

    const char_id = data["char_id"];
    const message = data["message"];
    const extra_prompts = data["extra_prompts"];
    console.log(extra_prompts)
    throw new Error("a")

    const data_str = JSON.stringify({
        char_id: char_id,
        msg: {
            role: "user",
            content: message
        },
        extra_prompts: extra_prompts
    })

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": 'Bearer xxx'
        },
        body: data_str
    };


    // function iteratorToStream(iterator) {
    //     return new ReadableStream({
    //         async pull(controller) {
    //             const { value, done } = await iterator.next()
        
    //             if (done) {
    //                 controller.close()
    //             } else {
    //                 controller.enqueue(value)
    //             }
    //         },
    //     })
    // }


    // const stream = iteratorToStream(iterator)
 
    // return new Response(stream)
    
    
    const fetch_res = await fetch(`${api_addr}/chat/${char_id}/messages`, options)
        .then(response => response.body)
        .then(body => {
            // body 是ReadableStream

            return body
            /*
            const reader = body?.getReader();

            const process: any = ({ done, value }: {done: any, value: any}) => {
                if (done) {
                    console.log('Stream finished');
                    return;
                }
                const text = decoder.decode(value);
                console.log('Received data chunk', text);

                return reader?.read().then(process);
            }
            
            reader?.read().then(process);
            */
        })
        .catch(err => {
            console.error(err)
            // return {"err msg": "faild response, check log"}
            return null
        });

    return new Response(fetch_res) 
}

