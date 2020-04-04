const chalk = require("chalk");
const moment = require("moment");

exports.log = (content, type = "log") => {
  const timestamp = `[${moment().format("DD-MM-YY H:m:s")}]:`;
  switch (type) {
    case "log": {
      return console.log(`${timestamp} ${chalk.blue(type.toUpperCase())} ${content} `);
    }
    case 'warn': {
      return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} ${content} `);
    }
    case 'error': {
      return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} ${content} `);
    }
    case 'debug': {
      return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
    }
    case 'cmd': {
      return console.log(`${timestamp} ${chalk.gray(type.toUpperCase())} ${content}`);
    }
    case 'ready': {
      return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
    }
    case 'load': {
      return console.log(`${timestamp} ${chalk.magenta(type.toUpperCase())} ${content} `);
    }
    case 'client': {
      return console.log(`${timestamp} ${chalk.cyan(type.toUpperCase())} ${content} `);
    }
    case 'setup': {
      return console.log(`${timestamp} ${chalk.hex("#FFA500")(type.toUpperCase())} ${content} `);
    }
    case 'event': {
      return console.log(`${timestamp} ${chalk.hex("#82FFC4")(type.toUpperCase())} ${content} `);
    }
    default: throw new TypeError('Wrong type of logger kid');
  }
};

exports.error = (...args) => this.log(...args, 'error');

exports.warn = (...args) => this.log(...args, 'warn');

exports.debug = (...args) => this.log(...args, 'debug');

exports.cmd = (...args) => this.log(...args, 'cmd');

exports.ready = (...args) => this.log(...args, 'ready');

exports.load = (...args) => this.log(...args, 'load');

exports.client = (...args) => this.log(...args, 'client');

exports.setup = (...args) => this.log(...args, 'setup');

exports.event = (...args) => this.log(...args, 'event');
