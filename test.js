const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://127.0.0.1/my_database', {//connect to the database
    useNewUrlParser: true
})

// BlogPost.create({//function create - create blog post
//     title: 'The Mythbuster Guide to Saving Money on Energy Bills',
//     body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills.Energy - saving is one of my favourite money topics, because once you get past the boring bullet- point lists, a whole new world of thrifty nerdery opens up.You know those bullet - point lists.You start spotting them everything at this time of year.They go like this: '
// })
//     .then(blogpost => console.log(blogpost))//Promise function - callback function is phased out
//     .catch(error => console.log(error));

// Select all documents
BlogPost.find({})//empty array to select all documents
    .then(blogspost => {console.log(blogspost)
    })
    .catch(error => {console.log(error)
    })


//To select all documents with the title: 'The Mythbuster’s Guide to Saving Money onEnergy Bills'
BlogPost.find({
    title: 'The Mythbuster\'s Guide to Saving Money on Energy Bills',
})
    .then(blogpost => {
        console.log(blogpost)
})
    .catch(error => {console.log(error)
})


//To find all documents in BlogPosts collection with ‘The’ in the title
BlogPost.find({
   // wildcard search for The
    title: /The/
})
    .then(blogpost => {console.log(blogpost)
})
    .catch(error => {console.log(error)
})


//To get single database documents, i.e.with unique id _id, use the findById method
let id = "64ae5098b96c23c9e46d0630";
BlogPost.findById(id)
    .then(blogpost => console.log(blogpost))
    .catch(error => console.log(error))


//To update record
let id2 = "64ae522859a7c0e43c9a9dbf"; 
BlogPost.findByIdAndUpdate(id2, {
    title: 'Updated title'
},
{new: true})
    .then(blogspot => console.log(blogspot))
    .catch(error => console.log(error));


//To delete single record
// let id3 = "64ae5098b96c23c9e46d0630"; 
// BlogPost.findByIdAndDelete(id3)
//     .then(blogspot => console.log(blogspot))
//     .catch(error => console.log(error));



