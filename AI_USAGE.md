# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):ChatGPT
- What I asked for: I asked ChatGPT for guidance on structuring the initial static React UI components (Header, Footer, VendorCard, and MenuItemCard) for CampusEats and cleaning up the default Vite boilerplate code.
- What I kept, changed or rejected, and why:I kept the overall functional component architecture and JSX markup for Header, VendorCard, MenuItemCard, and Footer. However, I rejected class-based component examples and inline CSS styling, choosing instead to write standard CSS inside index.css to maintain clean code organization and separation of concerns.
- One thing the AI got wrong and how I fixed it:The AI generated standard HTML class="header" attributes inside the JSX, which caused invalid DOM property warnings in the browser console. I fixed this issue by replacing all instances of class with className across every component file.

## Week 2
- Tool(s):ChatGPT
- What I asked for:I asked ChatGPT how to structure vendor and menu data in src/data/vendors.js, render list items dynamically using .map(), and implement my personal feature step for custom item notes using a state toggle.
- What I kept, changed or rejected, and why: I kept the .map() array rendering pattern with unique keys and the immutable state update pattern (setCart(prev => [...prev, item])). I modified the suggested personal feature layout by embedding a text area directly inside the card structure rather than using a separate modal window, which provided a smoother user experience.
- One thing the AI got wrong and how I fixed it:The AI used array indices (key={index}) when mapping through the vendor menu array, which triggered React key warnings in the console. I fixed this by assigning unique string identifiers (key={item.id}) to each menu item and vendor object.

## Week 3
- Tool(s):ChatGPT
- What I asked for:I asked ChatGPT for assistance with configuring useEffect and AbortController to fetch menu data from /api/vendors.json, setting up controlled form inputs with validation in CheckoutForm.jsx, and updating cart line notes in CartItem.jsx.
- What I kept, changed or rejected, and why:I kept the fetch cleanup pattern and the form validation rules for the name, mahallah, and pickup time fields. I changed the total price logic so that the order total is derived on the fly using cart.reduce(...) instead of storing it as redundant state.
- One thing the AI got wrong and how I fixed it:The AI forgot to add an AbortController to fetch, which caused memory warnings when switching pages fast. I fixed it by creating an AbortController and canceling the fetch request if the page closes

## Week 4
- Tool(s):ChatGPT
- What I asked for:I asked ChatGPT how to make custom hooks (useLocalStorage, useVendors, and useCart), set up global state with CartContext, and add page navigation using react-router.
- What I kept, changed or rejected, and why:I kept the CartContext setup, the useLocalStorage hook to keep cart items after refreshing, and the page navigation system. I also kept item notes saved in state so they show up on the OrdersPage.
- One thing the AI got wrong and how I fixed it:The AI used outdated imports from react-router-dom which caused errors. I fixed it by importing directly from react-router. Also, the AI's quantity function erased item notes when changing quantities, so I fixed it in CartProvider.jsx by using { ...line, qty: line.qty + delta } to keep the note.
