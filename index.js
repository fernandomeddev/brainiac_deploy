const express = require('express');
const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Server Is Up'});
});

app.get('/updates', (request, response) => {
    return response.json({ message: 'Server is Updated!'});
});

app.post('/test', (request, response) => {
    const { name, date } = request.body;
    return response.json({ name, date })
});

app.listen(3333);
