const path = require("path");
const winston = require("winston");
require("winston-daily-rotate-file");

class TimestampFirst {
  constructor(enabled = true) {
    this.enabled = enabled;
  }
  transform(obj) {
    if (this.enabled) {
      return Object.assign(
        {
          timestamp: Date.now(),
        },
        obj
      );
    }
    return obj;
  }
}

const timestampFormat = winston.format.combine(
  new TimestampFirst(true),
  winston.format.json()
);

const formatTransportType = (type) => {
  const transporter = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, `/logger/logs/${type}-%DATE%.log`),
    datePattern: "MM-YYYY",
    level: type,
    format: winston.format.combine(
      winston.format.errors({
        stack: true,
      }),
      winston.format.json()
    ),
  });

  return transporter;
};

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  notice: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  notice: "magenta",
  debug: "cyan",
};

const error = winston.createLogger({
  format: timestampFormat,
  defaultMeta: {service: "bot"},
  level: "error",
  levels: levels,
  transports: [formatTransportType("error")],
});

const warn = winston.createLogger({
  format: timestampFormat,
  defaultMeta: {service: "bot"},
  level: "warn",
  levels: levels,
  transports: [formatTransportType("warn")],
});

const info = winston.createLogger({
  format: timestampFormat,
  defaultMeta: {service: "bot"},
  level: "info",
  levels: levels,
  transports: [formatTransportType("info")],
});

const notice = winston.createLogger({
  format: timestampFormat,
  defaultMeta: {service: "bot"},
  level: "notice",
  levels: levels,
  transports: [formatTransportType("notice")],
});

const debug = winston.createLogger({
  format: timestampFormat,
  defaultMeta: {service: "bot"},
  level: "debug",
  levels: levels,
  transports: [formatTransportType("debug")],
});

error.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({
        colors: colors,
      }),
      winston.format.simple()
    ),
  })
);

warn.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({
        colors: colors,
      }),
      winston.format.simple()
    ),
  })
);

if (process.env.NODE_ENV !== "production") {
  notice.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          colors: colors,
        }),
        winston.format.simple()
      ),
    })
  );

  debug.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          colors: colors,
        }),
        winston.format.simple()
      ),
    })
  );

  info.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          colors: colors,
        }),
        winston.format.simple()
      ),
    })
  );
}

module.exports = {
  error: (message, data = {}) => error.error(message, data),
  warn: (message, data = {}) => warn.warn(message, data),
  info: (message, data = {}) => info.info(message, data),
  notice: (message, data = {}) => notice.notice(message, data),
  debug: (message, data = {}) => debug.debug(message, data),
};
