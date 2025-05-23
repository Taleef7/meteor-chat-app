# Meteor Chat App

A real-time, multi-user chat application built with Meteor.js (v3.x) and Svelte (v3.x), utilizing TypeScript for robust development. The application is styled with Tailwind CSS (v3) and DaisyUI (v4) for a modern, responsive user interface.

## ✨ Features

### Implemented
* **User Authentication:** Secure registration, login, and logout functionality using Meteor's `accounts-password`.
* **Real-time Global Chat Room:** Users can send and receive messages instantly in a single, global chat room.
* **Message Display:** Messages show the sender's username and a formatted timestamp.
* **Message Persistence:** Chat messages are stored in MongoDB and are visible across sessions and to all authenticated users.
* **Responsive Base Styling:** Initial responsive layout achieved with Tailwind CSS and DaisyUI.

### Planned
* Further UI/UX Refinements (e.g., improved error handling, user feedback).
* Displaying a list of currently online users.
* Typing indicators.
* Potentially multiple chat rooms/channels.
* Deployment to a cloud platform (e.g., Meteor Cloud).

## 🛠️ Tech Stack

* **Backend:** Meteor.js (v3.2.x)
    * Real-time data with DDP (Distributed Data Protocol)
    * MongoDB (managed by Meteor in development)
    * Meteor Methods and Publications written in TypeScript
* **Frontend:** Svelte (v3.x)
    * Svelte components with `<script lang="ts">`
    * Meteor Svelte Integration: `zodern:melte`
* **Styling:**
    * Tailwind CSS (v3.x)
    * DaisyUI (v4.x) - Component library for Tailwind CSS
* **Language:** TypeScript throughout the stack (client, server, UI components)
* **Authentication:** Meteor `accounts-password`
* **Development Environment:** WSL (Ubuntu)

## 🚀 Getting Started

This project is under active development.

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS version recommended, installed via nvm)
* [Meteor.js](https://www.meteor.com/install) (Ensure you have a version compatible with Meteor 3.2.x)
* [Git](https://git-scm.com/)

### Running Locally (WSL - Ubuntu)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Taleef7/meteor-chat-app.git](https://github.com/Taleef7/meteor-chat-app.git)
    cd meteor-chat-app
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
* To implement best practices for modern Meteor and Svelte development using TypeScript.
* To create a responsive, modern, and enjoyable user experience.
* To gain practical experience with Tailwind CSS, DaisyUI, and full-stack TypeScript development.
* To successfully deploy the application, potentially to Meteor Cloud.

## 🚧 Current Status (as of May 23, 2025)

* Core project setup with Meteor, Svelte (via `zodern:melte`), and TypeScript is complete and stable.
* User authentication (signup, login, logout) is fully implemented and functional.
* Real-time global chat messaging (sending, receiving, displaying, persistence) is implemented and working.
* Tailwind CSS v3 and DaisyUI v4 are successfully integrated, providing the styling foundation.
* The application is under version control with Git and hosted on GitHub.
* Next steps involve UI/UX refinements and potentially adding more chat features like user lists or typing indicators.

---

## 🙏 Credit and AI assisted Development

This project has been significantly shaped and accelerated through a collaborative development process with **Gemini (Google AI)**, acting as an AI pair programmer and technical assistant.

Gemini's contributions have been instrumental in various stages, including:

* **Initial Setup & Configuration:** Guidance on setting up the Meteor + Svelte + TypeScript environment within WSL.
* **Debugging Complex Issues:** Invaluable assistance in diagnosing and resolving challenging configuration conflicts, such as those related to TypeScript options (`preserveValueImports`, `verbatimModuleSyntax`), Svelte preprocessor setup, and dependency version mismatches with UI libraries (like the earlier issues with Skeleton UI and initial DaisyUI versions).
* **Code Generation & Refactoring:** Providing boilerplate code, Svelte component structures (like the auth forms and chat components), TypeScript type definitions, and assisting in refactoring JavaScript code to TypeScript.
* **Explaining Concepts:** Clarifying core concepts in Meteor (DDP, publications, methods, MongoDB integration), Svelte (reactivity, components), Tailwind CSS, DaisyUI, and TypeScript.
* **Suggesting Alternatives & Best Practices:** Offering alternative solutions when roadblocks were hit (e.g., suggesting DaisyUI when Skeleton UI presented persistent versioning issues for Svelte 3) and advising on best practices for project structure, Git, and configuration.
* **Documentation:** Assisting with the creation and updates of this README file.