#!/bin/bash
gulp build
rsync -Pavh -e ssh assets/css/caffeine-theme.css bitnami@blog:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/assets/css
rsync -Pavh -e ssh assets/js/*.js bitnami@blog:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/assets/js
rsync -Pavh -e ssh partials/ bitnami@blog:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/partials --delete
rsync -Pavh -e ssh assets/fonts/ bitnami@blog:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/assets/fonts --delete
rsync -Pavh -e ssh assets/img/ bitnami@blog:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master/assets/img --delete
rsync -Pavh -e ssh *.hbs bitnami@blog:/opt/bitnami/apps/ghost/htdocs/content/themes/caffeine-theme-master
ssh bitnami@blog 'sudo /opt/bitnami/ctlscript.sh restart ghost'

