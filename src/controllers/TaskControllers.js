const { 
    subHours, 
    endOfDay, 
    startOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
 } = require('date-fns');
const TaskModel = require('../models/TaskModel');

class TaskControllers {
    async create(req, res){
        const { type, title, description, when } = req.body;
        
        const task = new TaskModel({
            type,
            title,
            description,
            when: subHours(new Date(when), 3)
        });
        await task.save()
        .then(response => {
            return res.json(response);
        })
        .catch(error => {
            return res.json(error);
        });        
    }

    async all(req, res){
        await TaskModel.find().sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }

    async show(req, res){
        await TaskModel.findById(req.params.id)
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
    }

    async update(req, res){
        await TaskModel
        .findByIdAndUpdate(
            {'_id': req.params.id},
            req.body, 
            {new: true})
        .then(task => {
            return res.status(200).json(task); 
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(task => {
            return res.status(200).json(task);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }

    async done(req, res){
        await TaskModel
        .findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(400).json(error);
            })
    }

    async today(req, res){
        const current = new Date();

        await TaskModel
        .find({
            'when': {'$gte': startOfDay(current), 
            '$lt': endOfDay(current) }})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
    }

    async week(req, res){
        const current = new Date();

        await TaskModel
        .find({
            'when': {'$gte': startOfWeek(current), 
            '$lt': endOfWeek(current) }})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
    }

    async month(req, res){
        const current = new Date();

        await TaskModel
        .find({
            'when': {'$gte': startOfMonth(current), 
            '$lt': endOfMonth(current) }})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
    }

    async year(req, res){
        const current = new Date();

        await TaskModel
        .find({
            'when': {'$gte': startOfYear(current), 
            '$lt': endOfYear(current) }})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
    }

    async late(req, res){
        const current = new Date();

        await TaskModel
        .find({'when': {'$lt': current}, 'done': false})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
    }
}


module.exports = new TaskControllers();