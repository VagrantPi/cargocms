module.exports = {
  index: async (req, res) => {
    await Language.create({
      name: 'testLanguage',
      code: 'tCode',
      locale: 'testLocale',
      image: 'testImg',
      directory: 'testDirectory',
      sortOrder: '1',
      status: '1',
    });

    const language = await LanguageService.findByLanguageName('testLanguage');
    res.ok({
      view: true,
      serverSidePaging: true,
      layout: 'admin/language/index',
      data: language,
    });
  },
  create: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/default/create'
    });
  },
  edit: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/default/edit'
    });

  },
  show: async (req, res) => {
    res.ok({
      view: true,
      layout: 'admin/language/show'
    });
  },
}
