var dbObject = require('../db/mongo-connection')

var taskCollection = dbObject.collection('tasks');
var taskServices = {
  insertTasks(tasks){
    if(!tasks){
      return '';
    }
    taskCollection.insert(tasks)
  },
  findTasks(condition){
    var result =  [];
    taskCollection.find(condition,(error,doc)=>{
      result = doc;
    });
    return result;
  }
}

module.exports = taskServices;
