#!/bin/sh

# Count the number of commits per date
commits=$(git log --pretty=format:"%ad" --date=format:"%d.%m.%Y" | sort | uniq -c)

# Convert the output to JSON
json=$(echo $commits | awk '{print "{\"" $2 "\": " $1 "}"}' | jq -s -c '.')

# Save the JSON to a file
echo $json > commits.json

# Add the changes to the Git staging area
git add commits.json
