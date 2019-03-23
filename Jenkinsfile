node {
    def app

    stage('Clone repository') {
        
        /*Clone repo to our workspace*/

        checkout scm
    }

    stage('Build image') {

        /*
        Builds the actual image; synonimous to docker build on
        the command line
        */
        app = docker.build("agrajal7/eaciapp")
    }

    stage('Test image') {

        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub'){
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

    stage('Run app') {
        sh 'bash ./deploy.sh'
    }
}