"use client"
import * as React from "react"
import { sleep } from "@/_components/utils"

/*
    待使用的框架
    https://github.com/frontend-collective/react-sortable-tree
*/

const ChatMsg = ({
  msg, role
}: {msg: string, role: string}) => {

    return (() => {
        if (role == "user") {
            return <div className="flex justify-end mb-4">
                <span className="block text-sm text-gray-800  rounded-lg bg-gray-200 w-fit px-4 py-2 font-medium">Me: {msg}</span>
            </div>
        } else {
            return <div className="flex justify-start ">
                <span className="block font-medium px-4  py-2 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-200 w-fit">AI: {msg}</span> 
            </div>
        }
    })()
};


type Msg_Type = {
  role: string;
  msg: string;
};


export default function Page() {

    const [hMsg, setHMsg] = React.useState([] as Array<Msg_Type>)

    const [uMsg, setUMsg] = React.useState("")
    const [charId, setCharId] = React.useState("686247bebf0d81e91af6421e")
    const [charName, setCharName] = React.useState("test2")

    // const chat_textarea: React.Ref<HTMLTextAreaElement> = React.useRef({} as HTMLTextAreaElement)
    // const chat_id_input: React.Ref<HTMLInputElement> = React.useRef({} as HTMLInputElement)

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUMsg(event.target.value);
    };

    const handleCharIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharId(event.target.value);
    };

    const handleCharNamedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharName(event.target.value);
    };

    const sendUMsg = () => {
        if (charId.length == 0) {
            alert("charId empty")
            return 
        }

        if (uMsg.length == 0) {
            alert("uMsg empty")
            return 
        }

        setHMsg([...hMsg, {"role": "user", "msg": uMsg}])

        setUMsg("")

        const options = {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                "char_id": charId,
                "message": uMsg
            })
        };

        const decoder = new TextDecoder('utf-8');

        fetch("/api/in2urheart/ai/chat/messages", options)
            .then(response => response.body)
            .then(body => {
                
                const reader = body?.getReader();

                const process: any = async ({ done, value }: {done: any, value: any}) => {
                    if (!done) {
                        await sleep(500)
                        const text = decoder.decode(value).replace(/data: /g, "").trim();

                        
                        setHMsg((prevState) => {
                            console.log(`text = ${text}`)
                            // debugger

                            const without_last_hMsg: Array<Msg_Type> = prevState.slice(0, -1)
                            const last_replay: Msg_Type = prevState[prevState.length - 1]
        
                            if (last_replay.role == "user") {
                                return [...prevState, {role: "ai", msg: text}]
                            } else {
                                return [...without_last_hMsg, {role: "ai", msg: last_replay.msg + text}]

                            }
                        });

                        reader?.read().then(process);
                    } else {
                        console.log('Stream finished');
                        return;
                    }
                }
                
                reader?.read().then(process);
            
            })
            .catch(err => console.error("[microPhoneAndSpeaker speech_rec] error: ", err));
        
    }

    // const start_stream_1 = async () => {
    //     const eventSource = new EventSource('http://127.0.0.1:8111/stream');
            
    //     eventSource.onopen = function(){
    //         alert('connection readyState: '+ eventSource.readyState);  
    //     };


    //     // 监听消息事件
    //     eventSource.onmessage = function(event) {
    //         console.log("Received:", event.data);
    //         Object.assign(msgs, {"content": msgs.content + "\n" + event.data})
    //         //console.log(JSON.parse(event.data)); // 如果fastapi返回json字符串
    //     };
        
    //     eventSource.addEventListener("close", (event) => {
    //         console.log("Received close event");
    //         Object.assign(msgs, {"content": msgs.content + "\nfinish receive"})
    //         eventSource.close();
    //     });

    // }

    React.useEffect(() => {

    }, [])

    const chat_items = hMsg.map((msg, index) => {
        return <ChatMsg msg={msg.msg} role={msg.role} key={index} />
    });

    return (
        <>
            <div className="w-1/2 mx-auto mb-6">
                <input onChange={handleCharIdChange} value={charId} type="text"  className="w-[300px] bg-green-50 border border-green-500 text-green-900  placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5" placeholder="chat id" />
                <input onChange={handleCharNamedChange} value={charName} type="text"  className="w-[200px] bg-green-100 border border-green-500 text-green-900  placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5" placeholder="chat name" />
            </div>

            <div className="w-1/2 mx-auto mt-10 h-[500px] overflow-y-auto bg-indigo-50 px-10 py-5">
                {chat_items}
            </div>
            
            <div className="w-1/2 mx-auto mt-10 fixed bottom-20 left-100">
                <span onClick={sendUMsg} className="block px-5 py-1 mb-5 bg-blue-200 rounded-lg w-fit cursor-pointer">send</span>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                <textarea onChange={handleMessageChange} value={uMsg} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
            </div>
        </>
    )
}