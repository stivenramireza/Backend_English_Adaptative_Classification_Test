/**
 * /test/test.js
 * Basic tests for EACI Team App
 */
const chai = require('chai');
const expect = chai.expect;

const http = require('chai-http');

// Require user
const Student = require('./../app/models/student');


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

describe('Student Registration', () => {
    it('Should return 201 and confirmation for valid input', (done) => {
        const new_user = {
            "doctype": 1,
	        "docnumber": 1036965733,
	        "firstname": "Anderson Daniel",
	        "lastname": "Grajales Alzate",
	        "genre": 1,
	        "birthdate": "25/01/1999",
	        "currentcity": "Medellin",
	        "address": "Corregimiento Santa Elena - Vereda Mazo",
	        "phonenumber": "3128149251",
	        "email": "agrajal7@eafit.edu.co"
        }
        chai.request(server).post('/student/register')
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(201);
                expect(res.body.message).to.be.equal("Student created!");
                expect(res.body.errors.length).to.be.equal(0);
                // Validate creation
                expect(res.body.student._id).to.exist;
                expect(res.body.student.createdAt).to.exist;
                //validation to confirm password is encrypted
                done();
            }).catch(err => {
                console.log(err.message);
            });
    });
});

// User Login
describe('Student Login', () => {
    it('should return 200 and token for valid credentials', (done) => {
        const credentials = {
            "doctype": 1,
            "docnumber": 1036965733
        }
        chai.request(server).post('/student/login')
            .send(credentials)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body.token).to.exist;
                expect(res.body.message).to.be.equal("Student authenticated.");
                expect(res.body.errors.length).to.be.equal(0);
                done();
            }).catch(err => {
                console.log(err.message);
            });
    });
});


describe('User Profile', () => {
    it('should return 200 and user name', (done) => {
        const data = {
            "email": "agrajal7@eafit.edu.co"
        }
        chai.request(server).post('/user')
        .send(data)
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        }).catch(err => {
            console.log("Error: " +err);
        });
    });
});