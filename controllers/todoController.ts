import { Request,Response } from "express";

import Todo from '../models/todoModels';


export const getTodos= async (req:Request,res:Response)=>{
    try{
        const todos=await Todo.find().sort({createdAt: -1})
        res.render('index',{todos})
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Server Error');
      }
}

export const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { task } = req.body;
      if (!task || task.trim() === '') {
        return res.redirect('/');
      }
      await Todo.create({ task });
      res.redirect('/');
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).send('Server Error');
    }
  };


export const toggleTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Todo.findById(taskId);
    
    if (!task) {
      return
    }
    
    task.completed = !task.completed;
    await task.save();
    
    res.redirect('/');
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(500).send('Server Error');
  }
};


export const getEditTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const task = await Todo.findById(taskId);
    
    if (!task) {
      return 
    }
    
    res.render('edit', { task });
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).send('Server Error');
  }
};

// Update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { task } = req.body;
    
    if (!task || task.trim() === '') {
      return res.redirect('/');
    }
    
    await Todo.findByIdAndUpdate(taskId, { task });
    res.redirect('/');
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Server Error');
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    await Todo.findByIdAndDelete(taskId);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Server Error');
  }
};