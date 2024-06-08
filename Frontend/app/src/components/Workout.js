import React, { useState } from 'react'
import "./Workout.css"

function Workout() {

    const [title, setTitle] = useState("");
    const [loads, setLoads] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

    const handeler = async (e) => {


        e.preventDefault();

        if (!title || !loads || !reps) {
            alert("Please provide Valid Details")
        }

       
        const workout = { title, loads, reps };

        console.log(typeof(loads))
        //posting the data
        const response = await fetch("/api/tasks/", {
            method: 'POST',
            body: JSON.stringify(workout),
            headers:
            {
                'Content-Type': "application/json",
            }
        });



        const json = response.json();

        if (response.ok) {

            setError(null);
            setLoads("");
            setReps("");
            setTitle("");
            alert("Task Added SuccesFully");
            console.log("New Task  Added", json);
        }
        else if (!response.ok) {
            setError(response.error);
        }
    }


    return (
        <div className='container'>
            {/* to take input data */}
            <h3>Add a New Task</h3>
            <form className='create' onSubmit={handeler}>
                <label>Add the new Title:</label>
                <input type='text' onChange={(e) => setTitle(e.target.value)}></input>

                <label>Add the description</label>
                <input type="text" onChange={(e) => setLoads(e.target.value)}></input>


                <label>Add the weight for task:</label>
                <input type="number" onChange={(e) => setReps(e.target.value)}></input>


                <button>Add New Task</button>
                {
                    error && <div className='error'>{error}</div>
                }
            </form>

        </div>
    )
}

export default Workout