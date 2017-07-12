module.exports = {
  orderForm: async (req, res) => {
    if (!AuthService.isAuthenticated(req)){
      res.redirect('/');
    }

    const token = await UtilsService.tokenGenerator();

    // get all payment methods from db
    const paymentMethodArray = [];
    let findPaymentMethods = await Config.findAll({
      where: {
        name: 'paymentMethods'
      }
    });
    const paymentMethodString = findPaymentMethods[0].dataValues.value;
    const paymentMethodObj = JSON.parse(paymentMethodString);
    paymentMethodObj.forEach((item) => {
      paymentMethodArray.push(item.type);
    })

    res.view(
      'b2b/order/form',
      {
        token,
        data: {
          paymentMethods: sails.config.paymentMethods
        }
      }
    );
  },
}
