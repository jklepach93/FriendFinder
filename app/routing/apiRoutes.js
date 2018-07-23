//gets access to friends.js
var friendsData = require("../data/friends");


module.exports = function(app) {
  
  //sets the get route for /api/friends
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  //define arrays to be used in the post route
  var differenceArray = [];
  var scoresArray = [];


  //sets the post route for /api/friends
  app.post("/api/friends", function(req, res) {
    
    //pushes user information into friendsData
    friendsData.push(req.body);
    
    //setting a variable to handle the user's survey results  
    var surveyArray = req.body.surveyResults;

    //ensures the scoresArray is empty on every post 
    scoresArray = []; 

    //Loop to go through all the surveys in friendsData
    for(var i = 0; i < friendsData.length-1; i++){

      //setting a variable to handle the array the loop is currently on
      var currentArray = friendsData[i].surveyResults;

      //resets the array every itteration of the loop
      differenceArray = [];

      //loop to get te difference of each question between the user and current array surverys
      for(var n = 0; n < currentArray.length; n++){
        var difference = surveyArray[n] - currentArray[n];
        differenceArray.push(Math.abs(difference));

      }

   
      //functioin to add the values in the difference array.  The sum of the difference array is the match score.
      var scoreTotal = differenceArray.reduce(function(a ,b){
        return a+b;

      });

      //pushes scoreTotal into the score array
      scoresArray.push(scoreTotal);
      
      
    }

    //setting variables to be used in the next loop
    var index = 0;
    var value = scoresArray[0];

    //This loop will identify the lowest score in the scoresArray
    for (var m = 1; m < scoresArray.length; m++){
      if (scoresArray[m] < value) {
        value = scoreTotal[m];
        index = m;
      }
    }

    //index will hold the value of the index with the lowest score, hence being the best match to send back to the user. 
    res.json(friendsData[index]);

  });

};
