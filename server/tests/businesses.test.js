import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxMTk0MTE0LCJleHAiOjcwMjI0MDM3MTR9.jnrbW_TXHJ-0QBBsGvMa7Zq-3egs7yToSm-EL-OCv2w';

const Business = {
  name: `Moremi Gloals ${Math.random() * 100}`,
  details: 'Best Ict Resources',
  location: 'lagos',
  category: 'ICT',
};

//  Get all businesses
describe('GET businesses/', () => {
  it('should get all businesses', (done) => {
    chai.request(server)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Businesses Found');
        done();
      });
  });
});

// Get Individual Business
describe('GET One Business', () => {
  it('should be able to get a business', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Business found');
        done();
      });
  });

  it('should return business not found', (done) => {
    chai.request(server)
      .get('/api/v1/businesses/14')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Business not found');
        done();
      });
  });
});

//  Add a business
describe('POST businesses/', () => {
  it('should be able to register a business', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send(Business)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Business Created');
        done();
      });
  });

  it('should be able to register a business', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        name: 'Lorem 22',
        details: 'lorem ipsum',
        location: 'Calabar',
        category: 'lore'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Business Created');
        done();
      });
  });

  it('should return 400 if no business name', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        details: 'Best Ict Resources',
        location: 'lagos',
        category: 'ICT',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Some fields missing');
        done();
      });
  });
  it('should return 400 if name is undefined', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        name: undefined,
        details: 'Best Ict Resources',
        location: 'lagos',
        category: 'ICT',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Some fields missing');
        done();
      });
  });
  it('should return 400 if name is empty', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        name: '',
        details: 'Best Ict Resources',
        location: 'lagos',
        category: 'ICT',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Some fields missing');
        done();
      });
  });
  it('should return 400 if name is empty', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        name: '',
        details: '',
        location: '',
        category: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Some fields missing');
        done();
      });
  });
  it('should return 400 if name is empty', (done) => {
    chai.request(server)
      .post('/api/v1/businesses')
      .set('x-access-token', 'token-cncn')
      .send({
        name: 'lorem',
        details: 'lorem',
        location: 'lorem',
        category: 'lorem',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('User not logged in');
        done();
      });
  });
});

//  Update a business
describe('PUT businesses/1', () => {
  it('should be able to update a business', (done) => {
    chai.request(server)
      .put('/api/v1/businesses/1')
      .set('x-access-token', token)
      .send({
        name: 'Rotimi Texh',
        details: 'Software company',
        location: 'lagos',
        category: 'ICT',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Business updated');
        done();
      });
  });
  it('should return 404, if business cannot be found', (done) => {
    chai.request(server)
      .put('/api/v1/businesses/1939')
      .set('x-access-token', token)
      .send({
        name: 'Rotimi Texh',
        details: 'Software company',
        location: 'lagos',
        category: 'ICT',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Business not found');
        done();
      });
  });
  it('should return, You do not have permission to update', (done) => {
    chai.request(server)
      .put('/api/v1/businesses/2')
      .set('x-access-token', token)
      .send({
        name: 'Tecka',
        details: 'Software company',
        location: 'lagos',
        category: 'ICT',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('You do not have the permission to update this business');
        done();
      });
  });
  it('should return, Business Name Already exists', (done) => {
    chai.request(server)
      .put('/api/v1/businesses/1')
      .set('x-access-token', token)
      .send({
        name: 'Flutterwave',
        details: 'Software company',
        location: 'lagos',
        category: 'ICT',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eqls('Business name already exists');
        done();
      });
  });
});

// Delete Business
describe('DELETE businesses/2', () => {
  it('should be able to delete a business', (done) => {
    chai.request(server)
      .delete('/api/v1/businesses/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eqls('Business Deleted');
        done();
      });
  });
  it('should return 404 if page cannot be found', (done) => {
    chai.request(server)
      .delete('/api/v1/businesses/7')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.eqls('Business not found');
        done();
      });
  });
  it('should return, No permission to delete', (done) => {
    chai.request(server)
      .delete('/api/v1/businesses/2')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.eqls('You do not have the permission to delete this business');
        done();
      });
  });
});
