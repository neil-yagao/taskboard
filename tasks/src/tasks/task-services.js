import dbObject from '../db/mongo-connection'

let taskCollection = dbObject.collection('tasks');
let taskServices = {
  insertTasks(tasks){
    if(!tasks){
      return '';
    }
    taskCollection.insert(tasks)
  },
  readTasks(condition){
    return taskCollection.find(condition)
  }
}
export default taskServices;
