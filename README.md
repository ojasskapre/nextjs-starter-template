# Next.js + Supabase Auth + Langchain starter code

## Overview

This project is a chatbot application built using Next.js, TypeScript, Supabase, Langchain, and FastAPI. The frontend is responsible for the user interface and handles user interactions, while the backend, powered by FastAPI, processes chat messages using OpenAI's GPT-3.5 model and manages API endpoints. The application includes user authentication via Supabase, allowing users to sign up, log in, and manage their sessions. This architecture ensures a clear separation of concerns, with the backend handling all AI-related logic and the frontend focused on delivering a seamless user experience.

## Features

- **Real-time Chat**: Users can send messages and receive responses from the AI in real-time.
- **User Authentication**: Sign up and log in functionality using Supabase.
- **Markdown Support**: Messages can include Markdown formatting, including LaTeX for mathematical expressions.
- **Backend API**: FastAPI backend to handle chat processing and interactions with OpenAI's GPT-3.5 model.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Langchain**: A framework for building applications with language models.
- **Supabase**: An open-source Firebase alternative for authentication and database management.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Shadcn**: A component library for creating accessible and consistent UI components.
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.11+

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- A Supabase account
- An OpenAI account
- Python 3.11 or later
- Poetry (for managing Python dependencies)

### Installation

##### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/ojasskapre/nextjs-starter-template.git
   cd nextjs-starter-template/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Set up your Supabase project:

   - Create a new project on [Supabase](https://supabase.io/).
   - Set up authentication and database tables as per your requirements.
   - Obtain your Supabase URL and API key.

4. Set up your OpenAI API key:

   - Sign up or log in to [OpenAI](https://openai.com/).
   - Create an API key from the API section of your account.

5. Create a `.env.local` file in the root of the project and add your Supabase and OpenAI credentials:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

7. Open your browser and navigate to `http://localhost:3000`.

#### Backend

1. Navigate to backend folder

   ```bash
   cd ../backend
   ```

2. Install Poetry if you haven't already:

   ```bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

3. Install the backend dependencies:

   ```bash
   poetry install
   ```

4. Set up environment variables

   - Create a .env file in the backend directory with your configuration:

   ```bash
   OPENAI_API_KEY=your_openai_api_key
   DATABASE_URL=your_database_url  # Optional, if you're using a database
   ```

5. Run the FastAPI server

   ```bash
   poetry run uvicorn app.main:app --reload
   ```

6. The FastAPI server will be running at `http://127.0.0.1:8000`.

## To-Do Features Checklist

- [ ] **Regenerate Answer**: Allow users to regenerate the AI's response.
- [ ] **Stop Answer Streaming**: Allow users to stop the streaming of the AI's response mid-answer.
- [ ] **Create New Chat**: Enable users to start a new chat session.
- [ ] **Save Chat History**: Save the chat history for users to access later.
- [ ] **Access Previous Chats**: Allow users to go back to any previous chat and continue the conversation.
- [ ] **Add Attachments**: Allow users to add attachments to their messages.
