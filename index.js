 // import express from 'express' // ES6 module synstax
const express = require('express'); // CommonJS modules 

const Hubs = require ('./data/hubs-model.js'); // our hubs database library


const server = express();
// routes or endpoints

//middleware; teaches express new things
server.use(express.json()); // needed to parse JSON


// GET to "/" 
server.get("/", function (request,response){
response.send({hello: 'Web developer' });
});

// see a list  of Hubs
server.get('/api/hubs', (req, res) => {
// read the data from the database (Hubs)
Hubs.find() //returns a promise 
.then(hubs => {
    console.log('Hubs', hubs);
    res.status(200).json(hubs);
})
.catch(error => {
    console.log(error); // example
    //handle the error
    res.status(500).json({
        errorMessage: "sorry, we ran into an error getting the list of hubs",
    }); 
 });

});

//create a Hub
server.post('/api/hubs', (req, res) => {
    const hubData = req.body; // for this to work you need the server.use(express.json()); above

    //never trust the client, validate the data. for now we trust the data for the demo
    Hubs.add(hubData)
    .then(hubs => {
        res.status(201).json(hub);
    })
    .catch(error => {
        console.log(error); 
     // handle the error 
     res.status(500).json({
        errorMessage: "sorry, we ran into creating the hub",
    }); 
 });

});


//delete a Hub
server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
      .then(deleted => {
        // res.status(204).end();
        res.status(200).json(deleted);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error removing the hub',
        });
      });
  });

//update a Hub ; extra exercise

    // server.put('/api/hubs/:id', (req, res) => {
    //     const id = req.params.id;
    //     Hubs.updated(id)
    //     .then(updated=> {
    //         //res.status(204).end();
    //         res.status(200).json(updated);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         // handle the error
    //         res.status(500).json({
    //         errorMessage: 'sorry, we ran into an error updating the hub',
    //         });
    //     });
    // });




const port = 8000;
server.listen(port, () => console.log(`\n ** api on port:${port} **`));

// fork, clone, type: 'npm i' to get dependencies
// type: 'npm i' express  to install the express library
// to run the server type 'npm run server' to