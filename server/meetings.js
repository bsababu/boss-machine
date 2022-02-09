const meetingsRouter = require('express').Router();

const  {getAllFromDatabase,addToDatabase, createMeeting, deleteAllFromDatabase} = require('./db.js');


meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});
meetingsRouter.post('/', (req, res, next) => {
    const meeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(meeting);
})
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.sendStatus(204);
});

module.exports = meetingsRouter;