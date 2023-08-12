import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from "../database/data.js";

//get all questions
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

//insert all questions
export async function insertQuestions(req, res) {
  try {
    Questions.insertMany({ questions, answers })
      .then(function (err, data) {
        res.json({ message: "Data Saved Successfully" });
      })
      .catch((error) => res.json({ error }));
  } catch (error) {
    res.json({ error });
  }
}

//delete all questions
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany()
    res.json({ message : "Questions Deleted Successfully"})
  } catch (error) {
    res.json({ error })
  }
}

//get all result
export async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json(r)
  } catch (error) {
    res.json({ error })
  }
}

//post all result
export async function storeResult(req, res) {
  try {
    const {username, result, attempts, points, achieved} = req.body
    if (!username && !result) throw new Error("Data not provided");

    Results.create({username, result, attempts, points, achieved}).then( function(err, data){
        res.json({ message: "Result saved successfully" })
    }).catch((error)=>res.json({ error })) 
       
 
  } catch (error) {
    res.json({ error})
  }
}


//delete result
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ message : "Results deleted succesfully"})
  } catch (error) {
    res.json({ error })
  }
}
