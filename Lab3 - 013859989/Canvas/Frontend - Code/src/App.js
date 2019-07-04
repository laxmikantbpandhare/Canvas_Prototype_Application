import React,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import './App.css';

//import BookList from './components/BookList'
//import AddBook from './components/AddBook'
import Main from './components/Main'

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component{
  render(){
  return (

    <BrowserRouter>
    <div>
      {/*  <h1>Started with GraphQL</h1> */}
      <ApolloProvider client={client}>
       {/*    <BookList/>
       <AddBook/>  */} 
           <Main/> 
       </ApolloProvider>
     </div>
    </BrowserRouter>


//  <ApolloProvider client={client}>
//     <div className="App">
//     <div id="main">
//     <h1>Started with GraphQL</h1>
//     <BookList/>

//   </div>
//   </ApolloProvider>

  );
}
}

export default App;
