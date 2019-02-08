-- DROP DATABASE IF EXISTS exampledb;
-- CREATE DATABASE exampledb;

-- DROP DATABASE IF EXISTS testdb;
-- CREATE DATABASE testdb;


CREATE DATABASE tournament_db;
USE tournament_db;

-- CREATE TABLE tournament
-- (
-- 	id int NOT NULL AUTO_INCREMENT,
-- 	tournament_name varchar(255) NOT NULL,
-- 	tournament_active BOOLEAN DEFAULT false,
--     tournament_winner varchar(255),
--     tournament_loser varchar(255),

-- 	game1_active BOOLEAN DEFAULT false,
--     g1_player_1 varchar(255) ,
--     g1_player_2 varchar(255) ,
--     g1_winner varchar(255) ,

-- 	game2_active BOOLEAN DEFAULT false,
--     g2_player_1 varchar(255),
--     g2_player_2 varchar(255),
--     g2_winner varchar(255),

-- 	champ_game_active BOOLEAN DEFAULT false,
--     champ_player_1 varchar(255),
--     champ_player_2 varchar(255),
--     champ_winner varchar(255),

-- 	PRIMARY KEY (id)
-- );