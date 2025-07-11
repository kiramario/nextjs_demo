"use client"
import dynamic from 'next/dynamic'
import * as React from "react"
import { sleep } from "@/_components/utils"
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';
import { json } from "stream/consumers";
import { JsonEditor, JSONContent, createJSONEditor, JSONEditorPropsOptional, OnChange, TextContent} from 'vanilla-jsoneditor'
import { errorToJSON } from 'next/dist/server/render';


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
  content: string;
};

interface IDictionary {
    rolecard: string
    wcard1: string
    wcard2: string
    wcard3: string
    ruleconstraint: string
    thoughtchain: string
}

interface PayloadDictionary {
    model: string
    max_tokens: number
    enable_thinking: boolean
    thinking_budget: number
    min_p: number
    temperature: number
    top_p: number
    top_k: number
    frequency_penalty: number
    n: number
    stop: Array<string>
    stream: boolean
    messages: Array<Msg_Type>
    error?: string
}

interface Dict_str { [key: string]: any }

export default function Page() {
    // const JSONEditorReact = dynamic(() => import('../JSONEditorReact'), { ssr: false }) 阻止服务器渲染
    // const TextContent = dynamic(() => import('../TextContent'), { ssr: false })

    const default_paylaods: PayloadDictionary = {
        "messages": [],
        "model": "deepseek-ai/DeepSeek-V3",
        "temperature": 0.7,
        "max_tokens": 512,
        "stream": true,
        "frequency_penalty": 0.5,
        "top_p": 0.7,
        "n": 1,
        "enable_thinking": false,
        "thinking_budget": 512,
        "min_p": 0.05,
        "top_k": 50,
        "stop": [],
    }

    const pa_order = ["messages", "model", "temperature", "max_tokens", "stream", "frequency_penalty",
        "top_p", "n", "enable_thinking",  "thinking_budget", "min_p", "top_k", "stop"]

    const p_order: Array<string> = ["rolecard", "wcard1", "wcard2", "wcard3", "ruleconstraint", "thoughtchain"]

    const [hMsg, setHMsg] = React.useState([] as Array<Msg_Type>)

    const [uMsg, setUMsg] = React.useState("")
    const [dm, setDm] = React.useState("")

    // TODO: pHis是不是也做成json字符串存在本地，目前是每个项目分别存
    const [pHis, setPHis] = React.useState({} as IDictionary) 
    const [ploads, setPloads] = React.useState("")
    const [hPloads, setHPloads] = React.useState([] as Array<PayloadDictionary>)

    const [settingshow, setSettingshow] = React.useState(false)
    const [showprompt, setShowprompt] = React.useState(false)
    const [waitAi, setWaitAi] = React.useState(false)

    const refContainer = React.useRef<HTMLDivElement>(null)
    const refEditor = React.useRef<JsonEditor>(null)

    
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
            localStorage.removeItem("ploads")
            setPHis({} as IDictionary)
        } else {
            alert("取消删除")
        }
    }
    const pop_last_chat = () => {
        if (confirm("删除最后一条消息")) {
            const without_last_hMsg: Array<Msg_Type> = hMsg.slice(0, -1)
            setHMsg(without_last_hMsg)
            save_storage("chat_list", JSON.stringify(without_last_hMsg))
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
    const convert_pHis_to_mst = () => {
        const p_list: Array<Msg_Type> = []
        for (var i = 0; i < p_order.length; i++) {
            const key: string = p_order[i]
            
            if(pHis && !!pHis[key as keyof IDictionary]){
                const k_string = pHis[key as keyof IDictionary]!

                let result = {}

                try{
                    result = eval(Function("return " + k_string)())
                } catch (err) {
                    result = {"errorss": err}
                }

                // console.log(k_string, Array.isArray(result))
                if (Array.isArray(result)) {
                    (result as Array<Msg_Type>).forEach((value, index) => {
                        p_list.push(value)
                    })
                } else {
                    p_list.push(result as Msg_Type)
                }
            }
        }

        const chat_his = retrive_record_chat()
        return [...p_list, ...chat_his]
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

        setHMsg((prev) => {
            const new_h_msg = [...prev, {"role": "user", "content": uMsg}]
            save_storage("chat_list", JSON.stringify(new_h_msg))
            return new_h_msg
        })
        
        // 记录下用户侧对话
        record_chat("user", uMsg)

        setUMsg("")
    }

    const chat_with_msg = () => {
        setWaitAi(true)
        const options = {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                "char_id": charId,
                "message": uMsg,
                "extra_prompts": convert_pHis_to_mst(),
                "payloads": eval(Function("return " + ploads)())
            })
        };

        const decoder = new TextDecoder('utf-8');

        fetch("/api/in2urheart/ai/chat/messages", options)
            .then(response => response.body)
            .then(body => {
                setWaitAi(false)
                const reader = body?.getReader();
                let full_reply_text = ""

                const process: any = async ({ done, value }: {done: any, value: any}) => {
                    console.log("done: ", done)
                    if (!done) {
                        await sleep(500)
                        const text = decoder.decode(value).replace(/data: /g, "").replaceAll(/\n/g, "").trim();
                        console.log("text: ", text)
                        if (text.indexOf("Error occurred") != -1) {
                            alert(text)
                            return;
                        }

                        if (text.indexOf("event:") != -1 || text.indexOf("done") != -1) {
                            return
                        }

                        full_reply_text = full_reply_text + text
                        setHMsg((prevState) => {
                            // debugger

                            const without_last_hMsg: Array<Msg_Type> = prevState.slice(0, -1)
                            const last_replay: Msg_Type = prevState[prevState.length - 1]
        
                            if (last_replay.role == "user") {
                                const new_h_msg = [...prevState, {role: "assistant", content: text}]
                                save_storage("chat_list", JSON.stringify(new_h_msg))
                                return new_h_msg
                            } else {
                                const new_h_msg = [...without_last_hMsg, {role: "assistant", content: last_replay.content + text}]
                                save_storage("chat_list", JSON.stringify(new_h_msg))
                                return new_h_msg
                            }
                        });

                        reader?.read().then(process);
                    } else {
                        console.log('Stream finished');

                        // 记录下ai侧对话
                        // record_chat("assistant", full_reply_text)
                        return;
                    }
                }
                
                reader?.read().then(process);

                console.log("full_reply_text: ", full_reply_text)

                const new_hh = [...hPloads, calculate_cur_ploads()]
                setHPloads(new_hh)
                save_storage("history_ploads", JSON.stringify(new_hh))
            
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
        return [...hMsg]
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

    const setDict= (key: string, value: string) => {
        // TODO: eval  异常如何统一处理
        let value_dict = {}
        try {
           value_dict = eval(Function("return " + value)())
        } catch (err) {
            alert(`set ${key} error: ${err}`)
            return
        }

        if (key == "ploads") {
            setPloads(value);
            save_storage("ploads", value)
        } else {
            if (key == "rolecard") {
                setPHis({...pHis, "rolecard": value}); 
                save_storage("rolecard", value)
            }

            if (key == "wcard1") {
                setPHis({...pHis, "wcard1": value}); 
                save_storage("wcard1", value)
            }

            if (key == "wcard2") {
                setPHis({...pHis, "wcard2": value}); 
                save_storage("wcard2", value)
            }

            if (key == "wcard3") {
                setPHis({...pHis, "wcard3": value}); 
                save_storage("wcard3", value)
            }

            if (key == "ruleconstraint") {
                setPHis({...pHis, "ruleconstraint": value}); 
                save_storage("ruleconstraint", value)
            }

            if (key == "thoughtchain") {
                setPHis({...pHis, "thoughtchain": value}); 
                save_storage("thoughtchain", value)
            }                
        }
    }

    React.useEffect(() => {
        refEditor.current = createJSONEditor({
            target: refContainer.current!,
            props: {
                onChange: rerange_message
            }
        })
        

        const new_pHis: IDictionary = {} as IDictionary

        if (!!get_storage("rolecard")) {
            new_pHis.rolecard = get_storage("rolecard")!
        }
        if (!!get_storage("wcard1")) {
            new_pHis.wcard1 = get_storage("wcard1")!
        }
        if (!!get_storage("wcard2")) {
            new_pHis.wcard2 = get_storage("wcard2")!
        }
        if (!!get_storage("wcard3")) {
            new_pHis.wcard3 = get_storage("wcard3")!
        }
        if (!!get_storage("ruleconstraint")) {
            new_pHis.ruleconstraint = get_storage("ruleconstraint")!
        }
        if (!!get_storage("thoughtchain")) {
            new_pHis.thoughtchain = get_storage("thoughtchain")!
        }

        setPHis(new_pHis);

        if (!!get_storage("ploads")) {
            setPloads(get_storage("ploads")!)
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
        if (!!get_storage("chat_list")) {
            setHMsg(JSON.parse(get_storage("chat_list")!))
        }
        if (!!get_storage("history_ploads")) {
            setHPloads(JSON.parse(get_storage("history_ploads")!))
        }

    }, [])

    React.useEffect(() => {
        if (refEditor.current) {
            const jc: JSONContent = {
                json: hMsg
            }
            refEditor.current.updateProps({content: jc})
        }

    }, [hMsg])

    const chat_items = hMsg.map((msg, index) => {
        return <ChatMsg msg={msg.content} role={msg.role} key={index} />
    });

    const rerange_message = (cur: TextContent, prev: TextContent, status: any) => {
        // console.log("cur: ", cur.text)
        try{
            const cur_json = JSON.parse(cur.text)
            setHMsg(cur_json)
        } catch (err) {
            console.error("json text error: ", err)
        }
    }


    const calculate_cur_ploads = () : PayloadDictionary => {
        let payloads = default_paylaods

        if (!!ploads) {
            try {
                payloads = eval(Function("return " + ploads)())
            } catch (err) {
                console.error(err)
                if (err instanceof Error) {
                    payloads.error = err.message
                }
            }
        }
        
        const p_list: Array<Msg_Type> = convert_pHis_to_mst()
        payloads.messages = p_list

        return payloads
    }

    const prompt_items = () => {
        const payloads_to_show = (p: PayloadDictionary) : Dict_str => {
            if (!!!p) {
                return {}
            }
            const cur_payloads: Dict_str = p as Dict_str
            const payloads_show: Dict_str = {}

            // TODO: ugly
            pa_order.forEach((key_name, index) => {
                payloads_show[key_name] = cur_payloads[key_name]
            })
            return payloads_show
        }
        

        const history_payloads_show = () => {
            const return_items: React.JSX.Element[] = []
            for(var i = hPloads.length - 1; i >= 0; i--) {
                return_items.push(
                    <li key={i + 1} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
                        <span className="inline-flex items-center bg-yellow-600 text-[#fff] text-xs font-bold px-4 rounded-full">
                            {i + 1}
                        </span>
                        <JsonView
                            src={payloads_to_show(hPloads[i])}
                            theme="github"
                            editable={false}
                            collapsed={true}
                            
                        />
                    </li>
                )
            }
            return return_items
        } 

        return (
            <ul className="w-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                <li key={0} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
                    <JsonView
                        src={payloads_to_show(calculate_cur_ploads())}
                        theme="github"
                        editable={false}
                        // onEdit={edit_f}
                    />
                </li>
                { history_payloads_show() }
            </ul>
        )
    }

    const drawer_setting_class = settingshow 
        ? "h-screen p-4 bg-slate-50 overflow-y-auto min-w-[400px] max-w-[400px] "
        : "h-screen p-4  hidden"
    
    const drawer_prompt_class = showprompt 
        ? "h-screen p-4 bg-slate-50 overflow-y-auto min-w-[400px] max-w-[400px] "
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
                            <label htmlFor="role_card" className="block mb-2 text-sm font-medium text-gray-900">设置</label>
                            <textarea id="role_card" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDict("ploads", event.target.value);} } 
                                value={ ploads }  rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write some"></textarea>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="role_card" className="block mb-2 text-sm font-medium text-gray-900">角色卡</label>
                            <textarea id="role_card" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDict("rolecard", event.target.value)} } 
                                value={ pHis.rolecard }  rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write some"></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="wcard_1" className="block mb-2 text-sm font-medium text-gray-900">世界书1</label>
                            <textarea id-="wcard_1" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDict("wcard1", event.target.value)} } 
                                value={pHis["wcard1"]} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="wcard_2" className="block mb-2 text-sm font-medium text-gray-900">世界书2</label>
                            <textarea id-="wcard_2" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDict("wcard2", event.target.value)} } 
                                value={pHis["wcard2"]} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>

                        </div>
                        <div className="mb-6">
                            <label htmlFor="wcard_3" className="block mb-2 text-sm font-medium text-gray-900">世界书3</label>
                            <textarea id-="wcard_3" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDict("wcard3", event.target.value)} } 
                                value={pHis["wcard3"]} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="rule_constraint" className="block mb-2 text-sm font-medium text-gray-900">规则限制</label>
                            <textarea id="rule_constraint" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDict("ruleconstraint", event.target.value)} } 
                                value={pHis["ruleconstraint"]} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="thought_chain" className="block mb-2 text-sm font-medium text-gray-900">思维链</label>
                            <textarea id="thought_chain" 
                                onChange={ (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDict("thoughtchain", event.target.value)} } 
                                value={pHis["thoughtchain"]} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something"></textarea>
                        </div>
                    </form>
                </div>

                <div className="flex justify-center flex-col px-10 py-10">
                    <div className="flex justify-between">
                        <div>
                            <button onClick={() => setSettingshow(true)} className="inline-block text-white bg-blue-300 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-1 mb-2 mr-3 cursor-pointer" type="button">
                                展示设置
                            </button>
                            <button onClick={() => setShowprompt(true)} className="inline-block text-white bg-blue-300 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-1 mb-2 mr-3 cursor-pointer" type="button">
                                展示发送提示词
                            </button>
                        </div>
                        
                        <div>
                            <button onClick={() => {clear_storage()}} className="inline-block text-white bg-red-300 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-1 mb-2 mr-3 cursor-pointer" type="button">
                                清除设置
                            </button>
                            <button onClick={() => {pop_last_chat()}} className="inline-block text-white bg-red-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-1 mb-2 mr-3 cursor-pointer" type="button">
                                删除最后一条记录
                            </button>
                        </div>
                    </div>
                    
                    <div className="grow mt-10 h-[500px] overflow-y-auto bg-indigo-50 px-10 py-5">
                        {chat_items}
                        { waitAi&&
                            <ChatMsg msg={"...wait"} role={"assistant"} key={-1} />
                        }
                    </div>

                    <div className="my-10">
                        <div className='flex justify-between'>
                            <span onClick={sendUMsg} className="inline-block px-5 mb-5 bg-blue-100 hover:bg-blue-200  rounded-lg w-fit cursor-pointer">pre send</span>
                            <span onClick={chat_with_msg} className="inline-block px-5 mb-5 bg-amber-200 hover:bg-amber-500  rounded-lg w-fit cursor-pointer">send</span>
                        </div>
                        
                        <textarea onChange={handleMessageChange} value={uMsg} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                    </div>
                </div>

                <div ref={refContainer} className="min-w-[600px] max-w-[600px] overflow-y-auto bg-indigo-50 px-5 py-3 my-10">
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