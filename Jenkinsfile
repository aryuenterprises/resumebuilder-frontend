pipeline {
    agent any

    environment {
        APP_DIR         = "/var/www/passats-staging/resumebuilder-frontend"
        BRANCH          = "staging"
        APP_PORT        = "3005"
        CONTAINER_NAME  = "resumebuilder-frontend-staging"
        IMAGE_NAME      = "resumebuilder-frontend-staging"
        // Pulled from Jenkins credentials store (see note below)
        NEXT_PUBLIC_API_URL = credentials('resumebuilder-staging-api-url')
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
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

        stage('Build Docker Image') {
            steps {
                dir("${APP_DIR}") {
                    sh """
                    set -e
                    docker build \
                      --build-arg NEXT_PUBLIC_API_URL=\$NEXT_PUBLIC_API_URL \
                      -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                      -t ${IMAGE_NAME}:latest \
                      .
                    """
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                sh """
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                """
            }
        }

        stage('Run New Container') {
            steps {
                sh """
                set -e
                docker run -d \
                  --name ${CONTAINER_NAME} \
                  --restart unless-stopped \
                  -p ${APP_PORT}:3005 \
                  ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Health Check') {
            steps {
                sh """
                set -e
                echo "Waiting for container to boot..."
                sleep 8

                STATUS=\$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${APP_PORT})

                if [ "\$STATUS" != "200" ]; then
                    echo "Health check failed - HTTP status: \$STATUS"
                    echo "---- Container logs ----"
                    docker logs ${CONTAINER_NAME} --tail 50
                    exit 1
                fi

                echo "Health check passed - HTTP 200 OK"
                """
            }
        }

        stage('Cleanup Old Images') {
            steps {
                sh """
                docker image prune -f
                docker images ${IMAGE_NAME} --format "{{.Tag}}" | grep -v latest | sort -rn | tail -n +6 | xargs -r -I {} docker rmi ${IMAGE_NAME}:{} || true
                """
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful - Docker container running'
        }
        failure {
            echo 'Deployment Failed - check Build/Health Check stage logs above'
            sh "docker logs ${CONTAINER_NAME} --tail 100 || true"
        }
    }
}
