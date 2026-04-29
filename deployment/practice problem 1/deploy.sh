#!/bin/bash

# Deployment Script for Multi-Environment System

ENV=$1
BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Starting deployment to $ENV from branch $BRANCH..."

case $ENV in
  development)
    echo "Deploying to Heroku Dev..."
    heroku git:remote -a transaction-system-dev
    git push heroku $BRANCH:main
    ;;

  staging)
    echo "Approval check for Staging..."
    # Mocking approval check
    read -p "Has the code been reviewed? (y/n) " approved
    if [ "$approved" != "y" ]; then
      echo "Deployment aborted: Code review required."
      exit 1
    fi
    heroku git:remote -a transaction-system-staging
    git push heroku $BRANCH:main
    ;;

  production)
    echo "Security & Compliance check for Production..."
    
    # 1. Maintenance Window Check
    DAY=$(date +%u) # 1-7 (7 is Sunday)
    HOUR=$(date +%H)
    if [ "$DAY" -lt 6 ] || [ "$HOUR" -lt 2 ] || [ "$HOUR" -gt 6 ]; then
      echo "Deployment aborted: Outside of maintenance window (Weekends 2AM-6AM)."
      exit 1
    fi

    # 2. QA Sign-off Check
    read -p "QA Sign-off received? (y/n) " qasign
    if [ "$qasign" != "y" ]; then
      echo "Deployment aborted: QA Sign-off required."
      exit 1
    fi

    # 3. Deploy to IIS (On-Prem)
    echo "Syncing files to IIS Server..."
    # Mock rsync/robocopy to production server
    # robocopy . \\PROD-IIS-SERVER\C$\inetpub\wwwroot\transactions /MIR /XF .env*
    
    # 4. Log Deployment for Audit
    echo "$(date): Deployed version $(git rev-parse HEAD) to Production by $USER" >> deployment_audit.log
    ;;

  *)
    echo "Usage: ./deploy.sh [development|staging|production]"
    exit 1
    ;;
esac

echo "Deployment to $ENV successful!"
