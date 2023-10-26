const path = require('path');
const express = require('express');

const app = express();

app.use(require('cors')());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'build')));
console.log(path.join(__dirname, 'build'))
app.listen(4000, console.log('Aplicação esta online e pronta para rodar!'))