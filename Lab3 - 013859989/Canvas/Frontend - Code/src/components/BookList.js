import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries'


class BookList extends Component{

  displayBooks(){
    var data = this.props.data;

    if(data.loading)
    {
      return (<div>Loading Books...</div>);
    }
    else
    {
      return data.books.map(book =>{
        return (
          <li>{book.name}</li>
        )
      })
    }
  }

  render(){
    console.log(this.props);
  return (
    <div>
        <ul id="book-list">
            <li>Book Name</li>
            
            <li key="book.id">{this.displayBooks()}</li>
        </ul>
    </div>
  );
}
}

export default graphql(getBooksQuery)(BookList);
