const express = require('express');


const router = express.Router();
const orderController= require('../controllers/order-controller');



router.post('/create-order', (req,res)=>{
    orderController.createOrder(req.body).then((data)=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
});


//order By Id
router.get('/orders/:id', (req,res)=>{
    orderController.getorderById(req).then((data)=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
});



// order with multipile filters price, date, paymentstatus, order status
router.post('/orders',(req,res)=>{
    orderController.getorders(req.body).then((data)=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
});



router.get('/all', (req,res)=>{
orderController.getAllorders().then((data)=>{
    res.status(200).send(data);
}).catch(err=>{
    res.status(500).send(err);
})
})










module.exports= router