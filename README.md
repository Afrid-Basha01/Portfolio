# React Personal Portfolio - Assignment 2

**Author:** Mohammad Afrid Basha  
**Course:** CS1303 Full Stack Development  

This is an interactive, multi-page portfolio built with React and Vite. It converts a static HTML/CSS layout into a dynamic Single-Page Application (SPA) using React Router, functional components, and Hooks.

## Setup and Run Instructions
To run this project locally on your machine:

1. Make sure you have Node.js installed.
2. Open your terminal and navigate to the project folder.
3. Run `npm install` to install all the required dependencies (like `react-router-dom`).
4. Run `npm run dev` to start the local development server.
5. Open your browser and go to `http://localhost:5173/`.
6. To build for production, run `npm run build`.

## Component Tree
The application is structured logically to keep components reusable:

* **App** (Root component handling global state and routing)
  * **SharedLayout** (Keeps the Navbar and Footer persistent across page changes)
    * **Navbar** (Contains navigation links and the theme toggle button)
    * **Outlet** (This is where React Router injects the different pages)
      * **Home** (Hero section with a simulated loading state)
      * **About** (Professional bio and technical skills)
      * **Projects** (Maps over the `projects.js` data array)
        * **ProjectCard** (A reusable component receiving data via props)
      * **ProjectDetail** (A dynamic route displaying a specific project based on its ID)
      * **Contact** (Controlled form with real-time validation)
      * **NotFound** (Catch-all 404 page)

## State-Lifting Decisions (useState)
I used `useState` in a few different ways depending on where the data needed to be accessed:

1. **Global Theme State (`App.jsx`):** I lifted the `theme` state to the very top level in `App.jsx`. I did this because the dark/light mode affects the entire application (the `<body>` background) and the toggle button lives inside the `Navbar`. By lifting it to the top, I was able to pass the state and the toggle function down via props.
2. **Local Form State (`Contact.jsx`):** The form data (`name`, `email`, `message`) and validation errors are kept locally inside the Contact component. There was no need to lift this state because no other part of the application needs to know what the user is typing into the contact form.
3. **Local Card State (`ProjectCard.jsx`):** The "View Details" expansion toggle is scoped directly to the `ProjectCard` component. Keeping it local ensures that clicking "View Details" on one project doesn't accidentally expand all the other projects on the page.

## Side Effects (useEffect)
I implemented three main `useEffect` hooks across the application:

1. **Theme Persistence (`App.jsx`):** 
   * **Why it's necessary:** To remember the user's dark/light mode preference even if they refresh the browser. 
   * **How it works:** This effect watches the `theme` state variable. Whenever it changes, it saves the new value to `localStorage` and updates the CSS classes on the `document.body` to trigger the visual change.
2. **Simulated Loading Screen (`Home.jsx`):** 
   * **Why it's necessary:** To simulate a network request delay when the component mounts. 
   * **How it works:** It uses an empty dependency array `[]` so it only runs once. It triggers a 1-second `setTimeout` to hide the loading text. **Crucially**, it includes a cleanup function (`clearTimeout`) so that if the user clicks away from the Home page before the second is up, the timer is destroyed and doesn't cause a memory leak in the background.
3. **Real-time Form Validation (`Contact.jsx`):** 
   * **Why it's necessary:** To prevent the user from submitting an empty or invalid form.
   * **How it works:** This effect watches the `formData` state. Every single time the user types a keystroke, it checks if the fields are empty or if the email format is wrong. If there are errors, it disables the Submit button.
