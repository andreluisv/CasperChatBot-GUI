const express = require('express');
const app = express();
const nomeApp = process.env.npm_package_name;

app.use(express.static(`./dist/${nomeApp}`));

app.use(express.static(`${__dirname}/dist/${nomeApp}`));

app.get('/*', (req, res) => {
    res.sendFile(`index.html`, {root: `dist/${nomeApp}/`});
});

app.listen(process.env.PORT || 8080);