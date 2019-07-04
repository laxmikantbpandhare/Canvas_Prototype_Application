// var chai = require('chai'), chaiHttp = require('chai-http');

// chai.use(chaiHttp);

// var expect = chai.expect;

// it("Should check credentials and return status code", function(done){
//     chai.request('http://127.0.0.1:3001')
//     .post('/login')
//     .send({ "username": "992", "password" : "992"})
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         done();
//     });
// })
var assert = require('assert');
var supertest = require("supertest");
var should = require("should");


//var server = supertest.agent("http://localhost:3000");
var server = supertest.agent("http://13.52.177.109:3000/");

describe("Mocha unit test",function(){

    // #1 should return dashboard

    it("should hit dashboard",function(done){

        // calling login
        server
            .post("/login")
            .expect("Content-type",/json/)
            .send({
                sjsuId: '998',
                password: '992'
            })
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                console.log("test done");
                done();
            });
    });

});

describe("Mocha unit test",function(){

    // #1 should return dashboard

    it("should display Signup",function(done){

        // calling login
        server
            .post("/signup")
            .expect("Content-type",/json/)
            .send({
            })
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                console.log("test done");
                done();
            });
    });

});

describe("Mocha unit test",function(){

    // #1 should return dashboard

    it("should display quizcreation",function(done){

        // calling login
        server
            .post("/Dashboard/quizcreation")
            .expect("Content-type",/json/)
            .send({
            })
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                console.log("test done");
                done();
            });
    });

});


describe("Mocha unit test",function(){

    // #1 should return dashboard

    it("should display announcement",function(done){

        // calling login
        server
            .post("/Dashboard/announcement")
            .expect("Content-type",/json/)
            .send({
                sjsuId: '993'
            })
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                console.log("test done");
                done();
            });
    });

});


describe("Mocha unit test",function(){

    // #1 should return dashboard

    it("should display profiledetails",function(done){

        // calling login
        server
            .post("/Dashboard/accountprofile")
            .expect("Content-type",/json/)
            .send({
                sjsuId: '993'
            })
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                console.log("test done");
                done();
            });
    });

});


