

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

  logFolder: "test/e2e/",
  logPID: "PID.json",
  logMEMORY: "memory.xls",

  startLogging: () => {
    let ps = require('ps-node');
    ps.lookup({
      // TODO: support other browser than chrome
      command: 'chrome$',
      arguments: '',
    }, function(err, resultList) {
      let pidList = resultList.map(function(process) {return process.pid});
      self.writePID(resultList);
      self.writeHeader(pidList);

      setInterval(function() {
        self.log(pidList);
      },1000);
    });
  },

  log: (pidList) => {
    let pusage = require('pidusage')
    let excelField = [];
    let totalMemory = 0;
    let totalCPU = 0;
    pidList.forEach(function(pid, pidIndex) {
      pusage.stat(pid, function(err, result) {
        if (err) {
          console.log("not exist PID:" ,pid)
          excelField.push("");
          excelField.push("");
          //continue;
          //break;
        } else {
          excelField.push(result.memory);
          excelField.push(result.cpu);

          totalMemory += result.memory;
          totalCPU += result.cpu;

        }
        if (pidIndex === pidList.length -1) {
          excelField.push(totalMemory);
          excelField.push(totalCPU);
          self.writeContent(excelField);
        }

      });
    });
  },

  writePID: (pid) => {
    let fs = require('fs');
    let file = self.logFolder + self.logPID;
    let JSONString = JSON.stringify(pid);

    fs.appendFile(file,JSONString , "utf8");
  },

  writeHeader: (pidList) => {
    let fs = require('fs');
    let file = self.logFolder + self.logMEMORY;
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
    let fs = require('fs');
    let file = self.logFolder + self.logMEMORY;
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
