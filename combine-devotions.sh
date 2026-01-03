#!/bin/bash
# Quick script to help you build devotions-2026.json
# 
# INSTRUCTIONS:
# 1. Scroll through this conversation
# 2. Copy each month's devotional array (the [...] parts you sent me)
# 3. Paste them into individual files named: jan.json, feb.json, mar.json, etc.
# 4. Run this script: bash combine-devotions.sh
# 5. It will create the complete devotions-2026.json

echo "🔨 Building complete devotions-2026.json..."

# Create temporary directory
mkdir -p temp_devotions

# Check for monthly files
months=("jan" "feb" "mar" "apr" "may" "jun" "jul" "aug" "sep" "oct" "nov" "dec")
missing=0

for month in "${months[@]}"; do
    if [ ! -f "temp_devotions/${month}.json" ]; then
        echo "❌ Missing: temp_devotions/${month}.json"
        missing=$((missing + 1))
    else
        echo "✓ Found: ${month}.json"
    fi
done

if [ $missing -gt 0 ]; then
    echo ""
    echo "📋 TO USE THIS SCRIPT:"
    echo "1. Create a folder: temp_devotions/"
    echo "2. Save each month's JSON array from our chat as:"
    echo "   - temp_devotions/jan.json"
    echo "   - temp_devotions/feb.json"
    echo "   - temp_devotions/mar.json"
    echo "   - ... through dec.json"
    echo "3. Run: bash combine-devotions.sh"
    exit 1
fi

# Combine all files
echo ""
echo "🔄 Combining all months..."

# Start JSON array
echo "[" > devotions-2026.json

# Add each month
first=true
for month in "${months[@]}"; do
    content=$(cat "temp_devotions/${month}.json")
    # Remove opening [ and closing ]
    content=${content#[}
    content=${content%]}
    
    if [ "$first" = true ]; then
        echo "$content" >> devotions-2026.json
        first=false
    else
        echo ",$content" >> devotions-2026.json
    fi
done

# Close JSON array
echo "]" >> devotions-2026.json

echo "✅ Created devotions-2026.json"
echo ""
echo "🧪 Validating..."

# Validate JSON
if python3 -c "import json; json.load(open('devotions-2026.json'))" 2>/dev/null; then
    count=$(python3 -c "import json; print(len(json.load(open('devotions-2026.json'))))")
    echo "✅ Valid JSON with $count devotions!"
    
    if [ "$count" -eq 365 ]; then
        echo "🎉 Perfect! All 365 days complete!"
    else
        echo "⚠️  Expected 365 days, but found $count"
    fi
else
    echo "❌ JSON validation failed. Please check syntax."
    exit 1
fi

echo ""
echo "✅ devotions-2026.json is ready!"
echo "Next step: git add devotions-2026.json && git commit && git push"
