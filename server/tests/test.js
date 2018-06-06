import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);


// Redirect to API v1
describe('GET /', () => {
  it('should get home', () => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.type).to.eqls('text/html');
      });
  });
});

// GET /api/v1
describe('GET /api/v1', () => {
  it('should get home', () => {
    chai.request(server)
      .get('/api/v1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.type).to.eqls('text/html');
      });
  });
});

//  API DOCS
describe('GET docs/', () => {
  it('should return 200', (done) => {
    chai.request(server)
      .get('/api-docs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.type).to.eqls('text/html');
        done();
      });
  });
});

//  Get 404
describe('GET page not found', () => {
  it('should return 200', (done) => {
    chai.request(server)
      .get('/api/v1/kjdfkj/wkbw')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.eqls('Not found');
        done();
      });
  });
});
