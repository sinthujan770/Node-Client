const express = require('express');
const router = express.Router();

const { Mongoose } = require('mongoose');
const { request } = require('express');

const Client = require("../model/client");
const { findOneAndUpdate } = require('../model/client');

router.get("/", (req, res, next) => {
    Client.find()
    .select("name balance _id ID Email")
    .exec()
    .then(docs => {
        res.status(200).json({
           count: docs.length,
           clients:docs.map(doc => {
               return {
                   _id: doc._id,
                   clientName: doc.name,
                   balance: doc.balance,
                   ID: doc.ID,
                   Email: doc.Email
                 
               } ;
             })
        });
         })
      
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
     });


     router.get("/:clientId", (req, res, next) => {
        const id = req.params.clientId;
        Client.findById(id)
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if(doc) {
                res.status(200).json(doc);
                }
                else{
                    res.status(404).json({message: 'no valid entry found for provided ID'})

                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    });

     router.post("/", (req, res, next) => {
         
         
    const client = new Client({
      
        name: req.body.name ,
        balance: req.body.balance,
        ID: req.body.id,
        Email: req.body.email
    });
    client.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'create product  successfully',
                createdClient: { name: result.name,
                balance: result.balance,
                ID: result.ID,
                Email: result.Email,
            _id: result._id,
      
    }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    });



    router.patch("/:clientId", (req, res, next) => {
        const id = req.params.clientId;
        const updateOps = {};
        for (const ops of req.body){
            updateOps[ops.propName] = ops.value1;
            updateOps[ops.propBalance] = ops.value2;
            updateOps[ops.propId] = ops.value3;
            updateOps[ops.propEmail] = ops.value4;
         
        }
        Client.update({_id: id }, { $set: updateOps})
        .exec()
        .then(result => {
           
            res.status(200).json({
                message: 'client updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/products/" +result._id
                }
            });
        })
    });


    router.delete('/:clientId', (req, res, next) => {
        const id = req.params.clientId;
       Client.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                request:{
                    type: 'deleted'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });

module.exports = router;