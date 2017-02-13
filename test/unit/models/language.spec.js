describe.only('about Language model operation.', function() {
  const languageData = {
    name: `testLanguage`,
    code: `tCode`,
    locale: `testLocale`,
    image: `testImg`,
    directory: `testDirectory`,
    sortOrder: `1`,
    status: `1`,
  };

  it('create Language should success.', async (done) => {
    try {
      const language = await Language.create(languageData);
      language.id.should.be.INTEGER;
      done();
    } catch (e) {
      done(e);
    }
  });

  it('find Language by name should success.', async (done) => {
    try {
      let result = await Language.find({ where: { name: languageData.name } });
      result.name.should.be.eq(languageData.name);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('update Language by name should success.', async (done) => {
    try {
      const result = Language.update({ name: 'updateLanguage' }, { where: { name: languageData.name } });
      done();
    } catch (e) {
      done(e);
    }
  });

  it('destroy Language should success.', async (done) => {
    try {
      const result = await Language.destroy({ where: { locale: languageData.locale  }  });
      result.should.be.eq(1);
      done()
    } catch (e) {
      done(e)
    }
  });
});

