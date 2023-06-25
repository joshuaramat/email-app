const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
