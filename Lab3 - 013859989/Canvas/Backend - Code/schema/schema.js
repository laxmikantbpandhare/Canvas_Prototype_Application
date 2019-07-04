const graphql = require('graphql');
const _ = require('lodash');
//var session = require('express-session');
var userDetails = require("../Models/userDetails");
var coursecreation = require("../Models/coursecreation");
var enrollstudent = require("../Models/enrollstudent");
var Book = require("../Models/book");
var Author = require("../Models/author");
var connection = require('../DataBaseConnection');
var bcrypt = require('bcrypt-nodejs');


const {GraphQLObjectType,
       GraphQLString,
       GraphQLSchema,
       GraphQLID,
       GraphQLInt,
       GraphQLBoolean,
       GraphQLList,
       GraphQLNonNull
    } = graphql;

// var books = [
//     {name:'abc',genre:'sdfj',id:'1',authorId:'1'},
//     {name:'awdebc',genre:'sdqwedsfj',id:'2',authorId:'2'},
//     {name:'wddsebc',genre:'sdsdfdsfj',id:'3',authorId:'3'},
//     {name:'asdjkdskjsdbc',genre:'sdfj',id:'1',authorId:'2'},
//     {name:'asdjkdjwdebc',genre:'sdqwedsfj',id:'2',authorId:'3'},
//     {name:'wddsdjsdjksebc',genre:'sdqwedsfj',id:'3',authorId:'3'}
// ];

// var authors = [
//     {name:'Patriuck',age:'90',id:'1'},
//     {name:'Lucky',age:'19',id:'2'},
//     {name:'Laxmi',age:'21',id:'3'}
// ];

var logincheck = 
    {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
;

var profileData = {"coursename":"","courseid":"","courseterm":""};

var resultData = {
    success: false,
    duplicateUser: false
}

var resultCourseData = {
    success: false,
    duplicateUser: false
}

var resultEnrollData = {
    success: false,
    duplicateUser: false
}

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
           type:AuthorType,
           resolve(parent,args){
           //    console.log(parent);
         //      return _.find(authors,{id:parent.id});
         return Author.findById(parent.authorId);
           } 
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
         //       return _.filter(books,{authorId:parent.id})
         return Book.find({authorId:parent.id});
            }
        }
    })
});

const LoginType = new GraphQLObjectType({
    name:'Login',
    fields:() => ({
        finalstatus: { type: GraphQLBoolean },
        facultyfnd: { type: GraphQLBoolean },
        pwdvalidity: { type: GraphQLBoolean }
    })
});

const SearchType = new GraphQLObjectType({
    name:'search',
    fields:() => ({
        coursename:{type:GraphQLString},
        courseid:{type:GraphQLString},
        courseterm:{type:GraphQLString}
    })
});

const LogoutType = new GraphQLObjectType({
    name:'logout',
});

const SubjectDetailsType = new GraphQLObjectType({
    name:'subjectdetails',
    fields:() => ({
        sjsuid:{type:GraphQLID},
    })
});

const SignUpType = new GraphQLObjectType({
    name:'signup',
    fields:() => ({
        // sjsuid:{type:GraphQLString},
        // password:{type:GraphQLString},
        // name:{type:GraphQLString},
        // email:{type:GraphQLString},
        // user_flag:{type:GraphQLString},
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});


const CourseCreationType = new GraphQLObjectType({
    name:'coursecreation',
    fields:() => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});



const CourseEnrollType = new GraphQLObjectType({
    name:'enrollstudent',
    fields:() => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to data from DB
              //  return _.find(books,{id:args.id});
              return Book.findById(args.id);
            }
        },
        author:{
            type: AuthorType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
              //  return _.find(authors,{id:args.id});
              return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return authors;
                return Book.find({});
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                //return books;
                return Author.find({});
            }
        },
        // logout:{
        //     type: LogoutType,
        //     resolve(parent,args){
        //         var session=req.session;
        //         console.log("In logout ", req.session.user)
        //         session.user = null;
        //         session.destroy();
        //         var success = true;
        //         return success;
        //     }
        // },
        search:{
            type: SearchType,
            args: {courseInfo:{type:GraphQLString}},
            async resolve(parent,args){

              

                await coursecreation.find({
                    'coursename': args.courseInfo
                 }, (err, user) => {
                 
                 
                   if (err) {
                       console.log("Unable to fetch Course details.", err);
                     //  callback(err, null);
                   }
                   else {
                     console.log(user);
                     profileData.coursename = user[0].coursename;
                     profileData.courseterm = user[0].courseterm;
                     profileData.courseid = user[0].courseid;
                     console.log("Course found");
                   }
                   
                 });
                 console.log("profiledata",profileData);
                 return profileData;
                //  return courseid;
            }
        },
        login:{
            type: LoginType,
            args: {sjsuid:{type:GraphQLID},
                   password:{type:GraphQLString}
                  },
            resolve(parent,args){

               console.log("Inside Login Post Request");
               console.log("Req Body : ",args);
           
               userDetails.findOne({
                 'sjsuid': args.sjsuid
               }, (err, user) => {
           
               if(user)
               { 
                 console.log("user",user);
                 if(user.user_flag=="Y")
                 {
                    logincheck.facultyfnd = true;
                 }
                 else{
                     logincheck.facultyfnd = false;
                 }
                 if (err) {
                     console.log("Unable to fetch user details.", err);
                 }
                 else {
                   console.log(user);
                   if(user){

                     if (!bcrypt.compareSync(args.password, user.password)) {                
                         console.log('Invalid Credentials!');
                         logincheck.pwdvalidity= false;
                     }
                     else {
                       console.log('valid Credentials!');
                       //req.session.user = true;

                       logincheck.pwdvalidity= true;
                       logincheck.finalstatus= true;
                       console.log("finalstatus",logincheck)
                     }
                 }
                 }
               }
               else{
                   console.log("not valid user"); 
                }
               });
               
               return logincheck;      
            } 
        },
        subjectdetails:{//view courses
            type: SubjectDetailsType,
            args: {sjsuid:{type:GraphQLID}
                  },
            resolve(parent,args){
                    var subjectdetails = {}
               console.log("Inside Subject details get Request");
               console.log("Req Body : ",args);

               enrollstudent.find({
                'sjsuid': args.sjsuid
             }, (err, user) => {
               if (err) {
                   console.log("Unable to fetch user details.", err);
               }
               else {
                   subjectdetails = user;
                 console.log(user);
                 console.log("User found");
               }
             });

             return subjectdetails;
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
            addAuthor:{
                type: AuthorType,
                args:{
                    name:{type:new GraphQLNonNull (GraphQLString)},
                    age:{type:new GraphQLNonNull (GraphQLInt)}
                },

                resolve(parent, args){

                        let author=new Author({
                            name: args.name,
                            age: args.age
                        });
                   return author.save();
                }
            },
            addBook:{
                type:BookType,
                args:{
                    name:{type: new GraphQLNonNull (GraphQLString)},
                    genre:{type:new GraphQLNonNull (GraphQLString)},
                    authorId:{type:new GraphQLNonNull (GraphQLID)}
                },
                resolve(parent, args){

                    let author=new Book({
                        name: args.name,
                        genre: args.genre,
                        authorId: args.authorId
                    });
               return author.save();
            }
            },
            signup:{
            type: SignUpType,
            args:{sjsuid:{type:GraphQLString},
                  password:{type:GraphQLString},
                  name:{type:GraphQLString},
                  emailid:{type:GraphQLString},
                  user_flag:{type:GraphQLString},
            },

    resolve: (parent,args) => {

        console.log(args);
        return new Promise(async (resolve, reject) => {
            var successResult = false;
            var duplicateUserResult = false;
            await userDetails.findOne({
                "sjsuid": args.sjsuid
            }, (err, user) => {
                if (err) {

                }
                else {
                    if (user) {
                        console.log('User Exists!', user);
                             duplicateUserResult = true;
                          
                             
                    userDetails
                     .findOneAndUpdate(
                       { sjsuid: args.sjsuid },
                       { $name: args.name},
                       { $email: args.emailid},
                         { new: true }
                       )
                           .then(answer => {
                                res.status(200).json({ message: "User Updated successfully" });
                             });
                             resultData = {
                                success: successResult,
                                duplicateUser: duplicateUserResult
                            }
                             resolve(resultData);

                    }
                    else {

                        if (args.isFaculty){
                            console.log("if madhe");
                             var userflag = 'Y';
                         }
                          else{
                            console.log("else madhe");
                             var userflag = 'N';
                          }

                        const hashedPassword = bcrypt.hashSync(args.password);

                        var user = new userDetails({
                            sjsuid: args.sjsuid,
                            password: hashedPassword,
                            name: args.name,
                            email: args.emailid,
                            user_flag: userflag
                        });
                      
                       user.save().then((doc) => {

                            console.log("User added successfully.", doc);
                            successResult = true;
                      
                             resultData = {
                                success: successResult,
                                duplicateUser: duplicateUserResult
                            }

                        resolve(resultData);
                        });
                    }  
                }
            });
        });
    }
  },
  coursecreation:{
    type: CourseCreationType,
    args:{courseid:{type:GraphQLString},
         coursename:{type:GraphQLString},
         coursedept:{type:GraphQLString},
         coursedesc:{type:GraphQLString},
         courseroom:{type:GraphQLString},
         coursecapacity:{type:GraphQLString},
         coursewaitlist:{type:GraphQLString},
         courseterm:{type:GraphQLString}
    },

    resolve: (parent,args) => {

        return new Promise(async (resolve, reject) => {
            var successResult = false;
            var duplicateUserResult = false;
            coursecreation.findOne({
                'courseid': args.courseid 
            }, (err, user) => {
                
                
                if (err) {
                    console.log("Unable to fetch Course details.", err);       
                }
                else {
            
                    if (user) {
                        console.log('Course Exists!', user);
                            console.log('Duplicate Course');
                            duplicateUserResult = true;
                    }
            
                    else {
            
                         console.log("message is here");
                         var user = new coursecreation({
                             courseid: args.courseid ,
                             coursename: args.coursename,
                             coursedept: args.coursedept,
                             coursedesc: args.coursedesc,
                             courseroom: args.courseroom,
                             coursecapacity: args.coursecapacity,
                             coursewaitlist: args.coursewaitlist,
                             courseterm: args.courseterm
                         });
                     

                   return  user.save().then((doc) => {
            
                        console.log("Course saved successfully.", doc);
                        successResult = true;
                        resultCourseData = {
                            success: successResult,
                            duplicateUser: duplicateUserResult
                        }

                        resolve(resultCourseData);
                    });
                 }    
                 resolve(resultCourseData);
                }    
            });
        });
      }
    },
    enrollstudent:{

        type: CourseEnrollType,
        args:{
             coursedept:{type:GraphQLString},
             coursename:{type:GraphQLString},
             sjsuid:{type:GraphQLString},
             courseid:{type:GraphQLString}
        },

        resolve: (parent,args) => {

            return new Promise(async (resolve, reject) => {

                var successResult = false;
                var duplicateUserResult = false;

                console.log("Inside enroll studnet Post Request");
                var concat = args.sjsuid + args.courseid;
                console.log(concat);
              
                               var user = new enrollstudent({
                                  sjsucourseid: concat,
                                  coursedept: args.coursedept,
                                  coursename: args.coursename,
                                  sjsuid: args.sjsuid,
                                  courseid: args.courseid
                               });                 
                  
                           user.save().then((doc) => {
                  
                              console.log("Course enrolled successfully.", doc);

                              resultEnrollData = {
                                success: successResult,
                                duplicateUser: duplicateUserResult
                            }
                              resolve(resultEnrollData);
                  
                          }, (err) => {

                              console.log("Unable to save Course details.", err);
                          
                          });
                    })
                }
            }
        })
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})