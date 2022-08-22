CREATE TABLE `domains` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `domain_name` VARCHAR(255) NOT NULL,  
  PRIMARY KEY (`id`),
  UNIQUE KEY `domain_name_unique` (`domain_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
