const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Please add a type of exercise."
            },
            name: {
                type: String,
                trim: true,
                required: "Please add the name of the exercise."
            },

            weight: {
                type: Number
            },

            sets: {
                type: Number
            },
            reps: {
                type: Number
            },
            duration: {
                type: Number,
                required: "Please add the duration of the exercise."
            },
            distance: {
                type: Number
            }
        }
    ]
});



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;