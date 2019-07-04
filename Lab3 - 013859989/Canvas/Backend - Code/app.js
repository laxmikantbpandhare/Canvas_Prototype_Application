const express=require('express');
const graphqlHTTP = require('express-graphql');


const app = express();
const cors = require('cors');
const schema = require('./schema/schema');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

var accountprofile = require('./routes/accountprofile');

//allow cross origin request

app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))
;


app.use('/Dashboard/accountprofile', accountprofile);

app.listen(4000,() => {
    console.log('Listening to port 4000');
})