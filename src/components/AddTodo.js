import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { addNewTodo, getTodoQuery, getNonCompleteCount,setActiveMutation } from '../query/queries';
import { FiChevronDown } from 'react-icons/fi'
import './AddTodo.css'

export default function AddTodo() {
    const [text, setText] = useState("");
    const [active,setActive] = useState(false);
    const [addTodo] = useMutation(addNewTodo);
    const [setactive] = useMutation(setActiveMutation);

    const Handle = (e) => {
        e.preventDefault();
        console.log(text);
        addTodo({
            variables: {
                text: text
            },
            refetchQueries: [{ query: getTodoQuery }, { query: getNonCompleteCount }]
        });
        setText("");
    }
    const setActiveStatus=()=>{
        setactive({
            variables:{
                active:active
            },
            refetchQueries: [{ query: getTodoQuery }, { query: getNonCompleteCount }]
        })
        setActive((prev)=>!prev);
    }

    return (
        <form id='add-todo' onSubmit={(e) => Handle(e)}>
            <h1>todos</h1>
            <div id="input-holder">
            <FiChevronDown id="toggle-active" size={24} style={{opacity:`${active?"1":"0.5"}`}} onClick={setActiveStatus}/>
            <input id='new-todo' type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="What needs to be done?" required />
            </div>
        </form>
    )
}
