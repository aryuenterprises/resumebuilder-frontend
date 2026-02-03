pipeline {
    agent any

    environment {
        PROJECT_DIR = "/var/www/aryu_resumebuilder/resume_builder_frontend"
    }

    stages {

        stage('Pull Latest Code') {
            steps {
                sh '''
                    cd $PROJECT_DIR
                    git fetch --all
                    git reset --hard origin/main
                '''
            }
        }

        stage('Verify dist exists') {
            steps {
                sh '''
                    cd $PROJECT_DIR
                    if [ ! -d "dist" ]; then
                      echo "ERROR: dist folder not found. Dev team must push build."
                      exit 1
                    fi
                '''
            }
        }

    }
}

