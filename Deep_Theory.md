# Day 12 – Full Real Deep Content
## 1) useState Deep Dive + Batching Updates

---

 1  `useState` :
`useState` is a **React Hook** that allows functional components to manage and update state.

It helps React components store **dynamic values** like:
- counter values
- form input data
- toggle states
- API response data
- user details

### Syntax
```jsx
const [state, setState] = useState(initialValue);

Where:

state → current value
setState → function to update value
initialValue → default state value

1 Basic Example :
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
How it works
initial value = 0
click button → setCount() runs
React updates state
component re-renders
updated value appears on UI

2 Why useState is Important :

Without useState, components show only static UI.

With useState, UI becomes interactive.

Use cases
counters
show/hide password
login forms
dark mode toggle
cart item count
modal open/close

3 State Updates Cause Re-render :

Whenever state changes, React re-renders the component.

setCount(1);

After this:

component function runs again
UI updates automatically

This is called re-rendering.

4 State Updates are Asynchronous :

State does not update immediately.

setCount(count + 1);
console.log(count);

The console.log may print the old value.

Example:

const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // still old value
};

Because React schedules update for the next render cycle.

5 Multiple State Updates Problem :
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
Expected
3
Actual
1

Because all three lines use the same previous count value.

If count = 0, then all become:

setCount(1);
setCount(1);
setCount(1);

So final result is 1.

6 Functional Updates (Very Important) :

When new state depends on previous state, use callback form.

setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
Output
3
Why?

Each update gets the latest previous value.

Example flow:

0 → 1
1 → 2
2 → 3

This is the best practice.

7 Batching Updates (Most Important) :

React groups multiple state updates into one render.

This is called batching.

setCount(prev => prev + 1);
setName("Anjali");
setVisible(true);

Instead of 3 renders, React performs only 1 render.

8 Why Batching is Used :

Batching improves:

performance
speed
fewer re-renders
better user experience

Without batching:

setCount(1); // render 1
setName("A"); // render 2
setAge(22); // render 3

Too many renders = slow app

With batching:

only 1 render

9 Automatic Batching in React 18+ :

React 18 automatically batches updates in:

event handlers
promises
setTimeout
setInterval
API calls
async functions
Example
setTimeout(() => {
  setCount(c => c + 1);
  setName("React");
}, 1000);

Both updates happen in one render.

10 Object State Example :
const [user, setUser] = useState({
  name: "Anjali",
  age: 22
});
Update one field
setUser(prev => ({
  ...prev,
  age: 23
}));
Why spread operator?

React replaces the whole object.

Without spread:

setUser({ age: 23 });

Output:

{ age: 23 }

name gets removed.

So always use:

...prev

11 Array State Example :
const [items, setItems] = useState([]);
Add new item
setItems(prev => [...prev, "Laptop"]);
Remove item
setItems(prev => prev.filter(item => item !== "Laptop"));


2) State Immutability and How Mutation Breaks UI

---

 1. What is State Immutability?
**Immutability** means **not changing the original state directly**.

In React, state should always be treated as **read-only**.

Instead of modifying the existing state, create a **new copy** and update that.

---

 2. Why Immutability is Important
React checks whether the state value has changed to decide if it should re-render the UI.

If you directly mutate the existing state, React may not detect the change properly.

### As a result:
- UI may not update
- component may not re-render
- bugs become hard to track

---

 3. Wrong Way: Direct Mutation 
```jsx
const [user, setUser] = useState({
  name: "Anjali",
  age: 22
});

user.age = 23; // direct mutation
setUser(user);
```

 Problem :
Here, the same object reference is being reused.

React may think:
```text
state is same, no need to update
```

So UI can remain unchanged.

---

4.Correct Way: Create New Object 
```jsx
setUser(prev => ({
  ...prev,
  age: 23
}));
```

 Why this works
- `...prev` creates a new object copy
- updated field is changed in the new object
- React gets a new reference
- UI re-renders correctly

---

 5. Example: How Mutation Breaks UI
```jsx
function Profile() {
  const [user, setUser] = useState({
    name: "Anjali",
    age: 22
  });

  const updateAge = () => {
    user.age = 23; // wrong
    setUser(user);
  };

  return <h2>{user.age}</h2>;
}
```

 Issue
Even after clicking update, UI may still show old value because React sees the same object reference.
````


3) Controlled vs Uncontrolled Inputs

---

 1. Controlled Inputs -
A **controlled input** is an input field whose value is controlled by **React state**.

The input value is stored in `useState`, and every change updates the state.

### Example
```jsx
import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
````

 Important Points

* value is managed by React state
* uses `value` and `onChange`
* React has full control over input
* easy form validation
* easy to show live preview

---

 2. Uncontrolled Inputs

An **uncontrolled input** is managed by the **DOM itself**, not by React state.

React uses `ref` to access the value when needed.

 Example -

```jsx
import React, { useRef } from "react";

function Form() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

 Important Points

* value is handled by DOM
* uses `ref`
* less React code
* useful for simple forms
* value accessed only when needed

---

 3. Key Difference -

* **Controlled** → React controls input value
* **Uncontrolled** → DOM controls input value

---

# 4)React Rendering Lifecycle

---

## 1. What is React Rendering Lifecycle?
The **React rendering lifecycle** is the process through which a component is **created, updated, and removed** from the UI.

It mainly has **3 phases**:
- **Mounting**
- **Updating**
- **Unmounting**

---

## 2. Mounting Phase
This is the phase when a component is **created and added to the DOM** for the first time.

### Steps -
- component is initialized
- state and props are set
- JSX is rendered
- UI appears on screen

### Example -
```jsx
function App() {
  return <h1>Hello React</h1>;
}

This component is mounted when it first appears.

3) Updating Phase

This phase happens when:

state changes
props change
parent component re-renders

React updates the UI with new data.

Example
setCount(count + 1);

After this:

component renders again
updated value is shown

This is called re-rendering.

4) Unmounting Phase -

This happens when a component is removed from the DOM.

Example:

navigating to another page
hiding modal
conditional rendering
Example
{show && <Modal />}

If show becomes false, component unmounts.

````md

 5)Common State Mistakes and Fixes

---

 1. Direct State Mutation 
Changing state directly instead of using setter function.

### Wrong
```jsx
user.name = "Anjali";
````

 Fix -

```jsx
setUser(prev => ({
  ...prev,
  name: "Anjali"
}));
```

---

 2. Using Old State Value 

Using normal update when next value depends on previous state.

 Wrong

```jsx
setCount(count + 1);
setCount(count + 1);
```

 Fix 

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

---

 3) Not Using Spread for Objects 

Updating one field removes other fields.

 Wrong

```jsx
setUser({ age: 23 });
```

 Fix -

```jsx
setUser(prev => ({
  ...prev,
  age: 23
}));
```

---

 4. Mutating Arrays Directly 

```jsx
items.push("Phone");
setItems(items);
```

 Fix -

```jsx
setItems(prev => [...prev, "Phone"]);
```

---

 5. Expecting Immediate Update 

```jsx
setCount(count + 1);
console.log(count);
```

May print old value.

 Fix -

Understand that state updates are asynchronous and value updates on next render.

---


