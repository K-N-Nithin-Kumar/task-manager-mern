import React from 'react'
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import "./WorkoutDetails.css"
function WorkoutDetails({ work }) {

    const handle = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/tasks/' + work._id,
            {
                method: 'DELETE'
            })

        const res = response.json();

        if (response.ok) {
            alert("Task Deleted SuccesFully");
        }
        else {
            alert("Task Not Deleted");

        }

    }



    return (
        <div className="workout-details">
            <h1>{work.title}</h1>
            <p>
                <strong>ID:</strong> {work._id}
            </p>
            <p>
                <strong>Description:</strong> {work.loads}
            </p>
            <p>
                <strong>Weight: </strong>
                {work.reps}
            </p>

            <p><strong>Time: </strong>{formatDistanceToNow(new Date(work.createdAt),{addSuffix:true})}</p>

            <button className='btn' onClick={handle}>DeleteTask</button>
        </div>
    )
}

export default WorkoutDetails