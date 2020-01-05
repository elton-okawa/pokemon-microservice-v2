#!/bin/bash
gcloud builds submit --config ./cloud-build/trainer.yaml --substitutions=_ZONE=$1,_CLUSTER=$2 . &
gcloud builds submit --config ./cloud-build/battle.yaml --substitutions=_ZONE=$1,_CLUSTER=$2 . &
gcloud builds submit --config ./cloud-build/challenge.yaml --substitutions=_ZONE=$1,_CLUSTER=$2 . &
gcloud builds submit --config ./cloud-build/frontend.yaml --substitutions=_ZONE=$1,_CLUSTER=$2 . &