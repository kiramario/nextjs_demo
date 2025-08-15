/* eslint-disable */
"use client"
import * as React from "react"


// EXPERIMENT
interface State_Value {
    fake: number
}


interface State {
    parent?: State_Value
    children?: Array<State_Value>
    id: string
    s_v: State_Value
}

interface GF_State_V extends State_Value {
    count: number
}

interface F_State_V extends State_Value {
    num: number
}

interface C_State_V extends State_Value {
    click_time: number
}
// EXPERIMENT



interface The_State {
    num: number
    count: number
    click_time: number
}

export enum ActionKind {
    ACTION_1 = 'action_1',
    ACTION_2 = 'action_2',
    ACTION_3 = 'action_3',
}

// An interface for our actions
interface Action {
    type: string;
    doF: (p_v: any) => any;
}

const countReducer: React.Reducer<The_State, Action> = (state: The_State, action: Partial<Action>) => {
    const realDoF = action.doF ?? ((v) => v)

    switch (action.type) {
        case ActionKind.ACTION_1:
            return {
                ...state,
                count: realDoF(state.count)
            };
        case ActionKind.ACTION_2:
            return {
                ...state,
                num: realDoF(state.num)
            };
        case ActionKind.ACTION_3:
            return {
                ...state,
                click_time: realDoF(state.click_time)
            };
    }
    throw Error('Unknown action: ' + action.type);
}

//  Context
export interface CountContextType {
    state: The_State;
    dispatch: (action: Action) => void;
}

export const CountContext = React.createContext<CountContextType>({} as CountContextType);

//  useContext
export const useCountContext = () => {
    const context = React.useContext(CountContext);
    if (context === undefined) {
        throw new Error("useCountContext must be used within a MVPContext.Provider");
    }
    return context;
};


const Grand_Father = ({ children }: {children: React.JSX.Element}) => {

    const {state, dispatch} = useCountContext()
    const click_fn = async () => {
        dispatch({
            type: ActionKind.ACTION_1,
            doF: (p_v: number) => p_v + 1
        })
        dispatch({
            type: ActionKind.ACTION_2,
            doF: (p_v: number) => p_v + 1
        })
        dispatch({
            type: ActionKind.ACTION_3,
            doF: (p_v: number) => p_v + 1
        })
    }

    return (
        <>
            <div className="flex justify-between border-1 border-gray-800 p-3 w-[300px]">
                <button onClick={click_fn} className="text-white px-3 py-1 bg-blue-400 rounded-xl cursor-pointer">grand father click</button>
                <span>{state.count}</span>
            </div>
            {children}
        </>
    )
}

const Father = ({ children }: {children: React.JSX.Element}) => {
    const {state, dispatch} = useCountContext()
    const click_fn = async () => {
        dispatch({
            type: ActionKind.ACTION_2,
            doF: (p_v: number) => p_v + 1
        })
        dispatch({
            type: ActionKind.ACTION_3,
            doF: (p_v: number) => p_v + 1
        })
    }
    return (
        <>
            <div className="flex justify-between border-1 border-gray-600 p-3 w-[300px]">
                <button onClick={click_fn} className="text-white px-3 py-1 bg-blue-300 rounded-xl cursor-pointer">father click</button>
                <span>{state.num}</span>
            </div>
            {children}
        </>
    )
}

const Children = () => {
    const {state, dispatch} = useCountContext()
    const click_fn = async () => {
        dispatch({
            type: ActionKind.ACTION_3,
            doF: (p_v: number) => p_v + 1
        })
    }

    return (
        <>
            <div className="flex justify-between border-1 border-gray-400 p-3 w-[300px]">
                <button onClick={click_fn} className="text-white px-3 py-1 bg-blue-200 rounded-xl cursor-pointer">children click</button>
                <span>{state.click_time}</span>
            </div>
        </>
    )
}

export default function Page() {
    React.useEffect(() => {
        
        
    }, [])

    const [state, dispatch] = React.useReducer(countReducer, {
        count: 0,
        num: 0,
        click_time: 0
    } as The_State);

    return (
        <>
            <h1 className="text-center text-xl font-bold">app/demo/context_reducer page</h1>

            <p>点击累计1</p>
            <p>父级点击子也要累计1</p>
            <div className="h-screen flex items-center justify-center">
                <CountContext.Provider value={{state, dispatch}}>
                    <Grand_Father>
                        <Father>
                            <Children />
                        </Father>
                    </Grand_Father>
                </CountContext.Provider>
                FUCNK YOU 
            </div>
            
        </>
    )
}