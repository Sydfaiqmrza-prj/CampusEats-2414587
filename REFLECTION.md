# Reflection Log

## Week 1 Reflection

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Imperative UI development requires explicitly writing step by step DOM manipulation instructions like `document.createElement` or `appendChild` to alter the page. In contrast, declarative UI development with React allows you to describe what the interface should look like for a given state, while React automatically handles the underlying DOM updates.

2. Why must a component name start with a capital letter?
React uses capitalization to distinguish custom components from built in HTML elements during JSX compilation. Capitalized names like `<Header/>` signal to React that it is a component variable, whereas lowercase names like `<div>` are treated directly as standard HTML strings.

3. What does a fragment `<>...</>` do, and why not just use a `<div>`?
A React fragment `<>...</>` lets you group multiple sibling elements together without adding an extra wrapper node to the rendered DOM. Unlike a `<div>`, it avoids cluttering the DOM structure and prevents styling issues with CSS Flexbox or Grid layouts.

4. Name one benefit of splitting the UI into small components.
Splitting the UI into small components drastically improves code reusability and maintainability. It enables you to isolate functionality, test features independently, and reuse components across different parts of your application without repeating code.

## Week 2 Reflection

1. What is the difference between props and state in React?
Props are read only inputs passed down from a parent component to configure a child, while state is internal data managed locally within a component that can change over time. Updating state triggers a render update to update the UI, whereas a child component cannot directly modify the props it receives.

2. Why does React require a key prop when rendering lists with `.map()`, and why is an array index a bad key?
React uses the key prop to identify which items in a list have changed, been added, or been removed, ensuring efficient DOM updates. Using an array index as a key is problematic because inserting, deleting, or reordering items shifts the indices, which can cause UI bugs and incorrect component state tracking.

3. Why must we update arrays and objects in state immutably (e.g., `[...prev, item]`) instead of using `.push()`?
React uses shallow reference equality to check if state has changed and decide whether to trigger a new render. Mutating an array directly with `.push()` modifies the existing reference, causing React to miss the change, whereas creating a new copy with spread syntax `[...prev, item]` creates a new reference that alerts React to update the DOM.

4. What does "data flows down, events flow up" mean in CampusEats?
In CampusEats, parent components pass application state like food menu lists or cart items down to child components as props. When a user interacts with a child element such as clicking Add to Cart, the child component triggers a callback function passed from the parent to notify it of the event, updating the parent state up the component tree.

## Week 3 Reflection

1. What is a controlled component/input, and why is it useful?
A controlled component is a form element whose value is entirely driven by React state and updated via an `onChange` handler. It is useful because React serves as the single source of truth for the input data, enabling real time validation, instant UI feedback, and seamless form manipulation.

2. What does "Derive, don't store" mean, and why is it important in React?
Derive, don't store means computing values on the fly during rendering from existing props or state rather than creating redundant state variables, such as calculating a cart total price from item quantities. It is important because it prevents duplicate state management and ensures calculated values are always automatically in sync.

3. Why did we need to "lift state up" for the cart into `App.jsx` in Week 3?
We lifted cart state up to `App.jsx` because multiple sibling components, such as the navigation header badge, menu item counters, and cart drawer, needed access to read and update the cart. Centralizing the state in their closest common parent allows all child components to stay synchronized using props.

4. When does code inside `useEffect` run, and why did we need an `AbortController` cleanup function?
Code inside `useEffect` runs after the component renders and whenever its dependencies change. An `AbortController` cleanup function is needed to cancel pending network requests if the component unmounts or renders again before the fetch completes, preventing memory leaks and race condition state updates.

5. How does the `reloadKey` dependency work in `useEffect` for data fetching?
The `reloadKey` is a numeric state variable included in the `useEffect` dependency array. Whenever a refetch is triggered, `reloadKey` is incremented, causing `useEffect` to recognize a change in dependencies and execute the data fetching function on demand.

6. How does checkout validation work before placing an order?
Checkout validation verifies that user input, such as delivery details, contact numbers, and cart contents, meets required business rules before processing. If any validation rule fails, submission is blocked and error state is set to provide clear feedback to the user.

7. Why is a cleanup function needed for timers (Personal Feature: Digit 5 Countdown)?
A cleanup function calling `clearInterval` or `clearTimeout` is essential to stop active timers when a component unmounts or when the effect runs again. Without it, timer intervals will continue executing in the background, consuming memory and attempting to update state on an unmounted component.

## Week 4 Reflection

1. What is the difference between a custom hook and Context ("Hooks share logic, not state; Context shares state")?
A custom hook shares stateful logic and reusable behavior, but every component calling the hook maintains its own isolated state. React Context, however, shares a single state instance across all consuming components within its provider tree, allowing multiple components to read and update identical data.

2. How does `useLocalStorage` work, and why do we use lazy initial state and `try / catch`?
The `useLocalStorage` hook synchronizes React state with `window.localStorage` so component data persists across page reloads. We use lazy initial state `useState(() => ...)` to read from `localStorage` only once on initial mount rather than executing slow disk reads on every render. A `try / catch` block prevents app crashes by handling potential storage errors, such as JSON parsing failures, disabled cookies, or private browsing restrictions.

3. Why does `useCart()` check `if (!context)` and throw an error?
The `useCart()` hook checks `!context` to ensure it is only invoked within components wrapped inside a `CartProvider`. Throwing an explicit error immediately alerts developers to missing provider wrappers in the tree, preventing subtle runtime bugs and undefined state access.

4. Why do we use `<Link>` and `<NavLink>` instead of `<a href="...">`, and why does the `"/"` `<NavLink>` need the `end` prop?
The `<Link>` and `<NavLink>` components enable client side navigation without triggering full browser reloads, preserving React application state across page transitions. `<NavLink>` adds active styling to active routes, and the `end` prop on `"/"` ensures it only highlights on the exact root URL rather than matching every path that starts with a slash, such as `/cart` or `/menu`.

5. Why do `/vendor/abc` and `/xyz` show two different screens?
The URL `/vendor/abc` matches a defined dynamic route pattern like `/vendor/:id`, causing React Router to load and display the vendor detail view with `abc` passed as a parameter. Conversely, `/xyz` does not match any valid route configuration and matches the catch all wildcard route `*`, rendering the fallback 404 Not Found screen.