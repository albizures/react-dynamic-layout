const context = require.context('./src', true, /.+(__tests__\/).+\.spec\.js?$/);
context.keys().forEach(context);
