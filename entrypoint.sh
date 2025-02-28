#!/bin/bash

echo "Running migrations..."
npm run migrate:up

echo "Starting the backend service..."
npm run start:prod