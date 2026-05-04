import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ FIXED getTasks (NO WARNING)
  const getTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  // ADD TASK
  const addTask = async () => {
    if (!title) return;

    await API.post(
      "/tasks",
      { title, priority },
      { headers: { Authorization: token } }
    );

    setTitle("");
    getTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: token },
    });
    getTasks();
  };

  // EDIT TASK
  const editTask = async (id) => {
    const newTitle = prompt("Edit task:");
    if (!newTitle) return;

    await API.put(
      `/tasks/${id}`,
      { title: newTitle },
      { headers: { Authorization: token } }
    );

    getTasks();
  };

  // DRAG
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setTasks(items);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>Task Manager</h2>
        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <h1>Dashboard 🚀</h1>

        {/* INPUT */}
        <div style={styles.inputBox}>
          <input
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>

          <button onClick={addTask}>Add</button>
        </div>

        {/* TASK LIST */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...styles.task,
                          borderLeft: `6px solid ${getColor(
                            task.priority
                          )}`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span>{task.title}</span>

                        <div>
                          <button
                            style={styles.edit}
                            onClick={() => editTask(task._id)}
                          >
                            ✏️
                          </button>

                          <button
                            style={styles.delete}
                            onClick={() => deleteTask(task._id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

// COLORS
const getColor = (priority) => {
  if (priority === "high") return "#ef4444";
  if (priority === "medium") return "#f59e0b";
  return "#22c55e";
};

// STYLES
const styles = {
  container: { display: "flex", height: "100vh" },

  sidebar: {
    width: "220px",
    background: "#0f172a",
    color: "#fff",
    padding: "20px",
  },

  logout: {
    marginTop: "20px",
    background: "#ef4444",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "30px",
    background: "#f1f5f9",
  },

  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  task: {
    background: "#fff",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  edit: {
    marginRight: "10px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  delete: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};