const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connections');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async () => {
            await connection.destroy();
    })

    it('shoud be able to create a new ONG', async  () => {
            const response = await request(app)
                .post('/ongs')
                .send({
                    name: "Açao Tapera",
                    email: "acaotapera1@gmail.com",
                    password: "R@fael123",
                    telefone: "48996750519",
                    city: "Florianopolis",
                    uf: "SC"
                    })

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    });
});