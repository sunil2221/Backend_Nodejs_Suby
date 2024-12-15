const express = require('express');
const firmContoller = require('../controllers/firmController')
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')

router.post("/add-firm", verifyToken, firmContoller.addFirm);
router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    req.headersSent("content-Type", "image/jpeg");
    res.sendFile(Path2D.join(__dirname, "..", "uploads", imageName));
});


router.delete("/:firmId", firmContoller.deleteFirmById);


module.exports = router;