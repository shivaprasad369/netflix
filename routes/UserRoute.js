
const {addToLikedMovie, getLikedMovie, remove} =require('../controllers/UseController')

const router=require('express').Router();

router.post('/add',addToLikedMovie);
router.get('/liked/:email',getLikedMovie);
router.put('/delete',remove)
module.exports=router;