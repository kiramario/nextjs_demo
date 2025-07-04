"use client"
import * as React from "react"
import { sleep } from "@/_components/utils"
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"
import {foldNodeProp, foldInside, indentNodeProp} from "@codemirror/language"
import {javascript} from "@codemirror/lang-javascript"


/*
npm install @codemirror/lang-javascript
https://codemirror.net/examples/
*/


export default function Page() {
    const editorRef = React.useRef(null);

    React.useEffect(() => {
        const state = EditorState.create({
            doc: 'hello world!',
            extensions: [basicSetup],
        });
        const editor = new EditorView({
            doc: "hello",
            extensions: [
                basicSetup,
                javascript({typescript: true})
            ], 
            parent: document.body
        });
    }, [])

   
    return (
        <>
            <div className="w-1/2 mx-auto mb-6">
                <div ref={editorRef}></div>;
            </div>
        </>
    )
}