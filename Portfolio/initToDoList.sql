DROP DATABASE IF EXISTS todolist;
CREATE DATABASE todolist;
USE todolist;

CREATE TABLE users(
   id_user INT AUTO_INCREMENT PRIMARY KEY,
   user_name VARCHAR(30) NOT NULL,
   user_mdp VARCHAR(30) NOT NULL
);

CREATE TABLE tasks(
    id_task INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(50) NOT NULL,
    task_state BOOLEAN NOT NULL,
    task_content VARCHAR(300) NOT NULL,
    task_id_user INT NOT NULL,
    FOREIGN KEY (task_id_user) REFERENCES users(id_user)
);



-- Remplissage initial pour éviter de démarrer avec un DB vide
INSERT INTO users(user_name, user_mdp) VALUES
    ('Leag', 'mdpLeag'),
    ('Imas', 'mdpImas'),
    ('Hpesoj', 'mdpHpesoj');

-- La liste des tâches est par défault, vide.
INSERT INTO tasks(task_name, task_state, task_content, task_id_user) VALUES
    ('Tâche 1', 1, 'Contenu de la tâche 1', 1),
    ('Tâche 2', 0, 'Contenu de la tâche 2', 1),
    ('Tâche 3', 0, 'Contenu de la tâche 3', 1),
    ('Tâche 4', 0, 'Contenu de la tâche 4', 1),
    ('Tâche 5', 0, 'Contenu de la tâche 5', 1);