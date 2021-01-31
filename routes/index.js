var express = require('express');
var router = express.Router();

//Cliente de Mongo
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Servidor Express Listo <br>MC Carrillo- JC Delgado'});
});

router.get('/libreria', function (req, res){
    res.send("Bienvenidos - Libreria");
});

/******************* GENEROS ************************************/
/**************** consulta todos los generos ****************/
router.get('/libreria/generos', function (req, res) {
    try{
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje: "Error de la base de datos",
                        insertado: false
                    });
                } else {
                    console.log("Conectado al servidor")
                    var collection = db.collection('generos');
                    collection.find().toArray(function (err, result) {
                        if (err) {
                            res.status(500);
                            res.json({
                                mensaje: "Error de la base de datos",
                                insertado: false
                            });
                        } else {
                            res.status(200);
                            res.json(result);

                            // Cerrar el cliente
                            db.close();
                        }
                        // Cerrar el cliente
                        db.close();
                    });
                }
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** consulta genero por id ****************/
router.get('/libreria/genero/:id', function (req, res) {
    try{
        var IDGenero = require('mongodb').ObjectID(req.params.id);
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                console.log("Conectado al servidor")
                var collection = db.collection('generos');
                collection.find({_id: IDGenero}).toArray(function (err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            mensaje: "Error al consultar genero"
                        });
                    } else {
                        res.status(200);
                        res.json(result);
                    }
                    // Cerrar el cliente
                    db.close();
                });
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** consulta genero por codigo ****************/
router.get('/libreria/genero/codigo/:id', function (req, res) {
    try{
        var codigoGenero = req.params.id;
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                console.log("Conectado al servidor")
                console.log(codigoGenero)
                var collection = db.collection('generos');
                collection.find({"codigo": codigoGenero}).toArray(function (err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            mensaje: "Error al consultar genero"
                        });
                    } else {
                        res.status(200);
                        res.json(result);
                    }
                    // Cerrar el cliente
                    db.close();
                });
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** ingresar genero ****************/
router.post('/libreria/genero/', function (req, res) {
    try{
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                console.log("Conectado al servidor")
                var parametrosGenero = {
                    codigo: req.body.codigo,
                    descripcion: req.body.descripcion
                }
                var collection = db.collection('generos');
                collection.insert(parametrosGenero, function (err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            mensaje: "Error al ingresar nuevo genero",
                            insertado: false
                        });
                    } else {
                        res.status(200);
                        res.json({
                            mensaje: "Ingresado con éxito"
                        });
                    }
                    // Cerrar el cliente
                    db.close();
                });
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** modificar genero por id ****************/
router.put('/libreria/genero/:id', function (req, res) {
    try{
        var IDGenero = require('mongodb').ObjectID(req.params.id);
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                console.log("Conectado al servidor")
                var a1 = {
                    codigo: req.body.codigo,
                    descripcion: req.body.descripcion
                }
                var collection = db.collection('generos');
                collection.update({_id: IDGenero}, {$set: a1}, function (err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            mensaje: "Error al modificar genero",
                            modificado: false
                        });
                    } else {
                        res.status(200);
                        res.json({
                            mensaje: "Modificado con éxito"
                        });
                    }
                    // Cerrar el cliente
                    db.close();
                });
                //console.log(res)
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** eliminar genero por id ****************/
router.delete('/libreria/genero/:id', function (req, res) {
    try{
        var IDGenero = require('mongodb').ObjectID(req.params.id);
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje: "Error de la base de datos",
                        insertado: false
                    });
                } else {
                    console.log("Conectado al servidor")
                    var collection = db.collection('generos');
                    collection.remove({_id: IDGenero}, function (err, result) {

                        if (err) {
                            res.status(500);
                            res.json({
                                mensaje: "Error al borrar genero",
                                insertado: false
                            });
                        } else {
                            res.status(200);
                            res.json({
                                mensaje: "Genero eliminado con éxito"

                            });
                        }
                        // Cerrar el cliente
                        db.close();
                    });

                }
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})

/******************* LIBROS ************************************/
/**************** consulta todos los libros ****************/
router.get('/libreria/libros', function (req, res) {
    try{
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje: "Error de la base de datos",
                    });
                } else {
                    console.log("Conectado al servidor")
                    var collection = db.collection('libros');
                    collection.find().toArray(function (err, result) {
                        if (err) {
                            res.status(500);
                            res.json({
                                mensaje: "Error de la base de datos",
                            });
                        } else {
                                res.status(200);
                                res.json(result);
                            // Cerrar el cliente
                            db.close();
                        }
                        // Cerrar el cliente
                        db.close();
                    });
                }
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** consulta libros por id ****************/
router.get('/libreria/libro/:id', function (req, res) {
    try{
        var IDLibro = require('mongodb').ObjectID(req.params.id);
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                console.log("Conectado al servidor")
                var collection = db.collection('libros');
                collection.find({_id: IDLibro}).toArray(function (err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            mensaje: "Error al consultar libros"
                        });
                    } else {
                        res.status(200);
                        res.json(result);
                    }
                    // Cerrar el cliente
                    db.close();
                });
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** consulta libros por codigo ****************/
router.get('/libreria/genero/libro/:id', function (req, res) {
    try{
        var codigoLibro = req.params.id;
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                console.log("Conectado al servidor")
                console.log(codigoLibro)
                var collection = db.collection('libros');
                collection.find({"codigo": codigoLibro}).toArray(function (err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            mensaje: "Error al consultar genero"
                        });
                    } else {
                        res.status(200);
                        res.json(result);
                    }
                    // Cerrar el cliente
                    db.close();
                });
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** ingresar libros ****************/
router.post('/libreria/libro/', function (req, res) {
    try{
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                console.log("Conectado al servidor")
                var parametrosLibro = {
                    titulo: req.body.titulo,
                    isbn: req.body.isbn,
                    autor: req.body.autor,
                    genero: req.body.genero,
                    precio: req.body.precio
                }
                var collection = db.collection('libros');
                collection.insert(parametrosLibro, function (err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            mensaje: "Error al ingresar nuevo libro",
                            insertado: false
                        });
                    } else {
                        res.status(200);
                        res.json({
                            mensaje: "Libro ingresado con éxito"
                        });
                    }
                    // Cerrar el cliente
                    db.close();
                });
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** modificar libros por id ****************/
router.put('/libreria/libro/:id', function (req, res) {
    try{
        var IDLibro = require('mongodb').ObjectID(req.params.id);
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                console.log("Conectado al servidor")
                var a1 = {
                    titulo: req.body.titulo,
                    isbn: req.body.isbn,
                    autor: req.body.autor,
                    genero: req.body.genero,
                    precio: req.body.precio
                }
                var collection = db.collection('libros');
                collection.update({_id: IDLibro}, {$set: a1}, function (err, result) {
                    if (err) {
                        res.status(500);
                        res.json({
                            mensaje: "Error al modificar libro",
                            modificado: false
                        });
                    } else {
                        res.status(200);
                        res.json({
                            mensaje: "Modificado con éxito"
                        });
                    }
                    // Cerrar el cliente
                    db.close();
                });
                //console.log(res)
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
/**************** eliminar libros por id ****************/
router.delete('/libreria/libro/:id', function (req, res) {
    try{
        var IDGenero = require('mongodb').ObjectID(req.params.id);
        MongoClient.connect('mongodb://localhost:27017/libreria',
            function (err, db) {
                if (err) {
                    res.status(500);
                    res.json({
                        mensaje: "Error de la base de datos",
                        insertado: false
                    });
                } else {
                    console.log("Conectado al servidor")
                    var collection = db.collection('libros');
                    collection.remove({_id: IDGenero}, function (err, result) {

                        if (err) {
                            res.status(500);
                            res.json({
                                mensaje: "Error al eliminar libro",
                                insertado: false
                            });
                        } else {
                            res.status(200);
                            res.json({
                                mensaje: "Libro eliminado con éxito"

                            });
                        }
                        // Cerrar el cliente
                        db.close();
                    });

                }
            });
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Error del Servidor');
    }
})
module.exports = router;
