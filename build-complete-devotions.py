#!/usr/bin/env python3
"""
Build devotions-2026.json from monthly files

This script combines all monthly JSON files from the devotions-data/ folder
into a single devotions-2026.json file with all 365 devotions.
"""

import json
import os
from pathlib import Path

print("=" * 70)
print("Building devotions-2026.json from monthly files")
print("=" * 70)

# Configuration
source_dir = Path("devotions-data")
output_file = "devotions-2026.json"

# Month configuration
months = [
    ("01-january.json", 31),
    ("02-february.json", 28),
    ("03-march.json", 31),
    ("04-april.json", 30),
    ("05-may.json", 31),
    ("06-june.json", 30),
    ("07-july.json", 31),
    ("08-august.json", 31),
    ("09-september.json", 30),
    ("10-october.json", 31),
    ("11-november.json", 30),
    ("12-december.json", 31)
]

# Collect all devotions
all_devotions = []
total_loaded = 0

print(f"\nReading from {source_dir}/")
print("-" * 70)

for month_file, expected_days in months:
    file_path = source_dir / month_file
    
    if not file_path.exists():
        print(f"✗ Missing: {month_file}")
        continue
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            month_data = json.load(f)
        
        if not isinstance(month_data, list):
            print(f"✗ {month_file} - Error: not a JSON array")
            continue
        
        count = len(month_data)
        status = "✓" if count == expected_days else "⚠"
        print(f"{status} {month_file:20} - {count:3} entries (expected {expected_days})")
        
        all_devotions.extend(month_data)
        total_loaded += count
        
    except json.JSONDecodeError as e:
        print(f"✗ {month_file} - JSON Error: {e}")
    except Exception as e:
        print(f"✗ {month_file} - Error: {e}")

print("-" * 70)
print(f"Total loaded: {total_loaded} devotions (expected 365)")
print()

if total_loaded == 0:
    print("❌ No devotions loaded!")
    print("\nPlease add your devotional content to the monthly files in devotions-data/")
    exit(1)

# Write combined file
print(f"Writing to {output_file}...")
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(all_devotions, f, ensure_ascii=False, indent=2)

# Verify
with open(output_file, 'r', encoding='utf-8') as f:
    verify = json.load(f)

file_size_kb = os.path.getsize(output_file) / 1024

print(f"✅ Successfully created {output_file}")
print(f"   - {len(verify)} devotions")
print(f"   - {file_size_kb:.1f} KB")
print()

if len(verify) == 365:
    print("🎉 Perfect! All 365 days complete!")
    print()
    print("Next steps:")
    print("  1. Test: open daily-devotion.html in browser")
    print("  2. Verify console shows: '✓ Loaded 365 devotions for 2026'")
    print("  3. Deploy: git add . && git commit -m 'Add complete devotions' && git push")
else:
    print(f"⚠️  Note: Expected 365 entries, got {len(verify)}")
    print("   Please complete all monthly files with devotional content.")

print()
print("=" * 70)
