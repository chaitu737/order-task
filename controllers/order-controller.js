
const Orders = require('../models/order');

const webpush = require('web-push')


const vapidKeys = webpush.generateVAPIDKeys();
const nodemailer = require('nodemailer');


webpush.setVapidDetails('mailto:dummymail6674@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dummymail6674@gmail.com',
      pass: 'santhu@51'
    }
  });


  var mailOptions = { 
    from: 'sahal737@gmail.com',
    to:  'sahal737@gmail.com',
    subject: 'Regarding Order Creation',
    text:  `Hello Your order is created` ,
    html:`<h1>Welcome to ORDER CREATION <h1>` 
    
     
   
  };







module.exports = class OrderController{
  
 // order creation api with webpush and nodemailer   

    static createOrder(orderData){
        return new Promise(async(resolve,reject)=>{

            const subscription = orderData;
            const payload = JSON.stringify({ title: "Push for order sent" });


            Orders(orderData).save().   then(async (order)=>{
                webpush.sendNotification(subscription,payload).then(result=>{
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });

                }).then(result=>{


                }).catch(e=>{
                    reject(e);
                })
                await resolve(order);


            }).catch(e=>{
                reject(e);
            })

        })
    }


    //order by Id

    static getOrderById(data){
        return new Promise(async(resolve,reject)=>{
            Orders.findById({_id:data.params.id}).then(async(result)=>{
                await resolve(result);
            }).catch(e=>{
                reject(e);
            })
        })
    }


    //order by filters
    static getorders(data){
        return new Promise(async(resolve,reject)=>{
         Orders.find(
             {
                 $or:[
                     {
                         price:{
                             $gte:Number(data.price1),
                             $lt:Number(data.price2)
                         },
                         created_at:{
                            $gte:ISODate(data.date1),
                            $lt:ISODate(data.date2)
                        },
                         payment:'false',
                         status:'delivered'
                     }
                 ]
             }
         ).then(async (result)=>{
            await resolve(result);
        }).catch(e=>{
            reject(e);
    

         })
        })

    }

  //order by sort
    static getAllorders(){
       return new Promise(async(resolve,reject)=>{
           Orders.find({}).sort({"created_at":-1}).then(async(result)=>{
               await resolve(result);
           }).catch(e=>{
               reject(e);
           })
       })
    }


}