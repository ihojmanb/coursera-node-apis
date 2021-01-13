var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url = "http://localhost:3000/api/bicicletas";


describe('Bicicleta API', () =>{
    beforeAll(function(done) {
        mongoose.connection.close().then(() => {
            var mongoDB = 'mongodb://localhost/testdb';
            mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
            mongoose.set('useCreateIndex', true);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'MongoDB connection error: '));
            db.once('open', function () {
                console.log('We are connected to test database!');
                done();
            });
    
        });
    
    });
    
      afterEach(function(done){
        try{
          console.log('test terminado')
          Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
          })
        } catch (e){
          done.fail(e)
        }
      });
    describe('GET BICICLETAS /', ()=>{
        it('Status 200', (done) => {
            request.get(base_url, function(error, response, body){
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            })
        })
    })

    describe('POST BICICLETAS /create', ()=>{
        it('STATUS 200', (done) => {
            var headers = {'content-type': 'application/json'};
            var aBici = JSON.stringify({"id": 99, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54});
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);
                done();
            })
        })
    })
    describe('PUT BICICLETAS /update', ()=>{
        it('STATUS 200', (done) => {
            var a = new Bicicleta(10, 'negro', 'urbana', [32.0853123, 34.7818123]);
            Bicicleta.add(a);
            expect(Bicicleta.findById(10).color).toBe("negro");
            expect(Bicicleta.findById(10).modelo).toBe("urbana");
            var headers = {'content-type': 'application/json'};
            var updatedBici =JSON.stringify({
                "looking_id": 10,
                "id": 10,
                "color": "naranjo",
                "modelo": "carrera",
                "lat": 32.0813424,
                "lng": 34.799997
            });
            request.put({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/update',
                body: updatedBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("naranjo");
                expect(Bicicleta.findById(10).modelo).toBe("carrera");
                done();
            })
        })
    })

    describe('DELETE BICICLETAS /delete', ()=>{
        it('STATUS 204', () => {
            var headers = {'content-type': 'application/json'};
            var idToDelete = '{"id": 10}';
            request.delete({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/delete',
                body: idToDelete
            }, function(error, response, body){
                expect(response.statusCode).toBe(204);
            })
        })
    })
    

})