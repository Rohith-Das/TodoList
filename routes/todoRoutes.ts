import express from 'express';
const routes = express.Router();
import { 
  getTodos, 
  addTask, 
  toggleTask, 
  getEditTask, 
  updateTask, 
  deleteTask 
} from '../controllers/todoController';

// const routes = express.Router();

routes.get('/',getTodos)
routes.post('/add', addTask);
routes.post('/toggle/:id', toggleTask);
routes.get('/edit/:id', getEditTask);
routes.post('/update/:id', updateTask);
routes.post('/delete/:id', deleteTask);

export default routes;














