const MongoLib = require("../lib/mongo");
class userTasksService {
  constructor() {
    this.collection = "users_tasks";
    this.mongoDB = new MongoLib();
  }

  async getTasks() {
    const tasks = await this.mongoDB.getAll(this.collection);
    return tasks || [];
  }
  async getUserTasks({ userId }) {
    const userTasks = await this.mongoDB.getAllByUser(this.collection, userId);
    return userTasks || [];
  }
  async createTask({ task }) {
    const createdTask = await this.mongoDB.create(this.collection, task);
    return createdTask;
  }
  async updateTask({ taskId, task } = {}) {
    const updatedTask = await this.mongoDB.update(
      this.collection,
      taskId,
      task
    );
    return updatedTask;
  }
  async deleteTask({ taskId }) {
    const deletedTaskId = await this.mongoDB.delete(this.collection, taskId);
    return deletedTaskId;
  }
}

module.exports = userTasksService;
