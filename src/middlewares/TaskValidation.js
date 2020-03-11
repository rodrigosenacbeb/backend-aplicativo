const TaskModel = require('../models/TaskModel');
const { isPast, subHours } = require('date-fns');

const TaskValidation = async (req, res, next) => {
    const {type, title, description, when } = req.body;

    if(!type)
        return res.status(400).json({error: 'tipo é obrigatório'});
    else if(!title)
        return res.status(400).json({error: 'título é obrigatório'});
    else if(!description)
        return res.status(400).json({error: 'descrição é obrigatório'});
    else if(!when)
        return res.status(400).json({error: 'data e hora são obrigatórios'});
    else if(isPast(new Date(when)))
        return res.status(400).json({error: 'escolha uma data e hora futura'});
    else{

        let exists;

        if(req.params.id){
            exists = await TaskModel
            .findOne({'_id': {'$ne': req.params.id}, 
            'when': {'$eq': new Date(when)}})
        }else{
           exists = await TaskModel.findOne({
             when: { $eq: subHours(new Date(when), 3) }
           }); 
        }        

        if(exists)
            return res.status(400)
            .json({error: 'já tem uma tarefa nesse dia e horário'})

        next();
    }
}

module.exports = TaskValidation;