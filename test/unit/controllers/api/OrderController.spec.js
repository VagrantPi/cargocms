import productCreateHelper from "../../../util/productCreateHelper.js"

describe('about Order controllers', () => {

  let product1, product2, product3 , user;
  before(async function(done){
    try{
      user = await User.create({
        username: 'buyer',
        email: 'buyer@example.com',
        firstName: '劉',
        lastName: '拜爾',
        birthday: new Date(),
        phone1: '(04)2201-9020',
        phone2: '0900-000-000',
        address: '西區台灣大道二段2號16F-1',
        address2: '台中市',
      }).then(function(user) {
        Passport.create({
          provider: 'local',
          password: 'user',
          UserId: user.id
        });
      });

      product1 = await productCreateHelper.create('Product A');
      product2 = await productCreateHelper.create('Product B');
      product3 = await productCreateHelper.create('Product C');

      done();
    } catch (e) {
      done(e);
    }
  });

  it('User shopping car Order some Products.', async (done) => {
    try{
      const orderData = {
        products:[product1.id, product2.id, product3.id],
        user: user.id,
        telephone: '04-22019020',
        fax: '',
        email: 'buyer@gmail.com',
        tracking: '確認',
        invoiceNo: '87654321',
        invoicePrefix: 'TS',
        paymentFirstname: '珮門',
        paymentLastname: '葉',
        paymentAddress1: '西區台灣大道二段2號16F-1',
        paymentCity: '台中市',
        paymentPostcode: '402',
        paymentMethod: 'ATM轉帳',
        paymentCode: 'pay123456',
        shippingFirstname: '拜爾',
        shippingLastname: '劉',
        shippingAddress1: '西區台灣大道二段2號16F-1',
        shippingCity: '台中市',
        shippingPostcode: '402',
        shippingMethod: '低溫宅配',
        shippingCode: 'ship123456',

      };

      const res = await request(sails.hooks.http.app)
      .post(`/api/order`).send( orderData );

      const order = await Order.findOne({
        where: {
          id: res.body.data.itme.id
        }
      });

      const orderProduct = await OrderProduct.findAll({
        where: {
          OrderId: res.body.data.itme.id
        }
      });

      res.status.should.be.eq(200);
      order.tracking.should.be.equal('確認');
      orderProduct.length.should.be.equal(3);

      done();
    } catch (e) {
      done(e);
    }

  });
});
