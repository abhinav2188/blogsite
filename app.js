const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

mongoose.connect('mongodb://localhost/blogDB', {useNewUrlParser: true,useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public/'));
app.set('view engine', 'ejs');

let homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nibh turpis, imperdiet posuere elementum sit amet, tincidunt at nunc. Praesent maximus, lectus quis commodo facilisis, arcu dolor semper sapien, at consectetur erat eros in ipsum. Quisque elementum tincidunt libero. Pellentesque convallis erat vel nibh tincidunt, aliquam facilisis sapien varius. Nulla eget suscipit est. Nunc eget gravida felis. Nullam ipsum metus, mollis a leo porttitor, fringilla fringilla ex. In vel mi sit amet sem efficitur euismod nec in neque. Suspendisse potenti. Nunc est nisi, finibus ut enim ac, tempor feugiat erat. Cras laoreet arcu neque, vel posuere sem congue sit amet. Phasellus in ullamcorper ligula, id consectetur tortor. Nulla facilisi. Nullam vestibulum nisl urna, eu blandit felis dapibus eget. Etiam eget pellentesque mi, sed tempus quam.";
let aboutStartingContent = "Suspendisse viverra ex et nulla ultrices varius vel viverra odio. Pellentesque at lacinia purus. Suspendisse volutpat condimentum nulla. Sed ornare viverra augue, ullamcorper aliquam arcu consectetur nec. Proin sit amet ipsum interdum, malesuada massa sit amet, luctus enim. Integer ut laoreet neque. Proin ornare mattis mi non congue. Duis lectus risus, semper nec mi a, aliquam placerat est. Quisque ut faucibus nisi, quis cursus urna." ;
let contactStartingContent = "Morbi consectetur et nulla ac facilisis. Ut tristique gravida magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit, urna at cursus venenatis, dolor nisl tincidunt metus, non egestas leo mauris vitae risus. Donec at dapibus nunc. Aliquam turpis risus, tempus sed ligula et, pellentesque feugiat justo. Mauris suscipit odio ut fermentum tempus. Nulla rhoncus sit amet mi sollicitudin interdum. Quisque laoreet placerat purus, vel pulvinar magna tincidunt sed. Sed suscipit auctor nisi a placerat. Fusce malesuada nunc eu nisi hendrerit, sed dictum risus lacinia. Vestibulum egestas mauris eget vestibulum sollicitudin. Quisque viverra id velit facilisis molestie. Cras in gravida arcu. Sed nulla arcu, aliquet et vestibulum at, aliquam at nulla." ;

let posts = [];
const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  images:{
    type:Array,
    required:false,
  }
});
const Post = mongoose.model('post',postSchema);

// let defaultPost = new Post({
//   title:'default title',
//   body:'In a mollis purus. Donec vel molestie mauris. Quisque molestie tortor nunc, sed porta tellus consequat a. Donec non purus sed ante venenatis pretium eget sed risus. '
// });
// defaultPost.save();

//home page with posts
app.get('/',function(req,res){
  Post.find({},function(err,posts){
    if(!err){
      res.render('home' , {
        homeStartingContent : homeStartingContent,
        posts : posts,
      });
    }
  })
});

//about page
app.get('/about',function(req,res){
  res.render('about' , {
    aboutStartingContent : aboutStartingContent,
  });
});

//contact page
app.get('/contact',function(req,res){
  res.render('contact' , {
    contactStartingContent : contactStartingContent,
  });
});

// compose page
app.get('/compose',function(req,res){
  res.render('compose');
});

// compose new post
app.post('/compose',function(req,res){
  let imgArr = [req.body.postImage,];
  console.log(imgArr);
  let newPost = new Post({
    title : req.body.postTitle,
    body: req.body.postBody,
    images:imgArr
  });
  newPost.save();
  res.redirect('/');
});

//route to get post by its id
app.get('/post/:postId' , function(req,res){
  reqPostId = req.params.postId;
  Post.findById(reqPostId,(err,foundPost) => {
    res.render('post',{
      post:foundPost
    });
  })
});

app.listen(3000,function(){
  console.log("server started at port 3000");
});
