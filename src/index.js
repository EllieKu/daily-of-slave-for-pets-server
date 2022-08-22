const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express()

app.use(require("./routes.js"))

app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${ PORT }`)
});