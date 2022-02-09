const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {addToDatabase, getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase,
    deleteFromDatabasebyId} = require('./db.js');

const checkIdea = require('./checkMillionDollarIdea.js');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea) {
        req.idea = idea;
        next();
    } else {
        res.sendStatus(404);
    }
})

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});
ideasRouter.post('/', checkIdea, (req, res, next) => {
    const idea = addToDatabase('Ideas', req.body);
    res.status(201).send(idea);
})
ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
});
ideasRouter.put('/:id', (req, res, next) => {
    const updateIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updateIdea);
});
ideasRouter.delete('/:id', (req, res, next) => {
    const deleteIdea = deleteFromDatabasebyId('idea', req.params.id);
    if (deleteIdea) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});