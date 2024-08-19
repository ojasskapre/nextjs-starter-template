# Next.js + Supabase Auth + Langchain starter code

## Overview

This project is a chatbut application built using Next.js, TypeScript, Supabase and Langchain. It leverages OpenAI's GPT-3.5 model to provide a conversational AI experience. The application also includes user authentication via Supabase, allowing users to sign up, log in, and manage their sessions.

## Features

- **Real-time Chat**: Users can send messages and receive responses from the AI in real-time.
- **User Authentication**: Sign up and log in functionality using Supabase.
- **Markdown Support**: Messages can include Markdown formatting, including LaTeX for mathematical expressions.
- **Copy to Clipboard**: Users can copy messages to their clipboard easily.
- **Responsive Design**: The application is designed to work on various screen sizes.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Langchain**: A framework for building applications with language models.
- **Supabase**: An open-source Firebase alternative for authentication and database management.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- A Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ojasskapre/nextjs-starter-template.git
   cd nextjs-starter-template
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
