# Multi-Role Access control system

This service allows the user to create and manage an Organization/Department hierarchy and assign roles to users within it.

## Architecture

The follows layered architecture, each folder in the src directory defines a layer:

1. `entities`: Defines the database entities of the system.
2. `repositories`: Defines the operations that mainly happen on those entities.
3. `api`: Defines the REST API layer that acts as an interface for the underling system.

## Authentication

The system authentication is made based on Auth token.
The token is expected to be provided either as cookie or as header `x-auth-token`

## Authorization

Each user can take actions within the organizations he owns or added to.
