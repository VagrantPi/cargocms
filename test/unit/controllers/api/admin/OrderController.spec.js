import createHelper from "../../../../util/createHelper.js"
import { mockAdmin, unMockAdmin } from "../../../../util/adminAuthHelper.js"

describe('about admin Order controllers', () => {
  let product1, product2, user, order, supplier1, supplier2,  orderProduct1, orderProduct2;
  before(async function(done){
    try{
      user = await User.create({
        username: 'orderBuyer',
        email: 'orderBuyer@example.com',
        firstName: '劉',
        lastName: '廠商',
        birthday: new Date(),
        phone1: '(04)2201-9020',
        phone2: '0900-000-000',
        address: '西區台灣大道二段2號16F-1',
        address2: '台中市',
      });

      product1 = await createHelper.product('鮮甜飽滿無毒益菌蝦');
      supplier1 = await createHelper.supplier('壹陸捌活海產');
      await createHelper.supplierProduct(supplier1.id, product1.id);

      product2 = await createHelper.product('澎湖帝王級野生超大明蝦');
      supplier2 = await createHelper.supplier('活跳跳海產');
      await createHelper.supplierProduct(supplier2.id, product2.id);

      order = await createHelper.order(user.id);

      orderProduct1 = await createHelper.orderProduct(order.id, product1.id, 2);
      orderProduct2 = await createHelper.orderProduct(order.id, product2.id, 5);

      done();
    } catch (e) {
      done(e);
    }
  });

  describe('none admin', () => {
    it('should 403', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/order/confirm/${order.id}`);
        res.status.should.be.eq(403);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('is admin', () => {
    before(async function(done){
      await mockAdmin();
      done();
    });

    after(async (done) => {
      await unMockAdmin();
      done();
    });

    it('admin conform Order to Supplier shoubld success.', async (done) => {
      try{
        const res = await request(sails.hooks.http.app)
        .post(`/api/admin/order/confirm/${order.id}`);
        res.status.should.be.eq(200);

        const supplierShipOrder1 = await SupplierShipOrder.findOne({
          where: {
            OrderId: order.id,
            SupplierId: supplier1.id
          }
        });
        (supplierShipOrder1 !== null).should.be.true;

        const supplierShipOrder2 = await SupplierShipOrder.findOne({
          where: {
            OrderId: order.id,
            SupplierId: supplier2.id
          }
        });
        (supplierShipOrder2 !== null).should.be.true;

        const supplierShipOrderDescription = await SupplierShipOrderDescription.findAll({
          where: {
            SupplierShipOrderId: supplierShipOrder1.id
          }
        });
        supplierShipOrderDescription.length.should.be.eq(1);
        supplierShipOrderDescription[0].OrderProductId.should.eq(orderProduct1.id)
        done();
      } catch (e) {
        done(e);
      }
    });


  });


});
