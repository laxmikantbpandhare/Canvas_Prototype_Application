import React,{Component} from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery,AddBookMutation} from '../queries/queries'

class AddBook extends Component{


  constructor(props)
  {
      super(props);
      this.state={
        name: "",
        genre:"",
        authorId:""
      };
  }
    displayAuthors(){
        var data = this.props.getAuthorsQuery 
       // console.log(this.props);
        if(data.loading)
        {
            return(<option>Loading Authors...</option>)
        }
        else
        {
            return data.authors.map(author => {
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    submitForm(e){
      e.preventDefault();
      this.props.AddBookMutation({
        variables:{
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId
        }
      });
    //  console.log(this.state)
    }
  
    render(){
      console.log(this.props);
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>

      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
      </div>

      <div className="field">
         <label>Genre:</label>
         <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
      </div>

      <div className="field">
      <label>Author:</label>
      <select  onChange={(e)=>this.setState({authorId:e.target.value})}>
        <option>select author</option>
        {this.displayAuthors()}
      </select>
      </div>

        <button>+</button>
      </form>
    );
  }
  }
  
  export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(AddBookMutation,{name:"AddBookMutation"})
  )(AddBook);
  

