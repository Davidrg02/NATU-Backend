const mercadopago = require('mercadopago');

const client = new mercadopago.MercadoPagoConfig({ accessToken: 'TEST-5346383899377191-051703-d3724366f08887ec60711ee25e6d8bd8-1816219046' });

const createOrder = async(req, res) => {

    const preference = new mercadopago.Preference(client);

    preference.create({
        body: {
            items: [
                {
                    title: 'Test',
                    unit_price: 10000,
                    quantity: 1,
                }
            ],
            back_urls: {
                success: 'http://localhost:4000/api/checkout/success',
                failure: 'http://localhost:4000/api/checkout/failure',
                pending: 'http://localhost:4000/api/checkout/pending',
            },
            auto_return: 'approved'
        }
    })
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        res.send(error);
    }
    );
};

const success = (req, res) => res.send('success');

const failure = (req, res) => res.send('failure');

const pending = (req, res) => res.send('pending');

const webhook = (req, res) => {
    console.log(req.body);
    res.send('webhook');
};

module.exports = {
    createOrder,
    success,
    failure,
    pending,
    webhook,
};