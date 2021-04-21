const router = require("express").Router();
const db = require("../models")

router.get("/api/workouts", (req, res) => {
    console.log("hello");
    console.log(db.Workout);
    db.Workout.find({}).then(data => {
        console.log(data);
        res.json(data);
        
        }).catch(err => {
            res.status(400).json(err);   
        });     
});


router.post("/api/workouts", (req, res) => {
     db.Workout.create({}).then(data => {
         res.json(data);
        
        }).catch(err => {
            res.status(400).json(err);   
        });     
});

router.put("/api/workouts/:id", (req, res) => {

    db.Workout.findByIdAndUpdate(
        req.params.id,
        {
            $push:{exercise:req.body}
        },
        {
            new:true
        }
    ).then(data => {
        res.json(data);
       
       }).catch(err => {
           res.status(400).json(err);   
       });     
});
module.exports = router;





// const API = {
//     async getLastWorkout() {
//       let res;
//       try {
//         res = await fetch("/api/workouts");
//       } catch (err) {
//         console.log(err)
//       }
//       const json = await res.json();
  
//       return json[json.length - 1];
//     },
//     async addExercise(data) {
//       const id = location.search.split("=")[1];
  
//       const res = await fetch("/api/workouts/" + id, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//       });
  
//       const json = await res.json();
  
//       return json;
//     },
//     async createWorkout(data = {}) {
//       const res = await fetch("/api/workouts", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" }
//       });
  
//       const json = await res.json();
  
//       return json;
//     },
  
//     async getWorkoutsInRange() {
//       const res = await fetch(`/api/workouts/range`);
//       const json = await res.json();
  
//       return json;
//     },
//   };
  