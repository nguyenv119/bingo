#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Create placeholder images directory if it doesn't exist
mkdir -p public/images

echo "Setup complete!"
echo "Starting development server..."
npm run dev 