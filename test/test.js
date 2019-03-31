/**
 * /test/test.js
 * Basic tests for EACI Team App
 */
const chai = require('chai');
const expect = chai.expect;

const http = require('chai-http');

// Require user
const User = require('./../app/models/user');


// App

const server = require('./../app/index');

// Http

chai.use(http);

// Tests

describe('EACI Team App Tests', () => {
    after((done) => {
        User.find().deleteMany().then((res) => {
            done();
        }).catch(err => {
            console.log(err.message);
        });
    });
    it('Should exists', () => {
        expect(server).to.be.a('function');
    });
    it('GET / should return 200 and message', (done) => {
        chai.request(server).get('/')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.contain('EACI');
                done();
            }).catch(err => {
                console.log(err);
            });
    });
});

describe('User Registration', () => {
    it('Should return 201 and confirmation for valid input', (done) => {
        const new_user = {
            "firstname": "Anderson Daniel",
            "lastname": "Grajales Alzate",
            "username": "agrajal7",
            "doctype": 1,
            "docnumber": 1001100110,
            "birthdate": new Date(),
            "maritalstatus": 1,
            "email": "agrajal7@eafit.edu.co",
            "password": "123Pass"
        }
        chai.request(server).post('/user/register')
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(201);
                expect(res.body.message).to.be.equal("User created!");
                expect(res.body.errors.length).to.be.equal(0);
                // Validate creation
                expect(res.body.user._id).to.exist;
                expect(res.body.user.createdAt).to.exist;
                //validation to confirm password is encrypted
                expect(res.body.user.password).to.not.be.eql(new_user.password);
                done();
            }).catch(err => {
                console.log(err.message);
            });
    });
});

// User Login
describe('User Login', () => {
    it('should return 200 and token for valid credentials', (done) => {
        const credentials = {
            "email": "agrajal7@eafit.edu.co",
            "password": "123Pass"
        }
        chai.request(server).post('/user/login')
            .send(credentials)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body.token).to.exist;
                expect(res.body.message).to.be.equal("User Authenticated.");
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