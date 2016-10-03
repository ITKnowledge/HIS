var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salespoulpeSchema = new Schema({
  datevente : String,
  nbrebarque : String,
  poids : String,
  valeur : String,
  site : String
});

var salespoulpeModel = mongoose.model('Salesepoulpe', salespoulpeSchema);

module.exports = salespoulpeModel;
