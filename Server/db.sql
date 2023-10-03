CREATE DATABASE todo;

CREATE table todolist(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    done boolean;
);