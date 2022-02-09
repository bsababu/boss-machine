const minionsRouter = require('express').Router();

const {addToDatabase,getAllFromDatabase,getFromDatabaseById,updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db');

minionsRouter.param('minionsId', (req, res, next, id) => {
    const min = getFromDatabaseById('minions', id);
    if(min) {
        req.min = min;
        next();
    } else {
        res.sendStatus(404);
    }
})
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
})

minionsRouter.post('/', (req, res, next) => {
    const newMin = addToDatabase('minions', req.body);
    res.status(201).status(newMin);
})
minionsRouter.get('/:minionsId', (req, res, next) => {
    res.send(req.min);
})
minionsRouter.put('/:minionsId', (req, res, next) => {
    let updateMin = updateInstanceInDatabase('minions', req.body);
    res.send(updateMin);
})

minionsRouter.delete('/:minionsId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionsId);
    if (deleteMinion) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});


//----------------------Work--------------------

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
  });

minionsRouter.get('/:minionsId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
  });
  
  minionsRouter.post('/:minionsId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
  });
  
  
  minionsRouter.put('/:minionsId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      updatedWork = updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
    }
  });
  
  minionsRouter.delete('/:minionsId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });



module.exports = minionsRouter;