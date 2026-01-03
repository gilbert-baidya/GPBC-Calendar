#!/usr/bin/env python3
"""
SIMPLE ONE-COMMAND BUILDER for devotions-2026.json

HOW TO USE:
1. Open this file in your editor
2. Scroll down to the "PASTE YOUR DATA HERE" section
3. Copy each month's JSON array from our conversation and paste it into the respective month variable
4. Save this file
5. Run: python3 build-all-devotions-simple.py
6. Done! devotions-2026.json will be created with all 365 days

That's it! No complex steps.
"""

import json

print("=" * 60)
print("Building Complete devotions-2026.json")
print("=" * 60)

# ============================================================================
# PASTE YOUR DATA HERE - Copy from the conversation messages
# ============================================================================

# JANUARY - Paste the JSON array you sent me for January (31 entries)
january = [
    # Example entry - replace this entire array with your January data
    {
        "date": "2026-01-01",
        "title": "He Knows Your Name",
        "titleBn": "তিনি তোমার নাম জানেন",
        "verse": "Isaiah 43:1",
        "verseText": "Fear not, for I have redeemed you; I have called you by name, you are mine.",
        "verseTextBn": "ভয় করোনা, কারণ আমি তোমাকে মুক্ত করেছি; আমি তোমাকে নামে ডেকেছি, তুমি আমার।",
        "reflection": "God's personal call means you are never anonymous to Him. He loves you in particular, not just the crowd. Redemption is His decisive act to claim you as His own. Let this quiet fear and shame: you belong. Because you are His, you can walk through uncertainty with confidence that He will guard and guide.",
        "reflectionBn": "ঈশ্বরের ডাকে তুমি কখনো অচেনা নও। তিনি ভিড় নয়, তোমাকে ব্যক্তিগতভাবে ভালোবাসেন। মুক্তি তাঁর সিদ্ধান্ত তোমাকে নিজের করার। এই সত্য ভয় ও লজ্জা শান্ত করুক: তুমি তাঁর। তুমি তাঁর বলেই অনিশ্চয়তায়ও আত্মবিশ্বাসে চলতে পারো; তিনি রক্ষা ও দিশা দেবেন।",
        "prayer": "Father, thank You for calling me by name. Silence every lie that says I'm forgotten and let my heart rest in belonging to You.",
        "prayerBn": "পিতা, আমাকে নামে ডাকার জন্য ধন্যবাদ। যে সব মিথ্যা বলে আমি ভুলে গেছি সেগুলো নীরব করুন, এবং আমার হৃদয়কে আপনার মধ্যে থাকার নিশ্চিন্ততায় বিশ্রাম দিন."
    }
    # ... paste rest of January entries here (entries for Jan 2-31)
]

# FEBRUARY - Paste your February array here (28 entries)
february = []  # Replace with your February data

# MARCH - Paste your March array here (31 entries)
march = []  # Replace with your March data

# APRIL - Paste your April array here (30 entries)
april = []  # Replace with your April data

# MAY - Paste your May array here (31 entries)
may = []  # Replace with your May data

# JUNE - Paste your June array here (30 entries)
june = []  # Replace with your June data

# JULY - Paste your July array here (31 entries)
july = []  # Replace with your July data

# AUGUST - Paste your August array here (31 entries)
august = []  # Replace with your August data

# SEPTEMBER - Paste your September array here (30 entries)
september = []  # Replace with your September data

# OCTOBER - Paste your October array here (31 entries)
october = []  # Replace with your October data

# NOVEMBER - Paste your November array here (30 entries)
november = []  # Replace with your November data

# DECEMBER - Paste your December array here (31 entries)
december = []  # Replace with your December data

# ============================================================================
# NO NEED TO EDIT BELOW THIS LINE
# ============================================================================

# Combine all months
all_devotions = (
    january + february + march + april + may + june +
    july + august + september + october + november + december
)

# Validate counts
expected_counts = {
    'January': (january, 31),
    'February': (february, 28),
    'March': (march, 31),
    'April': (april, 30),
    'May': (may, 31),
    'June': (june, 30),
    'July': (july, 31),
    'August': (august, 31),
    'September': (september, 30),
    'October': (october, 31),
    'November': (november, 30),
    'December': (december, 31)
}

print("\nValidating monthly counts:")
print("-" * 60)
total = 0
all_good = True
for month_name, (month_data, expected) in expected_counts.items():
    count = len(month_data)
    total += count
    status = "✓" if count == expected else "✗"
    print(f"{status} {month_name:12} - {count:3} entries (expected {expected})")
    if count != expected:
        all_good = False

print("-" * 60)
print(f"Total: {total} entries (expected 365)")
print()

if not all_good:
    print("⚠️  Warning: Some months have incorrect entry counts!")
    print("Please check and paste the complete arrays for each month.")
    print()
    response = input("Continue anyway? (y/n): ")
    if response.lower() != 'y':
        print("Aborted. Please fix the data and run again.")
        exit(1)

# Write to file
output_file = "devotions-2026.json"
print(f"Writing to {output_file}...")

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(all_devotions, f, ensure_ascii=False, indent=2)

# Verify the file
with open(output_file, 'r', encoding='utf-8') as f:
    verify = json.load(f)

print(f"✅ Successfully created {output_file}")
print(f"✅ Contains {len(verify)} devotions")
print(f"✅ File size: {len(open(output_file).read())/1024:.1f} KB")
print()

if len(verify) == 365:
    print("🎉 Perfect! All 365 days of devotional content ready!")
    print()
    print("Next steps:")
    print("1. Test: open daily-devotion.html in browser")
    print("2. Deploy: git add devotions-2026.json && git commit && git push")
else:
    print(f"⚠️  Note: Expected 365 entries, got {len(verify)}")
    print("Please verify all months are complete.")

print()
print("=" * 60)
