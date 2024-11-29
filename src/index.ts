import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [];
let currentId = 1;

app.post("/todo", (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "incorrect" });
  }
  const newTask: Task = { id: currentId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get("/todo", (_req: Request, res: Response) => {
  res.json(tasks);
});

app.put("/todo/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return res.status(404).end();
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

app.delete("/todo/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).end();
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;