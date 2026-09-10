pipeline {
    agent any

    environment {
        DEPLOY_PATH = "/var/www/aryu_resumebuilder"
        APP_NAME    = "resumebuilder-frontend"
        NODE_ENV    = "production"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --include=dev'
            }
        }

        stage('Build Next.js') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Production Path') {
            steps {
                sh """
                rsync -rlptv --delete \
                --exclude='.git' \
                --exclude='node_modules' \
                ./ ${DEPLOY_PATH}/
                """
            }
        }

        stage('Restart PM2') {
           steps {
               sh """
               cd ${DEPLOY_PATH}

               npm ci --omit=dev

               sudo -u aryu_user /usr/bin/pm2 reload ${APP_NAME} || \
               sudo -u aryu_user /usr/bin/pm2 start npm --name "${APP_NAME}" -- start

               sudo -u aryu_user /usr/bin/pm2 save
               """
           }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful"
        }
        failure {
            echo "❌ Deployment Failed"
        }
        always {
            echo "Pipeline run completed."
        }
    }
}
