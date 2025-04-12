# Variables
DOCKER_COMPOSE = docker-compose
MIGRATION_CONTAINER = restapi-node-app-1
MIGRATION_CMD = npx node-pg-migrate

# Targets
.PHONY: up down restart logs migrate migrate-down create-db

# Rebuild app container
build:
	$(DOCKER_COMPOSE) build --no-cache

# Start all services
up:
	$(DOCKER_COMPOSE) up -d

# Stop all services
down:
	$(DOCKER_COMPOSE) down

# Restart services
restart:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up -d

# View logs
logs:
	$(DOCKER_COMPOSE) logs -f app

# Run migrations (up)
migrate:
	$(DOCKER_COMPOSE) exec app $(MIGRATION_CMD) up

# Rollback last migration (down)
migrate-down:
	$(DOCKER_COMPOSE) exec app $(MIGRATION_CMD) down

# Create migration file: make create name=your_migration_name
create:
	$(DOCKER_COMPOSE) exec app $(MIGRATION_CMD) create $(name)

# Create DB if needed (only if you're managing it via script)
create-db:
	$(DOCKER_COMPOSE) exec db psql -U $$POSTGRES_USER -c "CREATE DATABASE $$POSTGRES_DB;"

