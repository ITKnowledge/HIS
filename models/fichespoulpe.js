var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ficheSchema = new Schema({
  datefiche: String,
	nbrbarquesactif: Number,
	site: String,
	engin: String,
	noteur: String,
	echantillonneur: String
});

var ficheModel = mongoose.model('Fichespoulpedb', ficheSchema);

module.exports = ficheModel;
