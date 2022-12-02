const router = require('express').Router();
const controller = require('../controllers/reminders');

router.post("/",controller.newReminder)
router.get("/",controller.getReminder)
router.get("/:id",controller.getByID)


router.put("/:id",controller.notAllow)
router.patch("/:id",controller.notAllow)
router.delete("/:id",controller.notAllow)

module.exports = router;
