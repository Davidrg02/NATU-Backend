const mercadopago = require('mercadopago');

const config = require('../../config');

const client = new mercadopago.MercadoPagoConfig({ accessToken: config.mercadopago.accessToken});

const createOrder = async(req, res) => {

    const preference = new mercadopago.Preference(client);
    console.log(req.body);
    preference.create({
        body: {
            items: [
                {
                    title: req.body.title,
                    unit_price: req.body.unit_price,
                    quantity: req.body.quantity,
                }
            ],
            back_urls: {
                success: config.mercadopago.success,
                failure: config.mercadopago.failure,
                pending: config.mercadopago.pending,
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