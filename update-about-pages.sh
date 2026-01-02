#!/bin/bash

# List of files to check and update
files=("mission.html" "leadership.html" "beliefs.html" "core-values.html" "position-papers.html" "testimonies.html" "songbook.html")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ Found: $file - Will be updated"
    else
        echo "✗ Missing: $file - Needs creation"
    fi
done
