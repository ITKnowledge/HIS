var app = module.parent.exports.app;
var fichespoulpe = require('../models/fichespoulpe.js');

app.get('/listfichespoulpe', function(req, res){
    var msg = req.flash('message');
    fichespoulpe.find({}, function(err, docs){
        res.render('listfichespoulpe', { title: 'List 2016', fichespoulpe: docs, flashmsg: msg});
    });
});

app.get('/newfichepoulpe', function(req, res){
    req.flash('message', 'You visited /new');
    res.render('newfichepoulpe', { title: 'New'});
});

app.post('/insertfiche', function(req, res){
    console.log(req.body);
    var f = new fichespoulpe({
      datefiche: req.body.datefiche,
      nbrbarquesactif: req.body.nbrbarquesactif,
      site: req.body.site,
      engin: req.body.engin,
      noteur: req.body.noteur,
      echantillonneur: req.body.echantillonneur
     });
    f.save(function(err, doc){
        if(!err){
            res.redirect('/listfichespoulpe');
        } else {
            res.end(err);
        }
    });
});

app.get('/delete/:id', function(req, res){
    fichespoulpe.remove({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.redirect('/listfichespoulpe');
        } else {
            res.end(err);
        }
    });
});

app.get('/editfiche/:id', function(req, res){
  console.log('wafik edit fiche');
    fichespoulpe.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.render('editfichepoulpe', { title: 'Edit', fiche: doc});
        } else {
            res.end(err);
        }
    });
});

app.post('/editfiche/:id', function(req, res){
    fichespoulpe.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            doc.datefiche= req.body.datefiche;
            doc.nbrbarquesactif= req.body.nbrbarquesactif;
            doc.site= req.body.site;
            doc.engin= req.body.engin;
            doc.noteur= req.body.noteur;
            doc.echantillonneur= req.body.echantillonneur;
            doc.save(function(err, doc){
                if(!err){
                    res.redirect('/listfichespoulpe');
                } else {
                    res.end(err);
                }
            });
        } else {
            res.end(err);
        }
    });
});
