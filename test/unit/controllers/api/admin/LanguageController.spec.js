describe.only('about language api Controller operation.', function() {
  it('create language should success.', async (done) => {
    const createThisLanguage = {
      languageName: 'testLanguage',
      languageCode: 'tCode',
      languageLocale: 'testLocale',
      languageImage: 'testImg',
      languageDirectory: 'testDirectory',
      languageSortOrder: '1',
      languageStatus: '1'
    };
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/api/admin/language`)
      .send(createThisLanguage);
      // sails.log.info('create language controller spec =>', res.body);
      res.body.should.be.Object;
      res.body.data.code.should.be.equal(createThisLanguage.languageCode);
      res.body.data.directory.should.be.equal(createThisLanguage.languageDirectory);
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find language', () => {
    let findThisLanguage;
    before(async (done) => {
      try {
        findThisLanguage = await Language.create({
          name: 'findTestLanguage',
          code: 'fCode',
          locale: 'findTestLocale',
          image: 'findTestImg',
          directory: 'finTestDirectory',
          sortOrder: '1',
          status: '1',
        });
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .get(`/api/admin/language/${findThisLanguage.name}`);
        // sails.log.info('find one language controller spec =>', res.body);
        res.body.data.should.be.Object;
        res.body.data.code.should.be.String;
        res.body.data.code.should.be.equal(findThisLanguage.code);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
 
  describe('delete language', () => {
    let deleteThisLanguage;
    before(async (done) => {
      try {
        deleteThisLanguage = await Language.create({
          name: 'testLanguage',
          code: 'tCode',
          locale: 'testLocale',
          image: 'testImg',
          directory: 'testDirectory',
          sortOrder: '1',
          status: '1',
        });
        // sails.log.info('deleteThisLanguage.name=>', deleteThisLanguage.name);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .delete(`/api/admin/language/${deleteThisLanguage.name}`);
        // sails.log.info('delete language controller spec =>', res.body);
        res.body.success.should.be.true;
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('update language', () => {
    let updateThisLanguage;
    const updatedLanguage = {
      name: 'updatedName',
      code: 'ucode',
      locale: 'updateLocale',
      image: 'updatedImage',
      directory: 'updatedDirectory',
      sortOrder: '1',
      status: '1',
    };
    before(async (done) => {
      try {
        updateThisLanguage = await Language.create({
          name: updatedLanguage.name,
          code: 'tcode',
          locale: 'updateThisLocale',
          image: 'updateThisImage',
          directory: 'updateThisDirectory',
          sortOrder: '0',
          status: '0',
        });
        // sails.log.info('updateThisLanguage.data.name=>', updateThisLanguage.name);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .put(`/api/admin/language/${updateThisLanguage.name}`)
        .send(updatedLanguage);
        res.status.should.eq(200);
        res.body.data.code.should.be.equal(updatedLanguage.code);
        res.body.data.directory.should.be.equal(updatedLanguage.directory);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  
});
