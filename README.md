# Prerequisites

Before you get started, make sure you have the following installed:

* **MongoDB Shell or GUI Tool:** You'll need a way to interact with MongoDB. You can choose from:
    * **`mongosh` (recommended):** The modern MongoDB Shell.
    * **MongoDB Compass:** A graphical user interface (GUI) tool.
    * **`mongo` (legacy shell):** The older MongoDB shell.
    Choose the option that best suits your operating system and preferences.

* **Docker and Docker Compose:** These are essential for running the backend services.

    **For Ubuntu:**
    ```bash
    sudo apt install docker.io docker-compose
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

    **For Arch Linux:**
    ```bash
    sudo pacman -S docker docker-compose
    sudo systemctl enable --now docker
    ```

    Once installed, navigate to the root directory of your project and run:
    ```bash
    docker-compose up --build
    ```

---

# Getting Started

Follow these steps to set up and run the frontend and backend of the application.

## Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd TallyAssistant/frontend
    ```
2.  Install the necessary npm packages:
    ```bash
    npm install
    ```
3.  Start the frontend application:
    ```bash
    npm start
    ```

---

## Backend

1.  Navigate to the backend directory:
    ```bash
    cd TallyAssistant/backend
    ```
2.  Run the backend services in detached mode (in the background):
    ```bash
    docker-compose up --build
    ```
