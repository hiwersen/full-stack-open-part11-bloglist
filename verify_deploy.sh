#!/bin/bash

echo -e "\n~~~~~ Post-Deploy Verification ~~~~~\n"

for i in $(seq 1 20)
do
    live=$(curl -s --max-time 30 "$APP_URL/api/version" | jq -r .commit)
    if [ "$live" = "$GITHUB_SHA" ]
    then
        echo "Deployed version: $live"
        exit 0
    fi
    echo "$i:: Live version: $live — Waiting deployment: $GITHUB_SHA"
    sleep 15
done

echo -e "::error::Still waiting for $GITHUB_SHA (live: $live)"
exit 1


