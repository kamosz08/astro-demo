<script>
  import { todos as initialTodos } from "../../todos";

  let todos = [...initialTodos];
  let input = "";

  function addToDo() {
    if (input)
      todos = [
        ...todos,
        {
          name: input,
          done: false,
          id: todos.length + 1,
        }
      ];
    input = "";
  }

  function changeDoneStatus(id) {
    todos = todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

</script>

 <div>
      <p class="text-center">This is SSR with js shipped to client</p>
      <div class="container max-w-screen-md m-auto p-8 bg-white rounded-xl">
        <h1 class="text-6xl font-black tracking-tighter lowercase">
          To-Do List
        </h1>
        <div class="my-4 flex space-x-4">
          <form on:submit|preventDefault={addToDo}>
            <input
              name="name"
              bind:value={input}
              type="text"
              class="flex-auto border p-2 rounded"
              placeholder="Do laundry"
            />
            <button class="uppercase font-semibold tracking-wider px-4 py-2 rounded text-white bg-blue-600">
              Add to-do
            </button>
          </form>
        </div>
        <ul class="flex flex-col border rounded-xl divide-y">
          {#each todos as todo (todo.id)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
              key={todo.id}
              class="p-4 hover:bg-blue-100 flex justify-between cursor-pointer"
              on:click={() => changeDoneStatus(todo.id)}
            >
              {todo.name}
              {#if todo.done}<div class="text-green-500">Done</div>{/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
