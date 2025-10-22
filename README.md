# TaskMaster Pro: Comprehensive React/Tailwind Application

This project is a single-page application built using **React** and styled with **Tailwind CSS** to demonstrate mastery of modern front-end concepts.

## ✨ Core Features

### 1. Task Master (Home Page)
A fully functional To-Do list application with state persisted via the browser's Local Storage.
* **CRUD Operations:** Add, delete, and toggle tasks as complete.
* **Filtering:** Users can view **All**, **Active**, or **Completed** tasks.
* **Custom Hook:** Uses a custom `useLocalStorageTasks` hook for persistence, fulfilling the `useContext` requirement.

### 2. API Data Viewer
A dedicated page for integrating with an external data source.
* **API Source:** Fetches post data from `jsonplaceholder.typicode.com`.
* **Search Feature:** Instantly filters the displayed list by post title.
* **Pagination:** Implements a controlled "Load More" button to fetch and append the next batch of data.
* **Loading Indicators:** Displays a prominent **spiral loader** on initial fetch and an integrated **spinner** on the "Load More" button (with a simulated 2-second delay) for enhanced UX.

### 3. User Interface & Architecture
* **Dark Mode:** A persistent theme switcher in the `Navbar` uses Tailwind's `dark:` modifier and a React Context (`ThemeContext`) to manage global state.
* **Reusable Components:** Includes a versatile `Button` component with `primary`, `secondary`, and `danger` variants, plus integrated loading state.
* **Responsive Design:** Styled with Tailwind CSS to be functional and appealing on mobile, tablet, and desktop viewports.

## ⚙️ Project Setup and Run

### Prerequisites

* Node.js (v18+)
* npm or yarn

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd taskmaster-pro
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will open in your browser at the local URL provided by Vite (e.g., `http://localhost:5173`).

---

## 🔗 Deployment

[ ![Task Manager View](Screenshot 2025-10-22 at 14.31.24.png)/(Screenshot 2025-10-22 at 14.31.40)(Screenshot 2025-10-22 at 14.31.51)(Screenshot 2025-10-22 at 16.49.39)](https://cool-rolypoly-867928.netlify.app/)