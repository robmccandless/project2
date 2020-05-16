DROP DATABASE IF EXISTS recipes_app_db;
CREATE DATABASE recipes_app_db;
USE recipes_app_db;
CREATE TABLE users
(
        user_id INT NOT NULL
        auto_increment primary key
    ,name varchar
        (50)
    ,email_address varchar
        (100)
    ,auth varchar
        (50)
)ENGINE=INNODB;

        CREATE TABLE recipes
        (
                recipe_id INT NOT NULL
                auto_increment primary key
	,user_id INT NOT NULL
	,title varchar
                (100)
    ,date_added datetime 
    ,foreign key
                (user_id) references users
                (user_id)
	) ENGINE=INNODB;

                CREATE TABLE recipe_ingredients
                (
                        recipe_id INT NOT NULL 
    ,
                        ingredient_number INT NOT NULL
    ,
                        amount decimal (10, 4)
    ,
                        uom varchar (20)
    ,
                        name varchar (50)
	,
                        primary key (recipe_id, ingredient_number)
    ,
                        foreign key (recipe_id) references recipes (recipe_id)
                )
                ENGINE=INNODB;

                CREATE TABLE attachments
                (
                        attachment_id INT NOT NULL
                        AUTO_INCREMENT Primary key
    ,path_name varchar
                        (512)
    ,data mediumblob
) ENGINE=INNODB;

                        CREATE TABLE recipe_attachments
                        (
                                recipe_id int NOT NULL
    ,
                                attachment_id int NOT NULL
     ,
                                foreign key (recipe_id) references recipes (recipe_id)
      ,
                                foreign key (attachment_id) references attachments (attachment_id)
      ,
                                unique (recipe_id, attachment_id)
                        )
                        ENGINE=INNODB;

                        CREATE TABLE feedback
                        (
                                feedback_id INT NOT NULL
                                AUTO_INCREMENT Primary key
    ,recipe_id int NOT NULL 
    ,user_id int NOT NULL
     ,date_added datetime 
     ,comment varchar
                                (3000)
	,stars int NOT NULL
    ,parent int 
    ,foreign key
                                (recipe_id) references recipies
                                (recipe_id)
    ,foreign key
                                (user_id) references users
                                (user_id)
    ,foreign key
                                (parent) references feedback
                                (feedback_id)
) ENGINE=INNODB;
