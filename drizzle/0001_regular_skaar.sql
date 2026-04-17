CREATE TABLE `criaturas` (
	`id` varchar(64) NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`nombreComun` varchar(255) NOT NULL,
	`descripcion` text NOT NULL,
	`especie` varchar(255) NOT NULL,
	`rareza` enum('legendario','epico','raro','comun') NOT NULL,
	`costeCompra` int NOT NULL,
	`costeVenta` int NOT NULL,
	`imageUrl` text NOT NULL,
	`stats` json NOT NULL,
	`habilidades` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `criaturas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `estructuras_defensa` (
	`id` varchar(64) NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`descripcion` text NOT NULL,
	`codigo` varchar(64) NOT NULL,
	`rareza` enum('legendario','epico','raro','comun') NOT NULL,
	`coste` int NOT NULL,
	`imageUrl` text NOT NULL,
	`stats` json NOT NULL,
	`efectos` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `estructuras_defensa_id` PRIMARY KEY(`id`),
	CONSTRAINT `estructuras_defensa_codigo_unique` UNIQUE(`codigo`)
);
--> statement-breakpoint
CREATE TABLE `instalaciones` (
	`id` varchar(64) NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`descripcion` text NOT NULL,
	`categoria` varchar(64) NOT NULL,
	`tipo` varchar(64) NOT NULL,
	`rareza` enum('legendario','epico','raro','comun') NOT NULL,
	`coste` int NOT NULL,
	`imageUrl` text NOT NULL,
	`codigo` varchar(64) NOT NULL,
	`faccion` varchar(64),
	`medio` varchar(64),
	`alimentacion` varchar(64),
	`stats` json NOT NULL,
	`efectos` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `instalaciones_id` PRIMARY KEY(`id`),
	CONSTRAINT `instalaciones_codigo_unique` UNIQUE(`codigo`)
);
--> statement-breakpoint
CREATE TABLE `objetos` (
	`id` varchar(64) NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`descripcion` text NOT NULL,
	`tipo` varchar(64) NOT NULL,
	`categoria` varchar(64) NOT NULL,
	`rareza` enum('legendario','epico','raro','comun') NOT NULL,
	`coste` int NOT NULL,
	`cantidad` int NOT NULL DEFAULT 1,
	`imageUrl` text NOT NULL,
	`efectos` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `objetos_id` PRIMARY KEY(`id`)
);
