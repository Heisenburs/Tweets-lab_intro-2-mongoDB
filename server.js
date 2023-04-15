require('dotenv').config()

// const mongoose = require('mongoose')
const express = require('express')
const connectToDb = require('./config/db')
const Tweet = require('./models/Tweet')

const app = express()

// app.get('/', (req, res) => {
//     res.send('Success! Server is Up')
// })

//? data comes from the client or react app


const manyTweets = [
{
    title: "Deep Thoughts",
    body: "Friends, I am the realest coder alive",
    author: "Arthur",
  },
  {
    title: "Sage Advice",
    body: "Friends, I am awesome and you are too",
    author: "Arthur",
    likes: 20,
  },
  {
    title: "Is TI the Jadakiss of the South",
    body: "TI is severely underrated and we need to fix that expeditiously",
    author: "Arthur",
    likes: 40,
  },
  {
    title: "Crypto",
    body: "Friends, I have spent $2300 to be one of the first people to own a random jpeg and that makes me cool",
    author: "Arthur",
    likes: 162,
  },
  {
    title: "Confusion",
    body: "Friends, why do you just respond with the word `dislike`? Surely you mean to click the like button?",
    author: "Arthur",
    likes: -100,
  },
  {
    title: "Vespa",
    body: "Friends, my Vespa has been upgraded to run on old french fry oil. Its top speed is now 11 mph",
    author: "Arthur",
    likes: 2,
  },
  {
    title: "Licensed",
    body: "Friends, I am now officially licensed to teach yogalates. Like this to get 10% off a private lesson",
    author: "Arthur",
    likes: 3,
  },
  {
    title: "Water",
    body: "Friends, I have been collecting rain water so I can indulge in locally sourced raw water. Ask me how",
    author: "Arthur",
  },
];

app.get('/tweets/sort', (req, res) => {
//! an advanced method of sorting tweets
    //?                                      " -id" will remove that query from being returned?
    Tweet.find({ likes: { $gte: 20 } }, "title ")
  .limit(2)
  .sort("-title")
  .exec()
// if database transaction succeeds
.then((tweets) => {
  console.log(tweets)
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
})

app.get("/tweets/count", (req, res) => {
    //! returns the count of documents that match the query
    Tweet.countDocuments({ likes: { $gte: 20 } })
// if database transaction succeeds
.then((count) => {
  console.log(count)
  res.send({count: count})
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
})

app.get('/trending', (req,res) => {
//! advanced filtering/searching (using operators to filter)
Tweet.find({ likes: { $gt: 20 } })
    //?  ' has the like value greater than or equal to 20 '
// if database transaction succeeds
.then((tweets) => {
  res.send(tweets)
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
})


app.get('/', (req, res) => {
//! you can add more queries (ex.' title body likes ') to specify which data you want returned
Tweet.find({}, 'title body likes')
// if database transaction succeeds
.then((tweets) => {
  res.send(tweets)
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
})




app.get('/tweets', (req, res) => {
 //! find all tweets   
    Tweet.find({})
// if database transaction succeeds
.then((tweets) => {
  res.send(tweets)
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
})

app.delete('/tweets/:id', (req, res) => {
//! filter an remove by addt'l query (id)
Tweet.findById({ title: req.params.id })
// if database transaction succeeds
.then((tweet) => {
  res.redirect('/tweets')
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
})

app.delete('/tweets/:title', (req, res) => {
//! filter an remove by addt'l query (title)
Tweet.findOneAndRemove({ title: req.params.title })
// if database transaction succeeds
.then((tweet) => {
  res.redirect('/tweets')
})
// if database transaction fails
.catch((error) => {
  console.log(error)
})
})

app.get('/tweet/:title', (req, res) => {
    //! filtering/ searching the array by the title
    Tweet.find({ title: req.params.title })
    // if database transaction succeeds
    .then((tweet) => {
      res.send(tweet)
    })
    // if database transaction fails
    .catch((error) => {
      console.log(error)
    })
    })

//! create many tweets
// Tweet.insertMany(manyTweets)
// // if database transaction succeeds
// .then((tweets) => {
//   console.log(tweets)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
// console.log('runs anyway');
// })


//! create a single tweet
app.get('tweet/new', (req, res) => {
  // Data I created
  const myFirstTweet = {
     title: 'Thought 1',
     body: "i will be successful",
     author: "You",
 }
 Tweet.create(myFirstTweet)
     //? if db transaction is successful
     .then(tweet => {
         // res.send('Tweet Created')
         console.log(tweet);
     })
     .catch((error) => {
      console.error(error)
     })
     .finally(() => {
         console.log('this runs if the promise is completed or rejected');
     })
})


// 

app.listen(4000, () => {
    console.log('Running...');
     //? connection to MongoDb
    connectToDb()
})