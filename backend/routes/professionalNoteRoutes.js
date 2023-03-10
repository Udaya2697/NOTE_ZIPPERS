const express =require("express")
const { getNotes,getNoteById,UpdateNote,DeleteNote }=require( "../controllers/professionalnoteController");
const { protect } = require("../middlewares/authMiddleware");
const {createNote} = require('../controllers/professionalnoteController')



const router = express.Router();
router.route('/getnote').get(protect, getNotes);
router.route('/professionalcreate').post(protect,createNote);
router.route('/:id').get(getNoteById).put(protect,UpdateNote).delete(protect,DeleteNote);



module.exports= router;