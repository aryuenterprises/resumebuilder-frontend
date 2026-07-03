pipeline {
    agent any
    environment {
        APP_DIR = "/var/www/passats-staging/resumebuilder-frontend"
        BRANCH = "staging"
        PM2_NAME = "resumebuilder-frontend-staging"
        APP_PORT = "3005"
    }
    options {
        timestamps()
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                dir("${APP_DIR}") {
                    sh """
                    set -e
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
                    sh """
                    set -e
                    npm install
                    """
                }
            }
        }
        stage('Build') {
            steps {
                dir("${APP_DIR}") {
                    sh """
                    set -e
                    rm -rf .next
                    npm run build
                    """
                }
            }
        }
        stage('Restart Application') {
            steps {
                dir("${APP_DIR}") {
                    sh """
                    set -e
                    PORT=${APP_PORT} pm2 restart ${PM2_NAME} --update-env || PORT=${APP_PORT} pm2 start npm --name ${PM2_NAME} -- start
                    pm2 save
                    """
                }
            }
        }
        stage('Health Check') {
            steps {
                sh """
                set -e
                echo "Waiting for app to boot..."
                sleep 8
                STATUS=\$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${APP_PORT})
                if [ "\$STATUS" != "200" ]; then
                    echo "Health check failed - HTTP status: \$STATUS"
                    pm2 logs ${PM2_NAME} --lines 50 --nostream
                    exit 1
                fi
                echo "Health check passed - HTTP 200 OK"
                """
            }
        }
    }
    post {
        success {
            echo 'Deployment Successful'
        }
        failure {
            echo 'Deployment Failed - check the Build or Health Check stage logs above'
        }
    }
}
