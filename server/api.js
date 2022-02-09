const express = require('express');
const apiRouter = express.Router();


const meetingsRouter = require('./meetings.js');
const ideasRouter = require('./ideas.js');
const minionsRouter = require('./minions.js');

apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/minions', minionsRouter);


module.exports = apiRouter;
