env=$1

cp -r "./env/env.${env}.js" "./env/env.config.js"

echo "Change ENV to ${env}"
