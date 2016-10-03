var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ventepoulpeSchema = new Schema({
   nbrebarque : String,
   poids : String,
   valeur : String,
   site : String
});

var ventepoulpeModel = mongoose.model('Ventepoulpe', ventepoulpeSchema);

module.exports = ventepoulpeModel;
