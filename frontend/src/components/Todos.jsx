import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTodos,addTodo,deleteTodo,toggleComplete} from "../services/Todoservices";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Todos() {
  const {user}=useAuth();
  const [open, setOpen] = useState(false);
  const [dueDate,setDueDate]=useState(null);
  const [priority, setPriority] = useState("");
  const [description,setDescription]=useState("")
  const [title,setTitle]=useState("")
  const [todos,setTodos]=useState([])
  const [editingId, setEditingId] = useState(null);


  
  if (!user) return <Navigate to="/login" />;
useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data.data);
      } catch (err) {
        console.error("Error fetching todos", err);
      }
    };

    fetchTodos();
  }, []);

  
   
   const handleDelete = async (id) => {
  try {
    await deleteTodo(id)
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  } catch (err) {
    console.error("Failed to delete todo", err);
  }
};  


  const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    title,
    description,
    priority,
    dueDate: dueDate ? dueDate.toISOString() : null,
  };

  try {
    const response = await addTodo(payload);

setTodos((prev) => [...prev, response.data]);

    setOpen(false); 
  } catch (err) {
    console.error("Failed to add todo", err);
  }
};

const handleComplete = async (id) => {
  try {
    const response = await toggleComplete(id);

    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? response.data : todo
      )
    );
  } catch (err) {
    console.error("Failed to toggle complete", err);
  }
};






  return (
    <div>
      <h1 className="font-bold text-4xl mt-4 p-4 text-center">
        Welcome {user.username || "Guest"}!
      </h1>

      
      <div className="flex justify-center">
        <Button onClick={() => setOpen(true)}>Add Todo +</Button>
      </div>

    
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">  
  <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
  <Textarea placeholder="Description (optional)" value={description} onChange={(e)=>setDescription(e.target.value)} />

  
  <DatePicker date={dueDate} setDate={setDueDate} />
  <Select value={priority} onValueChange={setPriority}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select priority" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="low">Low</SelectItem>
    <SelectItem value="medium">Medium</SelectItem>
    <SelectItem value="high">High</SelectItem>
  </SelectContent>
</Select>
  <div className="flex justify-end gap-2">
    <Button variant="secondary" onClick={() => setOpen(false)}>
      Cancel
    </Button>
     <Button type="submit">Save</Button>
</div> 
</form>
        </DialogContent>
      </Dialog>
      
      <div className="flex flex-col gap-2 items-center mt-6">
        {todos.map((todo) => (
          <div key={todo._id} className="flex gap-2 items-center">
            <div className="h-[45px] w-[300px] rounded px-3 flex items-center bg-slate-600 text-white dark:bg-secondary dark:text-secondary-foreground shadow-sm">
            <span className={todo.completed ?"line-through text-gray-500":""}>{todo.title}</span>
            </div>
            <Button variant="destructive" onClick={()=>handleDelete(todo._id)}>Delete</Button>
            <Button variant="secondary"  onClick={() => handleEditSave(todo)}>Edit</Button>
            <Button variant="success" onClick={() => handleComplete(todo._id)}>{todo.completed ? "Completed" : "Mark Complete"}</Button>
          </div>
        ))}
      </div>
    </div>
  );

}

export default Todos;
