#!/bin/bash
gulp build
scp -i ~/.ssh/aws1.pem assets/css/caffeine-theme.css bitnami@ec2-52-56-109-75.eu-west-2.compute.amazonaws.com:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/assets/css
scp -i ~/.ssh/aws1.pem assets/js/caffeine-theme.js bitnami@ec2-52-56-109-75.eu-west-2.compute.amazonaws.com:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/assets/js
scp -i ~/.ssh/aws1.pem partials/* bitnami@ec2-52-56-109-75.eu-west-2.compute.amazonaws.com:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/partials/
scp -i ~/.ssh/aws1.pem *.hbs bitnami@ec2-52-56-109-75.eu-west-2.compute.amazonaws.com:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/
ssh -i ~/.ssh/aws1.pem bitnami@ec2-52-56-109-75.eu-west-2.compute.amazonaws.com 'sudo /opt/bitnami/ctlscript.sh restart ghost'

