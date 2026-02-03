pipeline {
    agent any

    environment {
        WORKSPACE_DIR = "${WORKSPACE}"
        DEPLOY_DIR    = "/var/www/aryu_resumebuilder/resume_builder_frontend/dist"
    }

    stages {

        stage('Verify dist exists in workspace') {
            steps {
                sh '''
                    if [ ! -d "$WORKSPACE_DIR/dist" ]; then
                      echo "ERROR: dist not found. Dev must push build."
                      exit 1
                    fi
                '''
            }
        }

        stage('Deploy static files') {
            steps {
                sh '''
                    rm -rf $DEPLOY_DIR/*
                    cp -r $WORKSPACE_DIR/dist/* $DEPLOY_DIR/
                '''
            }
        }
    }
}

