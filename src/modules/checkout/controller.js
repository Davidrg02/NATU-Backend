const mercadopago = require('mercadopago');
const db = require('../../db/mysql');
const config = require('../../config');
const uuid = require('uuid');
const client = new mercadopago.MercadoPagoConfig({ accessToken: config.mercadopago.accessToken });

const createOrder = async (req, res) => {

    const id = uuid.v4();
    const numericID = parseInt(parseInt(id.split('-')[0], 16)/2);

    try {
        const preference = new mercadopago.Preference(client);
        console.log(req.body);

        const response = await preference.create({
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
        });

        console.log(response);

        
        const dataOrden = {
            ID_Orden: numericID,
            COMPRADOR_ID_Comprador: req.body.idComprador,
            FechaHora_orden: new Date()
        };

        const dataDetalleOrden = {
            ID_Detalle_Orden: numericID,
            FechaHora_orden: new Date(),
            Cantidad: req.body.quantity,
            Subtotal: req.body.subtotal,
            Producto_ID_Producto: req.body.idProducto,
            Orden_ID_Orden: numericID,
            ESTADO_ID_Estado: 1
        };

        await db.insert('ORDEN', dataOrden);
        await db.insert('DETALLE_ORDEN', dataDetalleOrden);
        
        res.json(response); // Send the response after the database operations are successful
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the order.' });
    }
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
