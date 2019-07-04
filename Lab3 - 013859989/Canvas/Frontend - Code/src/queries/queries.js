import {gql} from 'apollo-boost';

const login = gql`
query login($sjsuid: ID, $password: String){
        login(sjsuid: $sjsuid, password: $password){
            facultyfnd
            pwdvalidity
            finalstatus
        }
    }`

    const search= gql`
    query search($courseInfo: String!){
            search(courseInfo: $courseInfo){
                coursename
                courseid
                courseterm
            }
        }`


        const subjectdetails = gql`
        query subjectdetails($sjsuid: ID){
                login(sjsuid: $sjsuid){
                    subjectdetails
                }
            }`

    const getBooksQuery = gql`
    {
      books{
        name
        id
      }
    }
    `

    const getAuthorsQuery = gql`
    {
      authors{
        name
        id
      }
    }
    `

    const AddBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
      addBook(name:$name,
              genre:$genre,
              authorId:$authorId){
                name
                id
              }
    }
    `

    const SignupMutation = gql`
    mutation($sjsuid:String!,$name:String!,$email:String!,$password:String!){
      signup(sjsuid:$sjsuid,
              name:$name,
              emailid:$email,
              password:$password){
                success
                duplicateUser
            }
    }
    `

    const coursecreationMutation = gql`
    mutation($courseid:String!,
             $coursename:String,
             $coursedept:String,
             $coursedesc:String,
             $courseroom:String,
             $coursecapacity:String,
             $coursewaitlist:String,
             $courseterm:String){
        coursecreation(
             courseid:$courseid,
             coursename:$coursename,
             coursedept:$coursedept,
             coursedesc:$coursedesc,
             courseroom:$courseroom,
             coursecapacity:$coursecapacity,
             coursewaitlist:$coursewaitlist,
             courseterm:$courseterm){
                success
                duplicateUser
              }
    }
    `

    const enrollMutation = gql`
    mutation($courseid:String!,
             $coursedept:String,
             $sjsuid:String,
             $coursename:String){
          enrollstudent(
             courseid:$courseid,
             coursedept:$coursedept,
             sjsuid:$sjsuid,
             coursename:$coursename,){
                success
                duplicateUser
              }
    }
    `

    const profileUpdateMutation = gql`
    mutation($sjsuid:String!,
             $name:String,
             $emailid:String,
             $password:String){
          signup(
             sjsuid:$sjsuid,
             name:$name,
             emailid:$emailid,
             password:$password,){
                success
                duplicateUser
              }
    }
    `

    export {login,
            getBooksQuery,
            getAuthorsQuery,
            AddBookMutation,
            SignupMutation,
            coursecreationMutation,
            enrollMutation,
            profileUpdateMutation,
            search,
            subjectdetails
            };