// AgriSathi CI pipeline (Declarative)
// Flow: Checkout -> Install -> Automated Tests -> Build -> Archive
// Continuous feedback: JUnit test trends, coverage report, build description,
// stage view / pipeline graph, and email on failure / recovery.

pipeline {
    // Run on any available agent (this Jenkins runs on Windows, so steps use `bat`)
    agent any

    parameters {
        string(name: 'NOTIFY_EMAIL', defaultValue: '',
               description: 'Email address for build feedback (leave empty to skip email)')
    }

    // Automatically start a build when new commits are pushed.
    // Jenkins runs on localhost (GitHub webhooks cannot reach it), so poll Git every ~5 min.
    triggers {
        pollSCM('H/5 * * * *')
    }

    options {
        timestamps()                                    // timestamp every console line
        timeout(time: 20, unit: 'MINUTES')              // abort hung builds
        buildDiscarder(logRotator(numToKeepStr: '15'))  // keep last 15 builds
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'                    // tells npm/vitest they run in CI (non-interactive)
        NPM_CONFIG_FUND = 'false'
        NPM_CONFIG_AUDIT = 'false'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
                bat 'git log -1 --pretty=format:"Commit %%h by %%an: %%s"'
            }
        }

        stage('Environment Info') {
            steps {
                bat 'node -v && npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies (clean install from package-lock.json)...'
                bat 'npm ci'
            }
        }

        stage('Automated Tests') {
            steps {
                echo 'Running unit tests with coverage...'
                // Fails this stage (and the pipeline) if any test fails -> Build is skipped
                bat 'npm run test:ci'
            }
            post {
                always {
                    // Publish results even when tests fail: per-test results + trend graph on the job page
                    junit allowEmptyResults: true, testResults: 'reports/junit.xml'
                    // HTML coverage report, downloadable from the build's "Artifacts"
                    archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building React application...'
                bat 'npm run build'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            script {
                // Show test + coverage summary right on the build in the dashboard
                def summary = bat(returnStdout: true, script: '@node scripts/ci-summary.js || echo Tests: no report').trim()
                currentBuild.description = summary
                echo "CI feedback -> ${currentBuild.currentResult}: ${summary}"
                env.CI_SUMMARY = summary
            }
        }

        success {
            echo 'Jenkins Pipeline completed successfully! All tests passed and build archived.'
        }

        unstable {
            echo 'Pipeline is UNSTABLE: some tests failed. Check the "Tests" tab for details.'
        }

        failure {
            echo 'Jenkins Pipeline failed! Check the failing stage and test results.'
            script { notify('FAILED') }
        }

        fixed {
            // Previous build was broken, this one is green again
            script { notify('FIXED') }
        }
    }
}

// Send an email if NOTIFY_EMAIL is set (uses Email Extension plugin + SMTP in Manage Jenkins > System)
def notify(String status) {
    if (!params.NOTIFY_EMAIL?.trim()) {
        echo "Email feedback skipped (NOTIFY_EMAIL not set). Status: ${status}"
        return
    }
    emailext(
        to: params.NOTIFY_EMAIL,
        subject: "[Jenkins] ${env.JOB_NAME} #${env.BUILD_NUMBER} ${status}",
        mimeType: 'text/html',
        body: """<p><b>${env.JOB_NAME} #${env.BUILD_NUMBER}: ${status}</b></p>
                 <p>${env.CI_SUMMARY ?: ''}</p>
                 <p>Console: <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a><br/>
                    Test results: <a href="${env.BUILD_URL}testReport">${env.BUILD_URL}testReport</a></p>""",
        attachLog: true
    )
}
