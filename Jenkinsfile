pipeline {
    agent any

    environment {
        DEPLOY_PATH = "/var/www/aryu_resumebuilder/resume_builder_frontend"
        APP_NAME    = "resumebuilder-frontend"
        NODE_ENV    = "production"
    }

    stages {
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

        stage('Restart PM2') {
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
        always {
            echo "Pipeline run completed."
        }
    }
}
