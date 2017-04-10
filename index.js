#!/usr/bin/env node
const _ = require("lodown-jmtardo");
'use strict';

const customers = require("./data/customers.json");


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
 
 
 //1. Find the number of males.
 
 var numMales = _.reduce(customers, function(prevDudeCount, currentDude, i) {
    if(customers[i]['gender'] === "male") {return prevDudeCount + 1;}
    else {return prevDudeCount;}
}, 0);
console.log(`There are: ${numMales} males!` ); 




//2. Find the number of females.

 var numFemales = _.reduce(customers, function(prevLadyCount, currentLady, i) {
    if(customers[i]['gender'] === "female") {return prevLadyCount + 1;}
    else {return prevLadyCount;}
}, 0);
console.log(`There are: ${numFemales} females!` ); 



//3. Find the name and age of the oldest customer.

//can get age with reduce, but having trouble connecting name to that age. 
//loop stops when name is connected using reduce. 
//why can't call function in console.log? 

var oldAge = 0;
var oldName = "";

var oldCust = _.each(customers, function (val, i, col) {
    if(customers[i]["age"]  > oldAge) {
        oldAge = customers[i]["age"];
        oldName = customers[i]["name"];
    } return oldName, oldAge;
     
});
console.log(oldName + " is the oldest customer, " + oldName + " is " +oldAge + "!" );




//4. Find the name and age of the youngest customer. 
//youngest is 22- there are 2 22yos 

var youngAge = 2500;
var youngName = "";

var youngCust = _.each(customers, function (val, i, col) {
    if(customers[i]["age"]  < youngAge) {
        youngAge = customers[i]["age"];
        youngName = customers[i]["name"];
    } 
    else if (customers[i]["age"]  === youngAge){
         youngName += " and " + customers[i]["name"];
    }
    return youngName, youngAge;
});
console.log(youngName + " are the youngest customers, " + youngName + " are " +youngAge + "!" );




//5. Find the average balance of all the customers. "balance"
//only returns last balance of array 
 
function averageBal(people){
    var oldMoney = [];  
    var newMoney = [];
    var total = 0;
    var avgBalance = 0;
    
    _.each(people, function(cust, i, people){    
        oldMoney.push(cust["balance"].slice(1, cust["balance"].length).replace(/,/g, ""));});  
        
    _.each(oldMoney, function(amt, i, coll){newMoney.push(Number.parseFloat(amt));});
    _.each(newMoney, function(val, i, newMoney){ total += val; avgBalance = total/(i+1)});
 
 return "The average balance is " + avgBalance + " dollars.";
}
console.log(averageBal(customers));


//6. Find how many customers' names begin with an arbitrary letter. 
//Write a function to answer this question, then log an answer.

 var searchCustLetter = "S";
 var custNameBeginsWith = _.reduce(customers, function(prevName, currentName, i) {
      
    if(customers[i]['name'].charAt(0) === searchCustLetter) {return prevName + 1;}
   
    else {return prevName;}
}, 0);

console.log(`Found: ${custNameBeginsWith} name(s) starting with ${searchCustLetter}!` ); 




//7. Find how many customers' _friends'_ names begin with an arbitrary letter. 
//Write a function to answer this question, then log an answer.

function custFriNameBeginsWith(people, char){
    var allFriends = []; 
    var count = 0;
    
    _.each(people, function(person, i, people){
        if (people[i].hasOwnProperty("friends")){
            _.each(people[i]["friends"], function(friend, j, friends){
                allFriends.push(friend);
            });
        }
    });
    
    _.each(allFriends, function(friendObj, i, allFriends){
        if (allFriends[i]["name"].charAt(0).toUpperCase() === char.toUpperCase()){
            count += 1;
        }
    });
    return "There were " + count + " friends of customers with names that began with " + char + "!";
    
}
console.log(custFriNameBeginsWith(customers, "D"));
 /*
var searchFriLetter = "S";

 var custFriNameBeginsWith = _.reduce(customers, function(prevName, currentName, i) {
      
    if(customers[i].friends['name'].charAt(0) === searchFriLetter) {return prevName + 1;}
   //issues getting into the glove box 
    else {return prevName;}
}, 0);

console.log(`Found: ${custFriNameBeginsWith} friend name(s) starting with ${searchFriLetter}!` ); 

 */


//8. Find the names of all customers who are friends with a given customer (by name). 
//i.e. Which customers have that customer's name in their friends list?
 
function letsStalk(people, person){  
    var customersFriends = [];
    _.each(people, function(customer, i , people){
        if (people[i].hasOwnProperty("friends")){
            _.each(people[i]["friends"], function(friend, j, friends){
                if (people[i]["friends"][j]["name"] === person){
                    customersFriends.push(people[i]["name"]);
                }
            });
        }
    });
   return person + " is in the friends list of " + customersFriends; 
}
console.log(letsStalk(customers, "Shelly Walton"));
 

 

 
 
 
 //9. Find the top 3 most common tags among the customers.
 // "tags" ['string array']
 
 
 function topTag(people){
    var theTags = []; 
  
    _.each(people, function(person, i, people){
        if (people[i].hasOwnProperty("tags")){
            _.each(people[i]["tags"], function(tag, j, tags){
                theTags.push(tag);
            });
        }
    });
    
    var noDup = _.unique(theTags);  
    var occurance = {};                
    _.each(noDup, function(tag, i, noDup){
        occurance[tag] = 0;
    });
    
    
    _.each(theTags, function(tag, i, theTags){
        _.each(noDup, function(sDup, j, noDup){
          if (theTags[i] === noDup[j]){
              occurance[noDup[j]] += 1;    
          }  
        });
    });
    
    var greatOccurance = 0;
    var popTag = "";
    _.each(occurance, function(timesOccured, tag, occurance){
        if (occurance[tag] > greatOccurance){
            greatOccurance = occurance[tag];
        }
    });
    
    var mostPop = [];
    _.each(occurance, function(timesOccured, tag, occurance){
        if (timesOccured === greatOccurance){
            mostPop.push(tag);
            popTag += tag + ", ";
        }
    });
    
   
    return "There are " + mostPop.length + " top tags: " +popTag+ "with " +greatOccurance+ " occurances each.";

}
console.log(topTag(customers));
 
 
 //10. Create a summary of genders
 
 function custGender(people){
   var genders = {};
   _.each(people, function(person, i, people){
       if (genders.hasOwnProperty(person["gender"]) === false){
           genders[person["gender"]] = 0;
       }
   });
   _.reduce(people, function(total, nextInLine, i){
       if (genders.hasOwnProperty(people[i]["gender"])){
           return genders[people[i]["gender"]] += 1;
       } else { return total;
   }}
   , 0);
       
   return genders;
   
}

console.log(custGender(customers));