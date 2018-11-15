const mongoose = require('mongoose');

module.exports = function(req,res,next){
    if(!mongoose.Types.ObjectID.isValid(req.params.id))
        return res.status(404).send('Invalid ID.');

    next();
};