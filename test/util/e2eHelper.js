let ps = require('ps-node');
let pusage = require('pidusage')
let fs = require('fs');

let self = module.exports = {
  login: async (user) => {
    try {
      console.log("=== login ===");
      await browser.windowHandleSize({width:1280,height:900}).url('/');
      // expect(browser.getTitle()).to.equal('LFP: 香料香水實驗室，客製專屬香水');
      await browser.click('#login');
      await browser.pause(1000);
      await browser.setValue('#identifier', user)
      await browser.setValue('#password', user)
      await browser.click('#submit-button');

    } catch (e) {
      throw e;
    }
  },

  logout: async () => {
    try {
      console.log("=== logout ===");
      await browser.url('/logout');

    } catch (e) {
      throw e;
    }
  },

  startLogging: () => {
    ps.lookup({
      // TODO: support other browser than chrome
      command: 'chrome$',
      arguments: '',
    }, function(err, resultList) {
      const pidList = resultList.map(function(process) {return process.pid});
      self.writePID(resultList);
      self.writeHeader(pidList);

      setInterval(function() {
        self.log(pidList);
      },1000);
    });
  },

  log: async (pidList) => {
    let excelField = [];
    let totalMemory = 0;
    let totalCPU = 0;
    
    let getUsage = function(pid) { 
      return new Promise((resolve, reject) => {
        let usages = {};
        pusage.stat(pid, function(err, result) {
          if (err) {
            console.log("not exist PID:" ,pid)
            usages.mem = "";
            usages.cpu = "";
          } else {
            usages.mem = result.memory;
            usages.cpu = result.cpu;
          }
          resolve(usages);
        });
      })
    };

    for (let pid of pidList)  {
      let usage = await getUsage(pid);
      excelField.push(usage.mem);
      excelField.push(usage.cpu);

      totalMemory += usage.mem;
      totalCPU += usage.cpu;
    }

    excelField.push(totalMemory);
    excelField.push(totalCPU);
    self.writeContent(excelField);
  },

  getLogFolder: () => {
    if (process.env.E2E_LOGGER_FOLDER) {
      return process.env.E2E_LOGGER_FOLDER;
    } else {
      return sails.config.e2eClientLog.folder;
    }
  },

  writePID: (pid) => {
    let file = self.getLogFolder() + sails.config.e2eClientLog.PID;
    let JSONString = JSON.stringify(pid);

    fs.appendFile(file,JSONString , "utf8");
  },

  writeHeader: (pidList) => {
    let file = self.getLogFolder() + sails.config.e2eClientLog.MEMORY;
    let fieldString = "";
    pidList.forEach(function(pid,pidIndex) {
      if (pidIndex!=0) {
        fieldString += "\t";
      }
      fieldString += pid.toString() + "-memory (byte)" + "\t";
      fieldString += pid.toString() + "-CPU";
    });
    fieldString += "\t"+"total-memory (byte)";
    fieldString += "\t"+"total-CPU" + "\n";

    fs.appendFile(file, fieldString, "utf8");
  },

  writeContent: (excelField) => {
    let file = self.getLogFolder() + sails.config.e2eClientLog.MEMORY;
    let fieldString = "";
    excelField.forEach(function(field,fieldIndex) {
      if (fieldIndex!=0) {
        fieldString += "\t";
      }
      fieldString += field.toString();
    });
    fieldString += "\n";

    fs.appendFile(file, fieldString, "utf8");
  }
}
