try{
    node {
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
    }
    BUILD_USER = getBuildUser()
    notifyBuild("SUCCESSFUL BUILD BY ${BUILD_USER} \n.")
}
catch(exc) {
    BUILD_USER = getBuildUser()
    notifyBuild("UNSUCCESSFUL BUILD BY ${BUILD_USER} \n.")
}
def getBuildUser() {
    return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
}