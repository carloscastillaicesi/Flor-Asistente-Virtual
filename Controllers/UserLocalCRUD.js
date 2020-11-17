var fs = require("fs");
const { search } = require("../Routes/inboundRouter");
var fileData = fs.readFileSync('userStage.json');
var file = JSON.parse(fileData);


/**
 * @params id - 
 */
searchData = (id) => {


 /** 
  * @TODO search in the local JSON file for an index and return a stage
  */


};


/**
 * @params id - 
 */
writeData = (id) => {


 /** 
  * @TODO search in the local JSON file for an index and return a stage
  */


};


/**
 * @params id - 
 */
newUser = (id) => {


 /** 
  * @TODO search in the local JSON file for an index and return a stage
  */


};




module.exports = { searchData, writeData };



