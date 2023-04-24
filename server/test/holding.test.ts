import request from 'supertest';
import app from '../src/utils/app';
import db from '../src/db/investWithFriendsDb';

describe('Test for Holding Related Endpoints', () => {
  const existingStock = 'MSFT';
  const newStock = 'FNF';
  const userId = 1;

  afterAll((done) => {
    db.query(
      `
      DELETE FROM stocks
      WHERE ticker=$1;
    `,
      [newStock]
    )
      .then(() => done())
      .catch((err) => {
        console.log('ERROR: ', err);
        throw new Error('Error encounted when cleaning up the test database.');
      });
  });

  describe('GET /getHoldings/:id', () => {
    it("should return an array of the user's holdings", async () => {
      const response = await request(app).get(`/api/getHoldings/${userId}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toMatchObject({
        user_id: userId,
        stock_quantity: expect.any(Number),
        stock_id: expect.any(Number),
        ticker: expect.any(String),
        company_name: expect.any(String),
        closing_price: expect.stringMatching(/^\$\s[0-9.]+$/),
        last_updated: expect.stringMatching(/^[0-9]+$/),
        market_value: expect.stringMatching(/^\$\s[0-9.]+$/),
        percent_of_holdings: expect.stringMatching(/^[0-9.]+\s%$/),
      });
    });
  });

  /* 
  To be completed by Michael
  */
  describe('GET /getFriendHoldings/:id', () => {
    it("should return an array of friend's holdings", async () => {});
  });

  describe('POST /addHolding', () => {
    it('should reject the request if the payload is not valid', async () => {
      const response = await request(app)
        .post('/api/addHolding')
        .send({ user_id: '1', ticker: existingStock, stock_quantity: 1 });

      expect(response.status).toEqual(400);
    });

    it('should add the holding (already exists in stocks table) and return an array of holdings of the user', async () => {
      const response = await request(app).post('/api/addHolding').send({
        user_id: userId,
        ticker: existingStock,
        stock_quantity: 100,
      });
      expect(response.status).toEqual(200);
      expect(response.body.length).toBeGreaterThan(5);
      const msft = response.body.find(
        (holding: any) => holding.ticker === existingStock
      );
      expect(msft).not.toBeUndefined();
      expect(msft.stock_quantity).toEqual(100);
    });

    it('should add the holding (not exists in stocks table) and return an array of holdings of the user', async () => {
      const response = await request(app).post('/api/addHolding').send({
        user_id: userId,
        ticker: newStock,
        stock_quantity: 200,
      });
      expect(response.status).toEqual(200);
      expect(response.body.length).toBeGreaterThan(6);
      const fnf = response.body.find(
        (holding: any) => holding.ticker === newStock
      );
      expect(fnf).not.toBeUndefined();
      expect(fnf.stock_quantity).toEqual(200);
    });
  });
});
