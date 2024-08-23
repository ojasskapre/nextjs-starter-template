# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install curl and install Poetry
RUN apt-get update \
  && apt-get install -y curl \
  && curl -sSL https://install.python-poetry.org | python3 - \
  && apt-get clean

# Ensure that Poetry is in the PATH
ENV PATH="/root/.local/bin:$PATH"

# Copy the pyproject.toml and poetry.lock files to the container
COPY pyproject.toml poetry.lock /app/

# Install dependencies
RUN poetry install --no-root --no-dev

# Copy the rest of the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 8000

# Command to run the backend application
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
