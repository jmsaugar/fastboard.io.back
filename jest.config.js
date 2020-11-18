module.exports = {
  verbose          : true,
  moduleNameMapper : {
    '#utils'     : '<rootDir>/src/utils',
    '#constants' : '<rootDir>/src/constants',
    '#services'  : '<rootDir>/src/services',
  },
  setupFiles : ['<rootDir>/devtools/setupTests.js'],
};
