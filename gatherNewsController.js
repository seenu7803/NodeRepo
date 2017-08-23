const service = require('./gatherNewsService')

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// --- EXPRESS MIDDLEWARE ---

app.use( bodyParser.urlencoded({ // to support URL-encoded bodies.
  extended: true
}));
app.use( bodyParser.json() );   // to support JSON-encoded bodies.
app.use( '/', express.static( path.join(__dirname, 'views')) );


app.get( '/getnews/:ticker', ( req, res ) => {
   let tickerSymbol = req.params.ticker;

   if( tickerSymbol === undefined ) tickerSymbol = "f";

   const callback = ( data ) => {
      res.json({ data });
      res.end();
   }
   service.getLatestFeed( tickerSymbol, callback );
})


app.listen( process.env.PORT || port, () => {
   console.log( "App listening" );
});
