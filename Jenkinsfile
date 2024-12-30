pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation' // Specify your NodeJS installation name in Jenkins
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        SONAR_TOKEN = credentials('sonar-auth-token') // Jenkins credentials ID for SonarQube token
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://your-repository-url.git' // Replace with your repo URL
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') { // SonarQube server name in Jenkins
                    dir('frontend') {
                        sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=mern-frontend \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://your-sonarqube-server-url \
                          -Dsonar.login=${SONAR_TOKEN}
                        '''
                    }
                    dir('backend') {
                        sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=mern-backend \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://your-sonarqube-server-url \
                          -Dsonar.login=${SONAR_TOKEN}
                        '''
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'frontend/build/**, backend/build/**', fingerprint: true
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
