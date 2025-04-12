pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'my-node-app'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $DOCKER_IMAGE ."
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose down && docker-compose up -d --build'
      }
    }
  }
}
