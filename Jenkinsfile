pipeline {
    agent any

    environment {
        DEPLOY_PATH = "/var/www/aryu_resumebuilder/resume_builder_frontend"
        APP_NAME = "resumebuilder-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/YOUR_GITHUB_USERNAME/YOUR_FRONTEND_REPO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
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
                rsync -av --delete \
                  --exclude='.git' \
                  --exclude='node_modules' \
                  ./ ${DEPLOY_PATH}/
                """
            }
        }

        stage('Restart via PM2 (Zero Downtime)') {
            steps {
                sh """
                cd ${DEPLOY_PATH}
                pm2 reload ${APP_NAME} || pm2 start npm --name "${APP_NAME}" -- start
                pm2 save
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
    }
}

