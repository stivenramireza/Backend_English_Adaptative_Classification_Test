/**
 * /test/test.js
 * Basic tests for EACI Team App
 */
const chai = require('chai');
const expect = chai.expect;

const http = require('chai-http');

// Require user
const Student = require('./../app/models/student');
const Admin = require('../app/models/admin');

// App

const server = require('./../app/index');

// Http

chai.use(http);

// Tests

describe('EACI Team App Tests', () => {
    after((done) => {
        Student.find().deleteMany().then((res) => {
            done();
        }).catch(err => {
            console.log(err.message);
        });
    });
    it('Should exists', () => {
        expect(server).to.be.a('function');
    });
    it('GET / should return 200', (done) => {
        chai.request(server).get('/')
            .then((res) => {
                expect(res).to.have.status(200);
                done();
            }).catch(err => {
                console.log(err);
            });
    });
});


// Admin Registration

describe('Admin Registration', () => {
    it('Should return 200 and confirmation for valid input', (done) => {
        const new_user = {
            "doctype" : 1,
            "docnumber" : "1029472679",
            "adminType" : "General",
            "firstname" : "Sandra",
            "lastname" : "Gaviria",
            "genre" : 2,
            "birthdate" : "13/05/1980",
            "currentcity" : "Medellin",
            "address" : "Calle 49 B Sur # 41-116",
            "phonenumber" : "3017179748",
            "email" : "sgaviria4@eafit.edu.co",
            "username" : "sgaviria4",
            "password" : "sgaviria4"
        }
        chai.request(server).post('/api/register/admin')
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.equal('Registro exitoso del administrador');
                expect(res.body.errors.length).to.be.equal(0);
                done();
            }).catch(err => {
                console.log(err.message);
            });
    });
});

// Admin Login

