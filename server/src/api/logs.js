const {Router} = require('express')
const router = Router();
const LogEntry = require('../models/LogEntry')

router.get('/', async (req,res) =>{
    try{
        const entries = await LogEntry.find();
    } catch(error){
        next(error);
    }
});

router.post('/', async (req,res, next) =>{
    try{
      const logEntry = new LogEntry(req.body);
      const createdEntry = await logEntry.save();
      res.json(createdEntry);
    } catch(error) {
        next(error);
    }
});

module.exports = router;
