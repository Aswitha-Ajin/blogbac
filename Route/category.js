const router = require("express").Router();
const Category = require("../Module/Category");

router.post("/", async (req, res) => {
    const newcat = new Category(req.body);
    try {
        const store = await newcat.save()
        res.status(200).json(store)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/", async (req, res) => {

    try {
        const stored = await Category.find()
        res.status(200).json(stored)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;