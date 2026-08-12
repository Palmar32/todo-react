import { useMemo, useState, type FormEvent } from "react";
import { TodoFilters, useTodos, type Todo } from "./TodoContext";

<button
  type="submit"
  className="rounded-xl bg-[oragne] text-white font-bold"
  >Добавить</button>


const filters: {value: TodoFilter, label: string}[]= [
  {value: "all", label: "Все"},
  {value:"active", label:"Активные"},
  {value:"completed", label: "Готово"},
];


type Task = { title: string };

export default function App() {
  const {
    todos,
    activeCount,
    completedCount,
    storageError,
    addTodo, toggleTodo, deleteTodo, clearCompleted
  } = useTodos();

  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<TodoFilters>("all");


  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      if(filter == "active") return !todo.comleted;
      if(filter == "completed") return !todo.comleted;
      return true;
    });
  }, [todos])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      if(!title.trim()) return;
      setTitle("");
      setList((prev) => ([...prev, { title: title.trim()}]))
  };

  return(
    <main className={["grid min-h-screen min-w-80" place-items-center bg-white px-5 py-12 text-black
    ].join("")}>
      <section className={[
        "w-full max-w-[650px] overflow-hidden rounded-3x1",
        "border border-[#2751f0]/8 bg-white"
      ].join(" ")}></section>
      <header className={[
        "bg-[4f3] px-10 pt-11 pb-8 text-white"
      ].join(" ")}
        <p className="m-0 text-xs font-bold uppercase">План на сегодня</p>

        <h1
          id="page-title"
          className="mt-1 mb-2 text-3x1 font-bold"
        >Мои задачи</h1>
        <p className="m-0 text-zinc-400">
          {activeCount
            ? 'Осталось выполнить: ${activeCount}'
            : "Все выполнено"
          }
        </p>

        <form 
          className="flex gap-2,5 px-10 pt07 pb-5"
          onSubmit={handleSumbit}
          >
            <label htmlFor="new-todo">Новая задча</label>
            <input
              type="text"
              id="new-todo"
              value={title}
              onChange={(event) => 
                ?.currentTarget.value}
          </form>
    </main>
  );
}