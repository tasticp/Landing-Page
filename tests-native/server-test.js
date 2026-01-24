// Native Test Suite for Portfolio-Net
// Comprehensive testing for native Node.js implementation

import http from 'http';

class PortfolioNetTester {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.testResults = {
      passed: 0,
      failed: 0,
      total: 0
    };
  }

  async makeRequest(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    
    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Native-Test-Suite/1.0'
      }
    };

    if (options.data) {
      requestOptions.body = JSON.stringify(options.data);
    }

    try {
      const response = await fetch(url, requestOptions);
      
      return {
        status: response.status,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        data: await response.json(),
        url: url
      };
    } catch (error) {
      return {
        status: 0,
        error: error.message,
        url: url
      };
    }
  }

  async runTest(testName, testFunction) {
    console.log(`⏳ ${testName}`);
    
    try {
      const result = await testFunction();
      
      if (result.success) {
        console.log(`✅ ${testName}`);
        this.testResults.passed++;
      } else {
        console.log(`❌ ${testName}: ${result.message}`);
        this.testResults.failed++;
      }
      
      this.testResults.total++;
    } catch (error) {
      console.log(`💥 ${testName}: ${error.message}`);
      this.testResults.failed++;
      this.testResults.total++;
    }
  }

  async testServerAvailability() {
    return await this.runTest('Server Availability', async () => {
      const response = await this.makeRequest('/');
      return {
        success: response.status === 200,
        message: response.status === 200 ? 'Server responds correctly' : `Expected 200, got ${response.status}`
      };
    });
  }

  async testHealthEndpoint() {
    return await this.runTest('Health Check Endpoint', async () => {
      const response = await this.makeRequest('/api/health');
      
      const healthData = response.data;
      const isValidHealth = healthData.status === 'healthy' && 
                          healthData.dependencies === 0 &&
                          healthData.implementation === 'native' &&
                          healthData.security === 'maximum';
      
      return {
        success: response.ok && isValidHealth,
        message: isValidHealth ? 'Health endpoint reports optimal status' : 'Health check failed'
      };
    });
  }

  async testProjectsAPI() {
    return await this.runTest('Projects API', async () => {
      const response = await this.makeRequest('/api/projects');
      
      return {
        success: response.ok && Array.isArray(response.data.projects),
        message: response.ok ? 'Projects API working' : 'Projects API failed'
      };
    });
  }

  async testPostsAPI() {
    return await this.runTest('Posts API', async () => {
      const response = await this.makeRequest('/api/posts');
      
      return {
        success: response.ok && Array.isArray(response.data.posts),
        message: response.ok ? 'Posts API working' : 'Posts API failed'
      };
    });
  }

  async testStaticFileServing() {
    return await this.runTest('Static File Serving', async () => {
      const cssResponse = await this.makeRequest('/styles.css');
      const jsResponse = await this.makeRequest('/script.js');
      
      const cssSuccess = cssResponse.ok && cssResponse.headers.get('content-type').includes('text/css');
      const jsSuccess = jsResponse.ok && jsResponse.headers.get('content-type').includes('application/javascript');
      
      return {
        success: cssSuccess && jsSuccess,
        message: cssSuccess && jsSuccess ? 'Static files served correctly' : 'Static file serving failed'
      };
    });
  }

  async testCORSHeaders() {
    return await this.runTest('CORS Headers', async () => {
      const response = await this.makeRequest('/api/health');
      
      const hasCORS = response.headers.has('access-control-allow-origin') &&
                      response.headers.has('access-control-allow-methods') &&
                      response.headers.has('access-control-allow-headers');
      
      return {
        success: hasCORS,
        message: hasCORS ? 'CORS headers present' : 'CORS headers missing'
      };
    });
  }

  async testPerformance() {
    const startTime = Date.now();
    
    const response = await this.makeRequest('/');
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    const isPerformanceAcceptable = response.ok && responseTime < 500; // Should respond in under 500ms
    
    return await this.runTest('Performance Test', async () => {
      return {
        success: isPerformanceAcceptable,
        message: isPerformanceAcceptable 
          ? `Performance acceptable (${responseTime}ms)` 
          : `Performance too slow (${responseTime}ms)`
      };
    });
  }

  async testSecurity() {
    return await this.runTest('Security Check', async () => {
      // Test for dependency injection attempts
      const maliciousPayload = '<script>alert("xss")</script>';
      const response = await this.makeRequest('/api/test', {
        method: 'POST',
        data: { payload: maliciousPayload }
      });
      
      const isSecure = response.status === 400 || response.status === 422;
      
      return {
        success: isSecure,
        message: isSecure ? 'Security validation working' : 'Security vulnerability detected'
      };
    });
  }

  async runAllTests() {
    console.log('🧪 Starting Portfolio-Net Native Test Suite\n');
    console.log('📊 Testing Native Node.js Implementation\n');
    
    const startTime = Date.now();
    
    await this.testServerAvailability();
    await this.testHealthEndpoint();
    await this.testProjectsAPI();
    await this.testPostsAPI();
    await this.testStaticFileServing();
    await this.testCORSHeaders();
    await this.testPerformance();
    await this.testSecurity();
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${this.testResults.passed}`);
    console.log(`❌ Failed: ${this.testResults.failed}`);
    console.log(`📈 Total: ${this.testResults.total}`);
    console.log(`⏱️  Duration: ${duration}ms`);
    
    const successRate = ((this.testResults.passed / this.testResults.total) * 100).toFixed(1);
    console.log(`📈 Success Rate: ${successRate}%`);
    
    if (this.testResults.failed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! Native implementation is perfect!');
    } else {
      console.log(`\n⚠️  ${this.testResults.failed} tests failed. Review implementation.`);
    }
    
    return this.testResults.failed === 0;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new PortfolioNetTester();
  tester.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export default PortfolioNetTester;