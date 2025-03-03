#!/bin/bash

echo "Running migrations..."
npm run migrate:prod

echo "Starting the backend service..."
npm run start:prod