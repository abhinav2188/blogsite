const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public/'));
app.set('view engine', 'ejs');

app.listen(3000,function(){
  console.log("server started at port 3000");
});

let homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nibh turpis, imperdiet posuere elementum sit amet, tincidunt at nunc. Praesent maximus, lectus quis commodo facilisis, arcu dolor semper sapien, at consectetur erat eros in ipsum. Quisque elementum tincidunt libero. Pellentesque convallis erat vel nibh tincidunt, aliquam facilisis sapien varius. Nulla eget suscipit est. Nunc eget gravida felis. Nullam ipsum metus, mollis a leo porttitor, fringilla fringilla ex. In vel mi sit amet sem efficitur euismod nec in neque. Suspendisse potenti. Nunc est nisi, finibus ut enim ac, tempor feugiat erat. Cras laoreet arcu neque, vel posuere sem congue sit amet. Phasellus in ullamcorper ligula, id consectetur tortor. Nulla facilisi. Nullam vestibulum nisl urna, eu blandit felis dapibus eget. Etiam eget pellentesque mi, sed tempus quam.";
let aboutStartingContent = "Suspendisse viverra ex et nulla ultrices varius vel viverra odio. Pellentesque at lacinia purus. Suspendisse volutpat condimentum nulla. Sed ornare viverra augue, ullamcorper aliquam arcu consectetur nec. Proin sit amet ipsum interdum, malesuada massa sit amet, luctus enim. Integer ut laoreet neque. Proin ornare mattis mi non congue. Duis lectus risus, semper nec mi a, aliquam placerat est. Quisque ut faucibus nisi, quis cursus urna." ;
let contactStartingContent = "Morbi consectetur et nulla ac facilisis. Ut tristique gravida magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit, urna at cursus venenatis, dolor nisl tincidunt metus, non egestas leo mauris vitae risus. Donec at dapibus nunc. Aliquam turpis risus, tempus sed ligula et, pellentesque feugiat justo. Mauris suscipit odio ut fermentum tempus. Nulla rhoncus sit amet mi sollicitudin interdum. Quisque laoreet placerat purus, vel pulvinar magna tincidunt sed. Sed suscipit auctor nisi a placerat. Fusce malesuada nunc eu nisi hendrerit, sed dictum risus lacinia. Vestibulum egestas mauris eget vestibulum sollicitudin. Quisque viverra id velit facilisis molestie. Cras in gravida arcu. Sed nulla arcu, aliquet et vestibulum at, aliquam at nulla." ;

let posts = [];

app.get('/',function(req,res){
  res.render('home' , {
    homeStartingContent : homeStartingContent,
    posts : posts,
  });
});

app.get('/about',function(req,res){
  res.render('about' , {
    aboutStartingContent : aboutStartingContent,
  });
});

app.get('/contact',function(req,res){
  res.render('contact' , {
    contactStartingContent : contactStartingContent,
  });
});

app.get('/compose',function(req,res){
  res.render('compose');
});

app.post('/compose',function(req,res){
  let post = {
    'title' : req.body.postTitle,
    'body' : req.body.postBody
  }
  posts.push(post);
  res.redirect('/');
});

app.get('/post/:postTitle' , function(req,res){
  reqPostTitle = req.params.postTitle.split('-').join(' ');
  posts.forEach(post => {
    if(post.title.toLowerCase() === reqPostTitle){
      console.log("match found");
      res.render('post',{
        post : post,
      })
    }
  })
})
