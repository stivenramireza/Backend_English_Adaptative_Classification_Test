def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger']
def getBuildUser() {
    return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
}
node {
    enviroment {
        BUILD_USER = ''
    }
    agent any
    def app
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
    post {
        always{
            script {
                BUILD_USER = getBuildUser()
            }
            slackSend channel: '#aplicación-web',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${BUILD_USER}\n More info at: ${env.BUILD_URL}"
        }
    }
}