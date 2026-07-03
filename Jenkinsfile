pipeline {
    agent any

    environment {
        APP_DIR = "/var/www/passats-staging/resumebuilder-frontend"
        BRANCH = "staging"
        PM2_NAME = "resumebuilder-frontend-staging"
    }

    stages {

        stage('Checkout') {
            steps {
                dir("${APP_DIR}") {
                    sh """
                    git fetch origin
                    git checkout ${BRANCH}
                    git reset --hard origin/${BRANCH}
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    sh "npm install"
                }
            }
        }

        stage('Build') {
            steps {
                dir("${APP_DIR}") {
                    sh "npm run build"
                }
            }
        }

        stage('Restart Application') {
            steps {
                dir("${APP_DIR}") {
                    sh """
                    PORT=3005 pm2 restart ${PM2_NAME} --update-env
                    pm2 save
                    """
                }
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}
