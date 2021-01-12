var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', () =>{
    describe('GET BICICLETAS /', ()=>{
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'negro', 'urbana', [32.0853123, 34.7818123]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            })
        })
    })

    describe('POST BICICLETAS /create', ()=>{
        it('STATUS 200', (done) => {
            var headers = {'content-type': 'application/json'};
            var aBici = JSON.stringify({"id": 99, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54});
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(99).color).toBe("rojo");
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