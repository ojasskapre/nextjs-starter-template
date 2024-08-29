## Database Schema

### Overview

This project uses Supabase for user authentication and SQLAlchemy for database management. We have designed our database schema to accommodate user profiles and chat sessions, leveraging Supabase's authentication system.

#### Supabase Authentication and User Profile

Supabase handles user authentication, but to associate users with other data in our system, we have created a custom `profiles` table. This table references the `auth.users` table provided by Supabase. We use a trigger to automatically populate the `profiles` table whenever a new user signs up.

##### Profiles Table

The profiles table stores essential user information and references the auth.users table. The table structure was initially created manually with the following SQL:

```sql
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  created_at timestamp DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

##### Trigger to Populate Profiles Table

We have a trigger that automatically inserts a new row into the profiles table whenever a user is created in the auth.users table:

```sql
CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();
```

#### Chat Sessions and Messages

The core of the application involves chat sessions and messages, which are stored in two main tables: chat_sessions and messages.

##### Why Chat Sessions and Messages?

- **Chat Sessions**: Each chat session represents a distinct conversation between a user and the assistant. By organizing conversations into sessions, we enable users to view their entire conversation history, resume previous conversations, and keep their interactions organized.

- **Messages**: Each session contains multiple messages exchanged between the user and the assistant. By storing messages separately, we can maintain the order of conversations, track the role of each participant (user or assistant), and provide a detailed chat history within each session.

##### Chat Sessions Table

The chat_sessions table tracks individual chat sessions for users.

- **id**: A unique identifier for the chat session.
- **user_id**: A foreign key that references the profiles table to associate a chat session with a user.
- **title**: The title of the chat session, which is auto-generated as "New Chat - <timestamp>".
- **created_at**: The timestamp when the chat session was created.
- **updated_at**: The timestamp when the chat session was last updated.

##### Messages Table

The messages table stores the messages exchanged during a chat session.

- **id**: A unique identifier for each message.
- **chat_session_id**: A foreign key that references the chat_sessions table to associate the message with a session.
- **role**: Indicates whether the message was sent by the "user" or the "assistant".
- **content**: The content of the message.
- **created_at**: The timestamp when the message was created.

## API Routes

#### Get Chat History

- Endpoint: `/api/sessions/{session_id}` [GET]
- Description: Retrieves all messages in a specific chat session.
- Authenticated request
- Request Parameters:<br>
  session_id: The UUID of the chat session.
- Response
  ```json
  [
    {
      "id": "uuid",
      "chat_session_id": "uuid",
      "role": "user",
      "content": "Your message here",
      "created_at": "timestamp"
    },
    {
      "id": "uuid",
      "chat_session_id": "uuid",
      "role": "assistant",
      "content": "Assistant's response here",
      "created_at": "timestamp"
    }
  ]
  ```

#### Start a New Chat Session OR Continue an Existing Chat Session

- Endpoint: `/api/sessions/{session_id}` [POST]
- Authenticated request
- Description: Adds a new message to an existing chat session and processes it.
- Request Parameters:<br>
  session_id: The UUID of the chat session.
- Request:
  ```json
  {
    "messages": [
      {
        "role": "user",
        "content": "Your next message here"
      }
    ]
  }
  ```
- Response: The assistant's response is streamed as chunks of data in real-time. The content is sent in plain text, one chunk at a time.

#### Get All Chat Sessions

- Endpoint: `/api/sessions` [GET]
- Authenticated request
- Description: Retrieves a list of all chat sessions associated with - the authenticated user.
- Response:
  ```json
  [
    {
      "id": "uuid",
      "title": "New Chat - timestamp",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    },
    {
      "id": "uuid",
      "title": "New Chat - timestamp",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ]
  ```

#### Update Chat Session Title

- Endpoint: `/api/sessions/{session_id}/title` [PATCH]
- Authenticated request
- Description: Updates the title of an existing chat session.
- Request Parameters:
  session_id: The UUID of the chat session.
- Request:
  ```json
  {
    "title": "New Chat Title"
  }
  ```
- Response: The updated chat session object.
  ```json
  {
    "id": "uuid",
    "title": "New Chat Title",
    "user_id": "user-uuid",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

#### Delete a Chat Session

- Endpoint: `/api/sessions/{session_id}` [DELETE]
- Authenticated request
- Description: Deletes a specific chat session along with all its messages.
- Request Parameters:

  session_id: The UUID of the chat session.

- Response:
  ```json
  {
    "detail": "Chat session and its messages have been deleted"
  }
  ```

#### Empty All Chat Sessions and Messages

- Endpoint: `/api/empty-sessions` [DELETE]
- Authenticated request (should be used via tools like Postman or curl)
- Description: Deletes all chat sessions and their associated messages from the database.
- Response:
  ```json
  {
    "detail": "All chat sessions and messages have been deleted"
  }
  ```

## Installation Guide

#### Prerequisites

- **Python 3.10+**: Ensure that Python is installed on your machine. You can download it from the official website.
- **Poetry**: Poetry is used for dependency management and packaging in this project. If you don't have Poetry installed, you can install it using the following command:
  ```bash
  curl -sSL https://install.python-poetry.org | python3 -
  ```

1. Clone the Repository

   First, clone the project repository to your local machine:

   ```bash
   git clone https://github.com/ojasskapre/nextjs-starter-template.git
   cd nextjs-starter-template/backend
   ```

2. Set Up Environment Variables

   Copy the .env.example file to create your own .env file. This file will store your environment variables, such as database connection strings and API keys.

   ```bash
   cp .env.example .env
   # Update the .env file with your specific configurations, including:
   DATABASE_URL: Your database connection string (e.g., PostgreSQL or Supabase URL).
   OPENAI_API_KEY: Your OpenAI API key.
   SUPABASE_API_KEY: Your Supabase API Key
   SUPABASE_ANON_KEY: Your Supabase Anon Key
   ```

3. Install Dependencies
   Use Poetry to install all the necessary dependencies:

   ```bash
   poetry install
   ```

   This will create a virtual environment and install all the dependencies listed in pyproject.toml.

4. Set Up the Database
   If you are using a new database, you have to create `profiles` abd triggers with `auth.users` table manually as mentioned in Database Schema section above. Other tables will be created after running the FastAPI server

5. Run the FastAPI Server
   You can start the FastAPI server using Uvicorn, which comes pre-installed with the dependencies:

   ```bash
   poetry run uvicorn app.main:app --reload
   ```

   This command will start the development server on http://localhost:8000.

6. Test the API
   You can now use tools like Postman or curl to test the API endpoints described in the API Routes section of your documentation.
