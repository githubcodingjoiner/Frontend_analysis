pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'nodejs', type: 'NodeJSInstallation' // Specify your NodeJS installation name in Jenkins
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        SONAR_TOKEN = credentials('sonar-token') // Jenkins credentials ID for SonarQube token
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat '''
                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') { // SonarQube server name in Jenkins
                    dir('frontend') {
                        bat '''
                        sonar-scanner ^
                        -Dsonar.projectKey=MERN_frontend_pipeline ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://localhost:9000 ^
                        -Dsonar.token=${SONAR_TOKEN}
                        '''
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'frontend/build/**, fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for errors.'
        }
    }
}
