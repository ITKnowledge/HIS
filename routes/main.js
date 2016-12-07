var app = module.parent.exports.app;
var fichespoulpe = require('../models/fichespoulpe.js');
var salespoulpe = require('../models/salespoulpe.js');

/* GET home page. */
app.get('/home', function(req, res) {
  res.render('home', { title: 'Express sih' });
});

app.get('/index', function(req, res){

  fichespoulpe.find(function(err, result){
    res.render('index', {fep: result});
  });
});

app.get('/listventespoulpe', function(req, res){
  // var f = new salespoulpe({
  //   nbrebarque: "12",
  //   poids: "88",
  //   valeur: "12345",
  //   site: "dakhla"
  //  });
  // f.save(function(err, doc){
  //     if(!err){
  //       salespoulpe.find(function(err, result){
  //         res.render('listventespoulpe', {sales: result});
  //       });
  //     } else {
  //         res.end(err);
  //     }
  // });

  salespoulpe.find(function(err, result){
    res.render('listventespoulpe', {sales: result});
  });
});

app.get('/listfichespoulpe', function(req, res){
    var msg = req.flash('message');
    fichespoulpe.find({}, function(err, docs){
        res.render('listfichespoulpe', { title: 'List 2016', fichespoulpe: docs, flashmsg: msg});
    }).sort({ datefiche: 1 });
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


app.get('/detailfep/:id', function(req, res){

  fichespoulpe.findById(req.params.id, function(err, result){
    res.render('detailfep', {fep: result});
  });
});


app.get('/getdata/:id', function(req, res){

  fichespoulpe.findById(req.params.id , function(err, result){
    res.json(result.detail);
  });

});


app.post('/save/:id', function(req, res){
    var fepid = "";
   fichespoulpe.findById(req.params.id, function(err, fep){
      fepid = req.params.id;
      fep.detail = JSON.parse(req.body.obj);

      fep.update({
          detail: fep.detail
        },function (err, fepID){
          if(err){
            console.log('GET Error: There was a problem retrieving: ' + err);
            res.redirect('/detailfep/' + req.params.id);
          }else{
            res.redirect('/detailfep/' + fepid.toString());
          }
        })


   });


  //
  //
  // res.json(JSON.parse(req.body.obj));

});
