const router = require("express").Router();
const db = require("../models");

//api route to get all added info from collection in mongoDB
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
//this request takes in the total duration and adds it to the data field. 
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate(
    [
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" }
        }
      }
    ]).then(dbWorkout => {
      // console.log(JSON.stringify(dbWorkout, null, 2));
      // console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
// this put request searches for the id of the collection and updates according to the data added in the models/workout.js file. 
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//this request will now take in the total duration and display in a chart on the stats page. 
router.get("/api/workouts/range", (req, res) => {
db.Workout.aggregate(
  [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ]).sort({_id:-1}).limit(7).then(dbWorkout => {
    // console.log(JSON.stringify(dbWorkout, null, 2));
    // console.log(dbWorkout);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
})

module.exports = router;