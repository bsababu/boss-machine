const express = require('express');
const apiRouter = express.Router();
const app = express();

const meetingsRouter = require('./meetings.js');
const ideasRouter = require('./ideas.js');
const minionsRouter = require('./minions.js');

app.use('/meetings', meetingsRouter);
app.use('/ideas', ideasRouter);
app.use('/minions', minionsRouter);


module.exports = apiRouter;
