# Meteor Chat App

A real-time, multi-user chat application built with Meteor.js (v3.x) and **React (v19.x)**, utilizing TypeScript for robust development. The application is styled with **Material-UI (MUI) (v7.x)** for a modern, responsive user interface adhering to Material Design principles.

## ✨ Features

### Implemented
* **User Authentication:** Secure registration, login, and logout functionality using Meteor's `accounts-password`, refactored with React and MUI components.
* **Real-time Global Chat Room:** Users can send and receive messages instantly in a single, global chat room.
* **Message Display:** Messages show the sender's username and a formatted timestamp, rendered with React and MUI.
* **Message Persistence:** Chat messages are stored in MongoDB and are visible across sessions and to all authenticated users.
* **Modern UI with Material Design:** User interface built with React and Material-UI (MUI) components, providing a clean, responsive, and accessible experience.

### Planned
* Further UI/UX Refinements (e.g., improved error handling, user feedback using MUI components like Snackbars).
* Displaying a list of currently online users.
* Typing indicators.
* Potentially multiple chat rooms/channels.

### Deployed link
* [Meteor Chat App](https://mulit-chat.meteorapp.com/) (deployed on Meteor Galaxy Cloud, using the original React/MUI stack)

## 🛠️ Tech Stack

* **Backend:** Meteor.js (v3.2.x)
    * Real-time data with DDP (Distributed Data Protocol)
    * MongoDB (managed by Meteor in development)
    * Meteor Methods and Publications written in TypeScript
* **Frontend:** React (v19.x)
    * React components with TSX (TypeScript + JSX)
    * Meteor React Integration: `react-meteor-data` (for `useTracker`)
* **Styling & Component Library:**
    * Material-UI (MUI) (v7.1.0)
    * Styling Engine: Emotion (default with MUI v5+)
    * Material Design Icons via `@mui/icons-material`
* **Language:** TypeScript throughout the stack (client, server, UI components)
* **Authentication:** Meteor `accounts-password`
* **Development Environment:** WSL (Ubuntu)

## 🚀 Getting Started

This project is under active development.

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS version like 18.x or latest stable like 22.x, installed via nvm recommended)
* [Meteor.js](https://www.meteor.com/install) (Ensure you have a version compatible with Meteor 3.2.x)
* [Git](https://git-scm.com/)

### Running Locally (WSL - Ubuntu)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Taleef7/meteor-chat-app.git](https://github.com/Taleef7/meteor-chat-app.git)
    cd meteor-chat-app
    ```
    *(If you are on the `feat/react-mui-rewrite` branch, make sure to check it out after cloning if `main` is the default.)*
    ```bash
    git checkout feat/react-mui-rewrite 
    ```
2.  **Install Node.js dependencies:**
    ```bash
    meteor npm install
    ```
3.  **Run the application:**
    Meteor will also install its specific packages on the first run if needed.
    ```bash
    meteor run
    ```
4.  Open your browser and navigate to `http://localhost:3000`.

## 🎯 Project Goals

* To build a fully functional, real-time multi-user chat application.
* To implement best practices for modern Meteor and **React** development using TypeScript.
* To create a responsive, modern, and enjoyable user experience using **Material-UI**.
* To gain practical experience with **Material-UI (MUI)**, and full-stack TypeScript development.
* To successfully deploy the application, potentially to Meteor Cloud.

## 🚧 Current Status (as of May 25, 2025)

* The project has undergone a significant UI refactor from a Svelte/Tailwind/DaisyUI stack to **React/MUI**.
* Core project setup with Meteor, **React** (using `react-meteor-data`), **MUI v7.1.0**, and TypeScript is complete.
* User authentication (signup, login, logout) is fully implemented and functional using the new React/MUI frontend.
* Real-time global chat messaging (sending, receiving, displaying with correct user attribution, persistence) is implemented and working with the new UI.
* Basic chat UI includes an AppBar, message display area, message input form, and logout functionality.
* The application is under version control with Git (current work on the `feat/react-mui-rewrite` branch) and hosted on GitHub.
* Next steps include further UI/UX refinements for the chat interface, addressing minor console warnings (like MUI Grid prop updates if still present), robust error handling, and user feedback mechanisms (like Snackbars for error messages).

---

## 🙏 Credit and AI assisted Development

This project has been significantly shaped and accelerated through a collaborative development process with **Google's Gemini**, acting as an AI pair programmer and technical assistant.

Gemini's contributions have been instrumental in various stages, including:

* **Initial Setup & Configuration:** Guidance on setting up the initial Meteor + Svelte + TypeScript environment within WSL.
* **Debugging Complex Issues:** Invaluable assistance in diagnosing and resolving challenging configuration conflicts, such as those related to TypeScript options, Svelte preprocessor setup, dependency version mismatches (initially with Svelte UI libraries and later during the React/MUI setup, including MUI Grid API changes and Meteor module resolution errors post-refactor).
* **Major UI Stack Refactoring:** Guidance on planning and executing the migration of the frontend from Svelte/Tailwind CSS/DaisyUI to React/Material-UI (MUI), including package management, component structuring, and setting up the new stack.
* **Code Generation & Refactoring:** Providing boilerplate code, React component structures (like the auth forms, chat page, and message items), TypeScript type definitions, and assisting in refactoring JavaScript code to TypeScript.
* **Explaining Concepts:** Clarifying core concepts in Meteor (DDP, publications, methods, MongoDB integration), React (components, hooks, state management), Material-UI (components, theming), and TypeScript.
* **Suggesting Alternatives & Best Practices:** Offering alternative solutions when roadblocks were hit and advising on best practices for project structure, Git workflow (branching, issues, PRs), and configuration.
* **Documentation:** Assisting with the creation and updates of this README file.