import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import './ShowTodoList.css'
import { getTodoQuery, deleteTodo, toogleActive, getNonCompleteCount, deleteCompletedTodo,updateTodo } from '../query/queries'

export default function ShowTodoList() {
    const [showType, setShowType] = useState(0);
    const [edit,setEdit] = useState(false);
    const [editData,setEditData] = useState();
    const [editId,setEditId] = useState(-1);
    const { loading, error, data } = useQuery(getTodoQuery);
    const data2 = useQuery(getNonCompleteCount);

    const [deletetodo] = useMutation(deleteTodo);
    const [toogleactive] = useMutation(toogleActive);
    const [deletecompletedtodo] = useMutation(deleteCompletedTodo);
    const [updatetodo] = useMutation(updateTodo);


    const handleDelete = (id) => {
        console.log(id)
        deletetodo({
            variables: {
                id: id
            },
            refetchQueries: [{ query: getTodoQuery }, { query: getNonCompleteCount }]
        })
    }

    const handleToggle = (id, active) => {
        console.log(id)
        toogleactive({
            variables: {
                id: id,
                active: active
            },
            refetchQueries: [{ query: getTodoQuery }, { query: getNonCompleteCount }]
        })
    }

    const handleDeleteComplete = () => {
        console.log("comp");
        deletecompletedtodo({
            refetchQueries: [{ query: getTodoQuery }, { query: getNonCompleteCount }]
        })
    }

    const handleUpdate = (e,id) =>{
        e.preventDefault();
        updatetodo({
            variables:{
                id:id,
                text:editData
            },
            refetchQueries: [{ query: getTodoQuery }, { query: getNonCompleteCount }]

        })
        console.log(id,editData);
        setEdit(false);
    }

    if (loading) return "";
    else if (error) return `Error ${error}`;
    else if (data2.loading) return "";
    else if (data2.error) return `Error ${data2.error}`;
    console.log(data, data2.data);
    return (
        <div id="show-list">
            {
                data.todo.map(ele => {
                    if (showType === 0) {
                        return <div className="show-ele" key={ele.id}>
                            <div className="mark" style={{display:`${edit&&(editId===ele.id)?"none":"flex"}`}} onClick={() => handleToggle(ele.id, !ele.active)}>
                                {ele.active ? "" : <AiOutlineCheck size={24} />}
                            </div>
                            <div className="text" style={{display:`${edit&&(editId===ele.id)?"none":"block"}`}} onDoubleClick={()=>{setEdit(true);setEditData(ele.text);setEditId(ele.id)}}>
                                {ele.text}
                            </div>
                            <form style={{width:"100%",display:`${edit&&(editId===ele.id)?"block":"none"}`}} onSubmit={(e)=>handleUpdate(e,ele.id)}>
                                <input type="text" id="editable" value={editData} onChange={(e) => setEditData(e.target.value)} required/>
                            </form>
                            <div className="delete">
                                <AiOutlineClose size={22} onClick={() => handleDelete(ele.id)} style={{display:`${edit&&(editId===ele.id)?"none":"block"}`}}/>
                            </div>
                        </div>

                    }
                    else if (showType === 1 && ele.active === true) {
                        return <div className="show-ele" key={ele.id}>
                        <div className="mark" style={{display:`${edit&&(editId===ele.id)?"none":"flex"}`}} onClick={() => handleToggle(ele.id, !ele.active)}>
                            {ele.active ? "" : <AiOutlineCheck size={24} />}
                        </div>
                        <div className="text" style={{display:`${edit&&(editId===ele.id)?"none":"block"}`}} onDoubleClick={()=>{setEdit(true);setEditData(ele.text);setEditId(ele.id)}}>
                            {ele.text}
                        </div>
                        <form style={{width:"100%",display:`${edit&&(editId===ele.id)?"block":"none"}`}} onSubmit={(e)=>handleUpdate(e,ele.id)}>
                            <input type="text" id="editable" value={editData} onChange={(e) => setEditData(e.target.value)} required/>
                        </form>
                        <div className="delete">
                            <AiOutlineClose size={22} onClick={() => handleDelete(ele.id)} style={{display:`${edit&&(editId===ele.id)?"none":"block"}`}}/>
                        </div>
                    </div>
                    }
                    else if (showType === 2 && ele.active === false) {
                        return <div className="show-ele" key={ele.id}>
                        <div className="mark" style={{display:`${edit&&(editId===ele.id)?"none":"flex"}`}} onClick={() => handleToggle(ele.id, !ele.active)}>
                            {ele.active ? "" : <AiOutlineCheck size={24} />}
                        </div>
                        <div className="text" style={{display:`${edit&&(editId===ele.id)?"none":"block"}`}} onDoubleClick={()=>{setEdit(true);setEditData(ele.text);setEditId(ele.id)}}>
                            {ele.text}
                        </div>
                        <form style={{width:"100%",display:`${edit&&(editId===ele.id)?"block":"none"}`}} onSubmit={(e)=>handleUpdate(e,ele.id)}>
                            <input type="text" id="editable" value={editData} onChange={(e) => setEditData(e.target.value)} required/>
                        </form>
                        <div className="delete">
                            <AiOutlineClose size={22} onClick={() => handleDelete(ele.id)} style={{display:`${edit&&(editId===ele.id)?"none":"block"}`}}/>
                        </div>
                    </div>
                    }
                })
            }
            <div id="show-footer">
                <div>
                    {data2.data.todo_aggregate.aggregate.count} items left
                </div>
                <div>
                    <button onClick={() => setShowType(0)} style={{border:`${showType===0?"1px solid black":"none"}`}}>All</button>
                    <button onClick={() => setShowType(1)} style={{border:`${showType===1?"1px solid black":"none"}`}}>Active</button>
                    <button onClick={() => setShowType(2)} style={{border:`${showType===2?"1px solid black":"none"}`}}>Completed</button>
                </div>
                <div>
                    <button onClick={handleDeleteComplete}>Clear Completed</button>
                </div>
            </div>

        </div>
    )
}
