const Workout = require("../models/Workout");
const mongoose = require("mongoose");


const getWorkouts = async (req, res) => {
    const Allworkout = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(Allworkout);
}




const getWorkout = async (req, res) => {
    const { id } = req.params;

    //if object id is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid Object Id" });
    }

    // if id is valid
    //check whether id exist in  database or not

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: "Task Not found" });
    }

    //if founded
    res.status(200).json(workout);

}




const createWorkout = async (req, res) => 
{

    const { title, reps, loads } = req.body;
   
    try {
        const workout = await Workout.create({ title, reps, loads });
        res.status(200).json(workout);
    }

    catch (err) {
        res.status(400).json({ err })
    }
}



const deleteworkout = async (req, res) => {
    const { id } = req.params;

    //if object id is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid Object Id" });
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
        return res.status(404).json({ error: "Task Not found" });
    }

    //if founded
    res.status(200).json(workout);
}




const updateWorkout = async (req, res) => {
    const { id } = req.params;

    //if object id is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid Object Id" });
    }

    //this updates the value
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!workout) {
        return res.status(400).json({ error: "Task Not found" });
    }

    //if founded
    res.status(200).json(workout);
}



module.exports = { createWorkout, getWorkouts, getWorkout, deleteworkout, updateWorkout }
