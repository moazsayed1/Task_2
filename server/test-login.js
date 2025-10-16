// Quick manual test for login endpoint
import dotenv from 'dotenv';
dotenv.config();

const testUser = {
  email: 'test@example.com',
  password: 'test123456'
};

async function testLogin() {
  try {
    // Test register first
    console.log('Testing register...');
    const registerRes = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: testUser.email,
        password: testUser.password
      })
    });
    
    const registerData = await registerRes.json();
    console.log('Register response:', registerRes.status, registerData);

    // Test login
    console.log('\nTesting login...');
    const loginRes = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    
    const loginData = await loginRes.json();
    console.log('Login response:', loginRes.status, loginData);

    if (loginRes.ok && loginData.token) {
      console.log('\n✅ Login successful!');
      console.log('Token:', loginData.token.substring(0, 20) + '...');
      console.log('User:', loginData.user);
    } else {
      console.log('\n❌ Login failed!');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testLogin();
