#!/bin/bash

echo "Running migrations..."
npm run migrate:prod

echo "Seeding the database..."
npm run seed:prod

echo "Starting the backend service..."
npm run start:prod