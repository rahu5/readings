'use strict';

import app from './';

after(function(done) {
  app.serverInstance.on('close', () => done());
  app.serverInstance.close();
});
