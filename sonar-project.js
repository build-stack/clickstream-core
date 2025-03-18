const scanner = require('sonarqube-scanner').default;

scanner({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectKey': 'clickstream-core',
    'sonar.projectName': 'Clickstream Core',
    'sonar.projectVersion': '1.0.0',
    'sonar.sources': 'src',
    'sonar.tests': 'src/__tests__',
    'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.testExecutionReportPaths': 'test-report.xml',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.exclusions': 'node_modules/**,dist/**,coverage/**,**/__tests__/**,jest.*.js'
  }
},
() => process.exit()); 