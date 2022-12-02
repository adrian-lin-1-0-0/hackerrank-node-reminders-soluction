const Reminders = require('../models/reminders');
const { Op } = require('sequelize');

function notAllow(req, res) {
    res.status(405).end()
}

async function getReminder(req, res) {
    let after = req.query.after
    let user = req.query.user
    let andArr = []
    let query = {

    }

    if (user) {
        andArr.push({
            user: user
        })
    }

    if (after) {
        andArr.push({
            date: {
                [Op.gte]: new Date(Number(after))
            }
        })
    }

    if (andArr.length>0){
        query = {
            [Op.and]:andArr
        }
    }

    try {
        var remainder = await Reminders.findAll({
            where: query
        })

    } catch (err) {

    }
    return res.json(remainder)
}

async function newReminder(req, res) {
    let data = req.body

    const newReminder = {}
    newReminder.user = data.user
    newReminder.description = data.description ?? ""
    newReminder.date = data.date ?? new Date()

    try {
        var remainder = await Reminders.create(newReminder)
    } catch (err) {
        console.log(err)
        return   res.status(500).end()
    }
    return res.status(201).json(remainder);
}

async function getByID(req, res) {
    let id = req.params.id

    try {
        var remainder = await Reminders.findOne({
            where: { id: id }
        })

    } catch (err) {
        return res.status(500).end()
    }

    if (!remainder) {
        return res.status(404).send("ID not found")
    }
    return res.json(remainder)
}


module.exports = {
    notAllow,
    newReminder,
    getByID,
    getReminder
}
