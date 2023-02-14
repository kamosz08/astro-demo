import { FormEventHandler, useState } from "react";
import { todos as initialTodos } from "../../todos";

export const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addToDo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    setTodos((old) => [
      ...old,
      { name: target.name.value, done: false, id: old.length + 1 },
    ]);
  };

  const changeDoneStatus = (id: number) => {
    setTodos((old) =>
      old.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  return (
    <div>
      <p className="text-center">This is SSR with js shipped to client</p>
      <div className="container max-w-screen-md m-auto p-8 bg-white rounded-xl">
        <h1 className="text-6xl font-black tracking-tighter lowercase">
          To-Do List
        </h1>
        <div className="my-4 flex space-x-4">
          <form onSubmit={addToDo}>
            <input
              name="name"
              type="text"
              className="flex-auto border p-2 rounded"
              placeholder="Do laundry"
            />
            <button className="uppercase font-semibold tracking-wider px-4 py-2 rounded text-white bg-blue-600">
              Add to-do
            </button>
          </form>
        </div>
        <ul className="flex flex-col border rounded-xl divide-y">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-4 hover:bg-blue-100 flex justify-between cursor-pointer"
              onClick={() => changeDoneStatus(todo.id)}
            >
              {todo.name}
              {todo.done && <div className="text-green-500">Done</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
