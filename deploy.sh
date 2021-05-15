#!/bin/bash

PROJECT_ID="cloud-demo-2896734"
APP_NAME="triplecheck-broker"
REGION="europe-west1" # Needs to be a supported region
ENTRY_POINT="handler" # This is the actual exported function name
BROKER_USERNAME="triplecheck-broker-sa"

gcloud functions deploy $APP_NAME \
  --region=$REGION \
  --trigger-http \
  --runtime="nodejs14" \
  --entry-point $ENTRY_POINT \
  --allow-unauthenticated \
  --service-account $BROKER_USERNAME@$PROJECT_ID.iam.gserviceaccount.com