// AgriSathi CI pipeline (Declarative)
// Flow: Checkout -> Install -> Automated Tests -> Build -> Archive
// Trigger: GitHub webhook (push) -> ngrok -> Jenkins /github-webhook/ -> githubPush()
// Continuous feedback: commit status on GitHub, JUnit test trends, coverage report,
// build description, stage view / pipeline graph, and email on failure / recovery.

pipeline {
    // Run on any available agent (this Jenkins runs on Windows, so steps use `bat`)
    agent any

    parameters {
        string(name: 'NOTIFY_EMAIL', defaultValue: '',
               description: 'Email address for build feedback (leave empty to skip email)')
    }

    // Start a build as soon as GitHub sends a push webhook for this repo
    triggers {
        githubPush()
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
                script { setGitHubStatus('PENDING', 'Build and tests running on Jenkins') }
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
            script { setGitHubStatus('SUCCESS', env.CI_SUMMARY ?: 'All tests passed') }
        }

        unstable {
            echo 'Pipeline is UNSTABLE: some tests failed. Check the "Tests" tab for details.'
            script { setGitHubStatus('FAILURE', env.CI_SUMMARY ?: 'Some tests failed') }
        }

        failure {
            echo 'Jenkins Pipeline failed! Check the failing stage and test results.'
            script {
                setGitHubStatus('FAILURE', env.CI_SUMMARY ?: 'Pipeline failed')
                notify('FAILED')
            }
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

// Show the build result (pending / ✓ / ✗) next to the commit on GitHub.
// Uses the GitHub Server credential (PAT, Secret text) from Manage Jenkins > System > GitHub.
// Errors are ignored so a GitHub API problem never breaks the build itself.
def setGitHubStatus(String state, String message) {
    step([
        $class: 'GitHubCommitStatusSetter',
        reposSource: [$class: 'ManuallyEnteredRepositorySource',
                      url: 'https://github.com/shubhanksaxena2005-hub/DEVOPS-2026-CSE-13'],
        contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'Jenkins CI'],
        errorHandlers: [[$class: 'ShallowAnyErrorHandler']],
        statusResultSource: [$class: 'ConditionalStatusResultSource',
                             results: [[$class: 'AnyBuildResult', state: state, message: message]]]
    ])
}
