pipeline {
    agent any  // Run on any available agent

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout scm
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'  // Or 'yarn install' if you use yarn
                }
            }
        }
        stage('Build and Test') {
            steps {
                script {
                    bat 'npm run build && npm test'  // Or 'yarn build && yarn test'
                }
            }
        }

    }
}
