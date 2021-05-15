#!/bin/bash

PROJECT_ID="" # Edit this
BROKER_USERNAME="triplecheck-broker-sa"
BROKER_DISPLAYNAME="TripleCheck broker service account"

# Enable Cloud Functions API
gcloud services enable cloudfunctions.googleapis.com

# Create TripleCheck broker user
gcloud iam service-accounts create $BROKER_USERNAME \
  --display-name $BROKER_DISPLAYNAME

# Add correct permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$BROKER_USERNAME@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/datastore.user

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$BROKER_USERNAME@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/cloudfunctions.invoker