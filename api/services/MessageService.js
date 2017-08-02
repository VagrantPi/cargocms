import {sprintf} from 'sprintf-js';

module.exports = {

  /*
   * 向新註冊的使用者問安
   */
  greeting: (user) => {

    try {
      var greetingTpl = sails.config.mail.templete.greeting;
      var email = user.email;
      var mailSendConfig = {...greetingTpl, to: email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        username: user.username
      });

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        storeName: sails.config.storeName,
        username: user.username
      });

      mailSendConfig.type = 'greeting';

      return mailSendConfig;

    } catch (e) {
      throw error;
    }

  },
  orderConfirm: (result = {
    productName, serialNumber, email, username, bankId, bankName,
    accountId, accountName, paymentTotalAmount, shipmentUsername, shipmentAddress,
    note, phone, invoiceNo
  }) => {

    try {

      let orderConfirmTemplete = sails.config.mail.templete.orderConfirm;
      let mailSendConfig = {...orderConfirmTemplete, to: result.email};
      let orderSerialNumber = result.serialNumber;
      const DOMAIN_HOST = MessageService.checkBackslash(sails.config.appUrl);
      const orderConfirmLink = `${DOMAIN_HOST}/order/paymentConfirm?serial=${orderSerialNumber}`;

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { orderSerialNumber });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        ...result,
        orderSerialNumber,
        storeName: sails.config.storeName,
        orderConfirmLink
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;

    } catch (error) {
      throw error;
    }

  },
  orderToShopConfirm: (result = {
    productName, serialNumber, email, username, bankId, bankName,
    accountId, accountName, paymentTotalAmount, shipmentUsername, shipmentAddress,
    note, phone, invoiceNo
  }) => {

    try {

      let orderToShopConfirm = sails.config.mail.templete.orderToShopConfirm;
      let mailSendConfig = {...orderToShopConfirm, to: result.email};
      let orderSerialNumber = result.serialNumber;
      const DOMAIN_HOST = MessageService.checkBackslash(sails.config.appUrl);
      const orderConfirmLink = `${DOMAIN_HOST}/order/paymentConfirm?serial=${orderSerialNumber}`;

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { orderSerialNumber });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        ...result,
        orderSerialNumber,
        storeName: sails.config.storeName,
        orderConfirmLink
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;

    } catch (error) {
      throw error;
    }

  },
  orderSync: (user, host) => {

    try {
      var orderSyncTemplete = sails.config.mail.templete.orderSync;
      var email = user.email;
      var mailSendConfig = {...orderSyncTemplete, to: email};

      var addr = 'localhost';
      var port = sails.config.port;

      var syncLinkHost = host || `/api/order/status`
      var syncLinkParams = `token=${user.orderSyncToken}`
      var syncLink = `${syncLinkHost}?${syncLinkParams}`

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {email});
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        syncLink,
        email,
        storeName: sails.config.storeName,
        username: user.username
      });

      mailSendConfig.type = 'orderSync';

      return {...mailSendConfig, syncLink, syncLinkHost, syncLinkParams};

    } catch (e) {
      throw error;
    }

  },
  paymentConfirm: (order = {
    email, serialNumber, username
  }) => {
    try {

      var paymentConfirmTemplete = sails.config.mail.templete.paymentConfirm;
      var mailSendConfig = {...paymentConfirmTemplete, to: order.email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {orderSerialNumber: order.serialNumber});
      mailSendConfig.text = sprintf(mailSendConfig.text, {
        storeName: sails.config.storeName,
        username: order.username
      });

      mailSendConfig.type = 'paymentConfirm';

      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },
  orderConfirm: (order = {
    email, serialNumber, username, productName, shipmentUsername, shipmentAddress, note, phone
  }) => {
    try {
      var orderConfirmTemplete = sails.config.mail.templete.event.orderConfirm;
      var mailSendConfig = {...orderConfirmTemplete, to: order.email};
      mailSendConfig.subject = sprintf(mailSendConfig.subject, {orderSerialNumber: order.serialNumber});
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        storeName: sails.config.storeName,
        orderSerialNumber: order.serialNumber,
        username: order.username,
        productName: order.productName,
        shipmentUsername: order.shipmentUsername,
        shipmentAddress: order.shipmentAddress,
        note: order.note,
        phone: order.phone
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },
  deliveryConfirm: (order) => {

    try {
      var deliveryConfirmTemplete = sails.config.mail.templete.deliveryConfirm;
      var mailSendConfig = {...deliveryConfirmTemplete, to: order.User.email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {orderSerialNumber: order.serialNumber});
      mailSendConfig.text = sprintf(mailSendConfig.text, {
        storeName: sails.config.storeName,
        username: order.User.username
      });

      mailSendConfig.type = 'deliveryConfirm';
      return mailSendConfig;
    } catch (e) {
      throw e;
    }

  },
  forgotPassword: ({username, api, email}) => {
    try {
      let forgotPasswordTemplete = sails.config.mail.templete.forgotPassword;
      let mailSendConfig = {...forgotPasswordTemplete, to: email};
      const DOMAIN_HOST = MessageService.checkBackslash(sails.config.appUrl);
      const url = `${DOMAIN_HOST}${api}`;

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { username });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        username,
        url,
        storeName: sails.config.storeName,
      });

      mailSendConfig.type = 'forgotPassword';
      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },
  eventOrderConfirm: (result = {
    productName, serialNumber, email, username, bankId, bankName,
    accountId, accountName, paymentTotalAmount, shipmentUsername, shipmentAddress,
    note, phone
  }) => {

    try {

      let orderConfirmTemplete = sails.config.mail.templete.event.orderConfirm;
      let mailSendConfig = {...orderConfirmTemplete, to: result.email};
      let orderSerialNumber = result.serialNumber;

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { orderSerialNumber });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        ...result,
        orderSerialNumber,
        storeName: sails.config.storeName,
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;

    } catch (error) {
      throw error;
    }

  },
  eventPaymentConfirm: (order = {
    email, serialNumber, username
  }) => {
    try {

      var paymentConfirmTemplete = sails.config.mail.templete.event.paymentConfirm;
      var mailSendConfig = {...paymentConfirmTemplete, to: order.email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {orderSerialNumber: order.serialNumber});
      mailSendConfig.text = sprintf(mailSendConfig.text, {
        storeName: sails.config.storeName,
        username: order.username,
        orderSerialNumber: order.serialNumber
      });

      mailSendConfig.type = 'paymentConfirm';

      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },
  contactConfirm: ( result = {
    name, email, phone, subject, content, success
  }) => {
    try{
      let contactConfirmTemplete = sails.config.mail.templete.contact.Confirm;
      let mailSendConfig = {...contactConfirmTemplete, to: result.email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        name: result.name,
        storeName: sails.config.storeName,
      });
      mailSendConfig.html    = sprintf(mailSendConfig.html, {
        storeName: sails.config.storeName,
        name: result.name,
        email: result.email,
        phone: result.phone,
        subject: result.subject,
        content: result.content
      });
      mailSendConfig.type = 'contact';
      mailSendConfig.success = result.success;
      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },
  contactSendToAdmin: ( result = {
    name, email, phone, subject, content, success, adminMail
  }) => {
    try{
      let contactConfirmTemplete = sails.config.mail.templete.contact.SendToAdmin;
      let mailSendConfig = {...contactConfirmTemplete, to: result.adminMail};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        name: result.name,
        storeName: sails.config.storeName,
        subject: result.subject
      });
      mailSendConfig.html    = sprintf(mailSendConfig.html, {
        name: result.name,
        email: result.email,
        phone: result.phone,
        subject: result.subject,
        content: result.content,
        storeName: sails.config.storeName,
      });
      mailSendConfig.type = 'contact';
      mailSendConfig.success = result.success;
      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },

  checkNewEmail: ({ username, api, email, type }) => {
    try {
      const checkEmailTemplete = sails.config.mail.templete.checkNewEmail;
      const mailSendConfig = { ...checkEmailTemplete, to: email };
      const DOMAIN_HOST = MessageService.checkBackslash(sails.config.appUrl);
      const url = `${DOMAIN_HOST}/${api}`;

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { username });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        type,
        username,
        url,
        storeName: sails.config.storeName,
      });

      mailSendConfig.type = 'newEmail';
      return mailSendConfig;
    } catch (e) {
      throw e;
    }
  },

  sendMail: async (message) => {

    try {

      if(sails.config.environment === 'production'){

        await MailerService.send(message.toJSON());
        message.error = '';
      }
      else {
        message.error = 'test only';
      }
      message.success = true;

      await message.save();

    } catch (error) {
      console.error(error.stack);
      message.success = false;
      message.error = error.message;
      await message.save();

    }
  },

  orderProductShipped: async(result = {
    orderNumber, productName, shippingName, username, telephone, address, email
  }) => {
    try {
      let productShipped = sails.config.mail.templete.event.productShipped;
      let mailSendConfig = {...productShipped, to: result.email}
      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        orderNumber: result.orderNumber
      });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        username: result.username,
        productName: result.productName,
        orderNumber: result.orderNumber,
        shippingName: result.shippingName,
        phone: result.telephone,
        address: result.address,
        storeName: sails.config.storeName,
      });
      mailSendConfig.type = 'deliveryConfirm';
      return mailSendConfig;

    } catch (e) {
      throw e;
    }
  },
  orderCreated: (result = {
    productName, serialNumber, email, username, bankId, bankName,
    accountId, accountName, paymentTotalAmount, shipmentUsername, shipmentAddress,
    note, phone, invoiceNo
  }) => {
    try {
      let orderToShopConfirm = sails.config.mail.templete.event.orderCreated;
      let mailSendConfig = {...orderToShopConfirm, to: result.email};
      let orderSerialNumber = result.serialNumber;
      const DOMAIN_HOST = MessageService.checkBackslash(sails.config.appUrl);
      const orderInfoLink = `${DOMAIN_HOST}/orderinfo/${orderSerialNumber}`;

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { orderSerialNumber });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        ...result,
        orderSerialNumber,
        storeName: sails.config.storeName,
        orderInfoLink
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;

    } catch (error) {
      throw error;
    }
  },

  shipOrderCreated: (result = {
    productName, serialNumber, email, supplier, shipmentUsername, shipmentEmail, shipmentAddress, phone
  }) => {
    try {
      let orderToShopConfirm = sails.config.mail.templete.event.orderConfirmToSupplier;
      let mailSendConfig = {...orderToShopConfirm, to: result.email};
      let orderSerialNumber = result.serialNumber;

      mailSendConfig.subject = sprintf(mailSendConfig.subject, { orderSerialNumber });
      mailSendConfig.html = sprintf(mailSendConfig.html, {
        ...result,
        orderSerialNumber,
      });

      mailSendConfig.type = 'orderConfirm';

      return mailSendConfig;

    } catch (error) {
      throw error;
    }
  },

  checkBackslash(url) {
    if (url.endsWith('/')) {
      return url.substr(0, url.length - 1);
    }
    return url;
  },
};
