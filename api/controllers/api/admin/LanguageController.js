module.exports = {
  create: async (req, res) => {
    const data = req.body;
    // sails.log.info('create language controller =>', data);
    try {
      const language = await LanguageService.create(data);
      const findCreateLanguage = LanguageService.findByLanguageName(data.languageName);
      const checkLanguageResult = language.name == data.languageName;
      if(checkLanguageResult) {
        res.ok({
          message: 'create language success.',
          data: language
        });
      } else {
        throw Error(`Create ${data.languageName} failed.`);
      } 
    } catch (e) {
      res.serverError(e);
    }
  },

  find: async (req, res) => {
    const { name } = req.params;
    try {
      const language = await LanguageService.findByLanguageName(name);
      res.ok({
        message: 'Get language success.',
        data: language,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    const { name } = req.params;
    const data = req.body;
    try {
      // sails.log.info('update language controller name=>', name);
      // sails.log.info('update language controller body=>', data);
      const language = await LanguageService.update(data, {
        where: { name },
      });
      
      const resultData = await LanguageService.findByLanguageName(name);
      res.ok({
        message: 'Update language success.',
        data: resultData
      })
    } catch (e) {
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    const { name } = req.params;
    try {
      // sails.log.info('delete language controller=>', name);
      const language = await LanguageService.deleteByLanguageName(name);
      res.ok({
        message: 'Delete language success.',
        data: language,
      });
    } catch (e) {
      res.serverError(e);
    }
  }
}
