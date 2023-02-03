module.exports = app => {

    app.post('/individual', app.api.individual.create_individual);
    app.route('/individual').get(app.api.individual.list_individual);

}