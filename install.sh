#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Create placeholder images directory if it doesn't exist
mkdir -p public/images

echo "Setup complete! Now you can:"
echo "1. Add your personal images to the public/images directory"
echo "2. Customize the content in src/data/content.json"
echo "3. Run the development server with: npm run dev"
echo "4. Open http://localhost:3000 in your browser" 