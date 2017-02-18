describe.only('about Language Service Operation.', function () {
  it('creat Language should success.', async (done) =>{
    try {
      const newLanguege = {
        languageName: 'testLanguage',
        languageCode: 'tCode',
        languageLocale: 'testLocale',
        languageImage: 'testImg',
        languageDirectory: 'testDirectory',
        languageSortOrder: '1',
        languageStatus: '1',
      };
      const result = await LanguageService.create(newLanguege);
      result.should.be.Object;
      result.name.should.be.equal(newLanguege.languageName);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('find Language should success.', async (done) => {
    try {
      const result = await LanguageService.findByLanguageName('testLanguage');
      result.name.should.be.equal('testLanguage');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('update Language should success.', async (done) => {
    try {
      const changeData = {
        name: 'testLanguage',
        code: 'uCode',
        locale: 'updateLocale',
        image: 'updateImg',
        directory: 'updateDirectory',
        sortOrder: '0',
        status: '0'
      };

      const result = await LanguageService.update({
        name: 'testLanguage',
        code: changeData.code,
        locale: changeData.locale,
        image: changeData.image,
        directory: changeData.directory,
        sortOrder: changeData.sortOrder,
        status: changeData.status
      }); 
      result.code.should.be.eq(changeData.code);
      result.locale.should.be.eq(changeData.locale);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('delete Language should success.', async (done) => {
    try {
      const result = await LanguageService.deleteByLanguageName('testLanguage');
      const findlanguage = await Language.findOne({ where: { name: 'updateLanguage' }  });
      ( findlanguage === null  ).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });
})
