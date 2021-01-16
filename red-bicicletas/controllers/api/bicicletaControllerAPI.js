var Bicicleta = require('../../models/bicicleta');

// exports.bicicleta_list = function(req, res){
//     res.status(200).json({
//         bicicletas: Bicicleta.allBicis
//     });
// }
exports.bicicleta_list = function(req, res){
    Bicicleta.find({}, function(err, bicicletas){
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
};


exports.bicicleta_create = function(req, res){
    let bici = new Bicicleta({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
      });

      bici.save(function(err){
        res.status(200).json(bici);
    });
};
// exports.bicicleta_create = function (req, res) {
//     let bici = new Bicicleta({
//       code: req.body.code,
//       color: req.body.color,
//       modelo: req.body.modelo,
//       ubicacion: [req.body.lat, req.body.lng]
//     });
//     Bicicleta.add(bici)
  
//     bici.save(function(err){
//         res.status(200).json({
//             bicicleta: bici
//         });
//     });
//     // res.status(200).json({
//     //   bicicleta: bici
//     // })
//   }

exports.bicicleta_delete = function(req, res){
    Bicicleta.removeById(req.body.id);

    res.status(204).send();
}

exports.bicicleta_update = function(req, res){
    // var c = ((a < b) ? 'minor' : 'major');
    var bici = Bicicleta.findById(req.body.looking_id); // entrega una copia local o una referencia al objeto?
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    res.status(200).json({
        bicicleta: bici,
    });
}
