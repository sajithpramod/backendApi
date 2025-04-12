# Variables
DOCKER_COMPOSE = docker compose
MIGRATION_CONTAINER = app
MIGRATION_CMD = npx node-pg-migrate

# Targets
.PHONY: build up down restart logs migrate migrate-down create create-db

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

migrate:
	$(DOCKER_COMPOSE) exec app $(MIGRATION_CMD) up	

# Run migrations (test env)
migrate-testdb:
	$(DOCKER_COMPOSE) exec app $(MIGRATION_CMD) up -e test

# Rollback last migration (test env)
migrate-down:
	$(DOCKER_COMPOSE) exec app $(MIGRATION_CMD) down -e test

# Create migration file with test env: make create name=your_migration_name
create:
	$(DOCKER_COMPOSE) exec app $(MIGRATION_CMD) create $(name) -e test

# Create the test DB manually if needed (optional)
create-test-db:
	$(DOCKER_COMPOSE) exec db psql -U postgres -c "CREATE DATABASE myapp_test_db;"
