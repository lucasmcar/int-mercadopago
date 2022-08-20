const express = require("express");
const mercadopago = require("mercadopago");

const MercadoPago = require('mercadopago');

const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: 'TEST-2792251835577707-081919-f84c09ed177c3cde330feb66f7f6cb01-82237395'
});



app.get('/', (req, res) =>{
    res.send('Ola mundo');
});


app.get('/payment', async (req, res) =>{
    
//id     //codigo // pagador //status

    var id = ""+Date.now();
    var email = "tes@teste.com";

    var data = {
        items: [
            item = {
                id: id,
                title: "A description of product test",
                quantity : 1,
                currency_id: 'BRL',
                unit_price: parseFloat(250)
            }
        ],
        payer : {
            email: email
        },
        external_reference: id
    }

    try{
        var payment = await mercadopago.preferences.create(data);
        console.log(payment);
        return res.redirect(payment.body.init_point);
    } catch (err){
        console.log(err);
    }
    

});


app.post('/notification', (req, res) =>{
    console.log(req.query);
    res.send("OK");
})



app.listen(3000, (req, res) =>{
    console.log('Servidor rodando');
})