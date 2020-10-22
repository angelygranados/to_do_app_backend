const express = require("express");
const UserTasksService = require("../services/user_tasks.js");

function usersTasksApi(app) {
  const router = express.Router();
  app.use("/api/tasks", router);

  const userTasksService = new UserTasksService();

  router.get("/", async function (req, res, next) {
    try {
      const tasks = await userTasksService.getTasks();
      res.status(200).json({
        data: tasks,
        message: "All tasks listed",
      });
    } catch (err) {
      next(err);
    }
  });
  router.get("/task/:taskId", async function (req, res, next) {
    const { taskId } = req.params;
    try {
      const task = await userTasksService.getSingleTasks({ taskId });
      res.status(200).json({
        data: task,
        message: "single tasks retrieved",
      });
    } catch (err) {
      next(err);
    }
  });
  router.get("/:userId", async function (req, res, next) {
    const { userId } = req.params;
    try {
      const userTasks = await userTasksService.getUserTasks({ userId });
      res.status(200).json({
        data: userTasks,
        message: "User tasks listed",
      });
    } catch (err) {
      next(err);
    }
  });
  router.post("/", async function (req, res, next) {
    const { body: task } = req;
    try {
      const createTaskId = await userTasksService.createTask({ task });
      res.status(201).json({
        data: createTaskId,
        message: "task created",
      });
    } catch (err) {
      next(err);
    }
  });
  router.put("/:taskId", async function (req, res, next) {
    const { taskId } = req.params;
    const { body: task } = req;
    try {
      const updatedTaskId = await userTasksService.updateTask({ taskId, task });
      res.status(200).json({
        data: updatedTaskId,
        message: "task updated",
      });
    } catch (err) {
      next(err);
    }
  });
  router.delete("/:taskId", async function (req, res, next) {
    const { taskId } = req.params;
    try {
      const deletedTaskId = await userTasksService.deleteTask({ taskId });
      res.status(200).json({
        data: deletedTaskId,
        message: "task deleted",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersTasksApi;
