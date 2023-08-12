import { Router } from "express";
const router = Router();

//import controllers
import * as controller from "../controllers/controller.js";

//Questions Routes

//instead of this
// router.get('/questions', controller.getQuestions)
// router.post('/questions', controller.insertQuestions)

//use chaining
router
  .route("/questions")
  .get(controller.getQuestions)
  .post(controller.insertQuestions)
  .delete(controller.dropQuestions);

router
  .route("/result")
  .get(controller.getResult)
  .post(controller.storeResult)
  .delete(controller.dropResult);
export default router;
