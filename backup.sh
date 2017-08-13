#!/bin/bash
ssh -i ~/.ssh/aws1.pem bitnami@zenandroid.io 'sudo /opt/bitnami/ctlscript.sh stop'
ssh -i ~/.ssh/aws1.pem bitnami@zenandroid.io 'sudo tar -pczvf ~/application-backup.tar.gz /opt/bitnami'
ssh -i ~/.ssh/aws1.pem bitnami@zenandroid.io 'sudo /opt/bitnami/ctlscript.sh start'
scp -i ~/.ssh/aws1.pem bitnami@zenandroid.io:~/application-backup.tar.gz ~/blog_backup_$(date +"%Y_%m_%d_%I_%M_%p").tar.gz
