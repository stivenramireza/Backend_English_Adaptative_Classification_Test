
node {
    def app
    stages{
        stage('Clone repository') {
            /* Cloning the Repository to our Workspace */

            checkout scm
        }

        stage('Build image') {
            /* This builds the actual image */

            app = docker.build("agrajal7/eaciapp")
        }

        stage('Test image') {
            
            app.inside {
                echo "Tests passed"
            }
        }

        stage('Push image') {
            /* 
                You would need to first register with DockerHub before you can push images to your account
            */
            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
                app.push("${env.BUILD_NUMBER}")
                app.push("latest")
                } 
                    echo "Trying to Push Docker Build to DockerHub"
        }

        stage('run app') {
            sh 'bash ./deploy.sh'
        }
    }
    post {
        success {
            slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
        failure {
            slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
    }
}