module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },
  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '1540158019381116',
      clientSecret: '662c460cb17bdbde01c9c6c0cc796251',
      profileFields: ['id', 'displayName', 'photos', 'email']
    }
  }
};

// ---
// generated by coffee-script 1.9.2
