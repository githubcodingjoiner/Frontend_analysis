pipeline {
    agent any

    tools{
        nodejs 'sonarnode'
    }

    environment {
        NODEJS_HOME='C:\\Program Files\\nodejs'
        SONAR_SCANNER_PATH='C:\\Users\\Admin\\Downloads\\sonar-scanner-6.2.1.4610-windows-x64\\bin'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies'){
            steps{
                bat '''
                set PATH =%NODEJS_HOME%;%PATH%
                npm install
                '''
            }
        }
        
        stage('Lint'){
            steps{
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
                npm run lint
                '''
            }
        }
        
         stage('Build'){
            steps{
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
                npm run build
                '''
            }
        }
        
        stage('SonarQube Analysis') {
            environment{
                SONAR_TOKEN = credentials('sonar-token')
            }
            steps {
                    bat '''
                    set PATH=%SONAR_SCANNER_PATH%;%PATH%
                    sonar-scanner ^
                    -Dsonar.projectKey=MERN_frontend_pipeline ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000 ^
                    -Dsonar.token=${SONAR_TOKEN}
                    '''
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