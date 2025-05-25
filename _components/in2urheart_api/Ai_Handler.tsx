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
