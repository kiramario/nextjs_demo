"use client"
import * as React from "react"
import { sleep } from "@/_components/utils"
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

/*
    待使用的框架
    https://github.com/frontend-collective/react-sortable-tree
*/


const get_storage = (key: string) => {
    return localStorage.getItem(key);
}

const save_storage = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

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
  content: string;
};


export default function Page() {

    const [hMsg, setHMsg] = React.useState([] as Array<Msg_Type>)
    const [uMsg, setUMsg] = React.useState("")

    // "rolecard", "wcard1", "wcard2", "wcard3", "ruleconstraint", "thoughtchain"
    const [pHis, setPHis] = React.useState([] as Array<Msg_Type>)

    const [settingshow, setSettingshow] = React.useState(false)
    const [showprompt, setShowprompt] = React.useState(false)
    
    // const [rolecard, setRolecard] = React.useState("")
    // const [wcard1, setWcard1] = React.useState("")
    // const [wcard2, setWcard2] = React.useState("")
    // const [wcard3, setWcard3] = React.useState("")
    // const [ruleconstraint, setRuleconstraint] = React.useState("")
    // const [thoughtchain, setThoughtchain] = React.useState("")

    const [charId, setCharId] = React.useState("CHEAT_686a72eba29274d0d344152e")
    const [charName, setCharName] = React.useState("cheat")

    // const db_request: React.Ref<IDBOpenDBRequest> = React.useRef({} as IDBOpenDBRequest)
    // const db: React.Ref<IDBDatabase> = React.useRef({} as IDBDatabase)

    // const chat_textarea: React.Ref<HTMLTextAreaElement> = React.useRef({} as HTMLTextAreaElement)
    // const chat_id_input: React.Ref<HTMLInputElement> = React.useRef({} as HTMLInputElement)

    const clear_storage = () => {
        if (confirm("删除所有setting记录")) {
            // localStorage.clear();
            localStorage.removeItem("rolecard")
            localStorage.removeItem("wcard1")
            localStorage.removeItem("wcard2")
            localStorage.removeItem("wcard3")
            localStorage.removeItem("ruleconstraint")
            localStorage.removeItem("thoughtchain")
            setPHis([])
            alert("删除完成")
        } else {
            alert("取消删除")
        }
        
    }

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUMsg(event.target.value);
    };

    const handleCharIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharId(event.target.value);
    };

    const handleCharNamedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharName(event.target.value);
    };

    // 提示词setting封装成extra_prompts的一部分
    // TODO: make it less if else
    const setSetting = (index: number, value: string) => {
        const chat_his = retrive_record_chat()
        const new_pHis = []

        const order = ["rolecard", "wcard1", "wcard2", "wcard3", "ruleconstraint", "thoughtchain"]

        if (key == "rolecard") {
            setRolecard(value)
        }
        if (key == "wcard1") {
            setWcard1(value)
        }
        if (key == "wcard2") {
            setWcard2(value)
        }
        if (key == "wcard3") {
            setWcard3(value)
        }
        if (key == "ruleconstraint") {
            setRuleconstraint(value)
        }
        if (key == "thoughtchain") {
            setThoughtchain(value)
        }
        
        if (rolecard) {
            
        }
        if (wcard1) {
            new_pHis.push({"role": "system", "content": wcard1})
        }
        if (wcard2) {
            new_pHis.push({"role": "system", "content": wcard2})
        }
        if (wcard3) {
            new_pHis.push({"role": "system", "content": wcard3})
        }
        if (ruleconstraint) {
            new_pHis.push({"role": "system", "content": ruleconstraint})
        }
        if (thoughtchain) {
            new_pHis.push({"role": "system", "content": thoughtchain})
        }
        
        setPHis([...new_pHis, ...chat_his])
    }

    const sendUMsg = () => {
        if (charId.length == 0) {
            alert("charId empty")
            return 
        }

        if (uMsg.length == 0) {
            alert("uMsg empty")
            return 
        }

        setHMsg([...hMsg, {"role": "user", "content": uMsg}])

        // 记录下用户侧对话
        record_chat("user", uMsg)

        setUMsg("")

        const options = {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                "char_id": charId,
                "message": uMsg,
                "extra_prompts": pHis
            })
        };

        const decoder = new TextDecoder('utf-8');

        fetch("/api/in2urheart/ai/chat/messages", options)
            .then(response => response.body)
            .then(body => {
                
                const reader = body?.getReader();
                let full_reply_text = ""

                const process: any = async ({ done, value }: {done: any, value: any}) => {
                    if (!done) {
                        await sleep(500)
                        const text = decoder.decode(value).replace(/data: /g, "").trim();

                        full_reply_text = full_reply_text + text
                        
                        setHMsg((prevState) => {
                            console.log(`text = ${text}`)
                            // debugger

                            const without_last_hMsg: Array<Msg_Type> = prevState.slice(0, -1)
                            const last_replay: Msg_Type = prevState[prevState.length - 1]
        
                            if (last_replay.role == "user") {
                                return [...prevState, {role: "ai", content: text}]
                            } else {
                                return [...without_last_hMsg, {role: "ai", content: last_replay.content + text}]

                            }
                        });

                        reader?.read().then(process);
                    } else {
                        console.log('Stream finished');
                        // 记录下ai侧对话
                        record_chat("assistant", full_reply_text)
                        return;
                    }
                }
                
                reader?.read().then(process);
            
            })
            .catch(err => console.error("[microPhoneAndSpeaker speech_rec] error: ", err));
    }

    const record_chat = (role: string, msg: string) => {
        // if (db !== null && db.current !== null) {
        //     const tsc: IDBTransaction = db.current.transaction(['chat_his'], 'readwrite')
        
        //     const request = tsc.objectStore('chat_his').add({ "role": role, "content": msg });

        //     request.onerror = function (event) {
        //         alert(msg + "记录失败");
        //     };

        // }
    }

    const retrive_record_chat = () => {
        const chat_his: Array<Msg_Type> = []
        // if (db !== null && db.current !== null) {
        //     const tsc: IDBTransaction = db.current.transaction('chat_his');

        //     const objectStore: IDBObjectStore = tsc.objectStore('chat_his');
            
        //     objectStore.openCursor().onsuccess = function (event) {
        //         const cursor = event.target!.result;

        //         if (cursor) {
        //             console.log('Id: ' + cursor.key);
        //             chat_his.push({
        //                 "role": cursor.value.role,
        //                 "content": cursor.value.content
        //             })
        //             cursor.continue();
        //         } else {
        //             console.log('没有更多数据了！');
        //         }
        //     };
        // }
        return chat_his
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
        setSettingToPHis()
        if (get_storage("rolecard")) {
            setRolecard(get_storage("rolecard")!)
        }
        if (get_storage("wcard1")) {
            setWcard1(get_storage("wcard1")!)
        }
        if (get_storage("wcard2")) {
            setWcard2(get_storage("wcard2")!)
        }
        if (get_storage("wcard3")) {
            setWcard3(get_storage("wcard3")!)
        }
        if (get_storage("ruleconstraint")) {
            setRuleconstraint(get_storage("ruleconstraint")!)
        }
        if (get_storage("thoughtchain")) {
            setThoughtchain(get_storage("thoughtchain")!)
        }

        // db_request.current = window.indexedDB.open("ai_home_love", 1);

        // db_request.current.onsuccess = function (event: any) {
        //     db.current = event.target.result;
        //     console.log("open database success")
        // }

        // db_request.current.onupgradeneeded = function (event: any) {
        //     db.current = event.target.result;
        //     if (db.current !== null && db.current !== undefined) {
        //         if (!db.current.objectStoreNames.contains('prompt_his')) {
        //             db.current.createObjectStore('prompt_his', { autoIncrement: true });
        //         }
        //         if (!db.current.objectStoreNames.contains('chat_his')) {
        //             db.current.createObjectStore('chat_his', { autoIncrement: true });
        //         }
        //     }
            
        // }
    }, [])

    const chat_items = hMsg.map((msg, index) => {
        return <ChatMsg msg={msg.content} role={msg.role} key={index} />
    });

    const prompt_items = () => {

        return (<ul className="w-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
            {
                pHis.map((prompt, index) => {
                    
                    return <li key={index} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
                        <JsonView
                            src={{"prompt": prompt}}
                            theme="github"
                            editable={true}
                            highlightUpdates={true}/>
                    </li> 
                })
            }
        </ul>)
    }

    const drawer_setting_class = settingshow 
        ? "h-screen p-4 bg-slate-50 overflow-y-auto"
        : "h-screen p-4  hidden"
    
    const drawer_prompt_class = showprompt 
        ? "h-screen p-4 bg-slate-50 overflow-y-auto w-100"
        : "h-screen p-4  hidden"


    return (
        <>
            <div className="flex justify-center">
                <div className={drawer_setting_class}>
                    <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase">
                        <svg className="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/>
                        </svg>
                        Prompt And Setting
                    </h5>
                    <button type="button" onClick={() => {setSettingshow(false)}} className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                    {/* <input onChange={handleCharIdChange} value={charId} type="text"  className="w-[300px] bg-green-50 border border-green-500 text-green-900  placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5" placeholder="chat id" />
                    <input onChange={handleCharNamedChange} value={charName} type="text"  className="w-[200px] bg-green-100 border border-green-500 text-green-900  placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5" placeholder="chat name" /> */}
                    
                    <form className="mb-6">
                        <div className="mb-6">
                            <label htmlFor="role_card" className="block mb-2 text-sm font-medium text-gray-900">角色卡</label>
                            <textarea id="role_card" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setRolecard(event.target.value); save_storage("rolecard", event.target.value)} } 
                                value={rolecard}  rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write some"></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="wcard_1" className="block mb-2 text-sm font-medium text-gray-900">世界书1</label>
                            <textarea id-="wcard_1" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setWcard1(event.target.value); save_storage("wcard1", event.target.value)} } 
                                value={wcard1} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="wcard_2" className="block mb-2 text-sm font-medium text-gray-900">世界书2</label>
                            <textarea id-="wcard_2" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setWcard2(event.target.value); save_storage("wcard2", event.target.value)} } 
                                value={wcard2} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>

                        </div>
                        <div className="mb-6">
                            <label htmlFor="wcard_3" className="block mb-2 text-sm font-medium text-gray-900">世界书3</label>
                            <textarea id-="wcard_3" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setWcard3(event.target.value); save_storage("wcard3", event.target.value)} } 
                                value={wcard3} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="rule_constraint" className="block mb-2 text-sm font-medium text-gray-900">规则限制</label>
                            <textarea id="rule_constraint" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setRuleconstraint(event.target.value); save_storage("ruleconstraint", event.target.value)} } 
                                value={ruleconstraint} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="thought_chain" className="block mb-2 text-sm font-medium text-gray-900">思维链</label>
                            <textarea id="thought_chain" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setThoughtchain(event.target.value); save_storage("thoughtchain", event.target.value)} } 
                                value={thoughtchain} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>
                        </div>
                    </form>
                </div>

                <div className="grow flex justify-center flex-col px-10 py-10">
                    <div className="">
                        <button onClick={() => setSettingshow(true)} className="inline-block text-white bg-blue-300 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-1 mb-2 mr-3 cursor-pointer" type="button">
                            Show setting
                        </button>
                        <button onClick={() => setShowprompt(true)} className="inline-block text-white bg-blue-300 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-1 mb-2 mr-3 cursor-pointer" type="button">
                            Show send prompt
                        </button>
                        <button onClick={() => {clear_storage()}} className="inline-block text-white bg-red-300 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-1 mb-2 mr-3 cursor-pointer" type="button">
                            clear all setting
                        </button>
                    </div>

                    <div className="grow mt-10 h-[500px] overflow-y-auto bg-indigo-50 px-10 py-5">
                        {chat_items}
                    </div>

                    <div className="mt-10">
                        <div>
                            <label htmlFor="message" className="inline-block mb-2 text-sm font-medium text-gray-900 mr-5">Your message</label>
                            <span onClick={sendUMsg} className="inline-block px-5 mb-5 bg-blue-200 hover:bg-blue-500  rounded-lg w-fit cursor-pointer">send</span>
                        </div>
                        
                        <textarea onChange={handleMessageChange} value={uMsg} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                    </div>
                </div>

                <div className={drawer_prompt_class}>
                    <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase">
                        <svg className="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        Prompt History 
                    </h5>
                    <button type="button" onClick={() => {setShowprompt(false)}} className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                    {prompt_items()}
                </div>
            </div>

            
        </>
    )
}