// Native fetch implementation to avoid missing axios or @types/node errors
declare var process: any;

async function runTest() {
  const API_URL = "http://localhost:3000";
  const email = `test_change_pw_${Date.now()}@example.com`;
  const initialPassword = "oldSecurePassword123";
  const newPassword = "newSuperSecretPassword456";

  console.log("🚀 Starting Automated Test for Password Change & Session Revocation...");

  try {
    // 1. Register
    console.log(`\n1️⃣ Registering test user: ${email}...`);
    const regRes = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: initialPassword,
        name: "Test User",
      })
    });
    
    if (!regRes.ok) throw new Error(await regRes.text());
    console.log("   ✅ Registered successfully.");

    // 2. Login
    console.log(`\n2️⃣ Logging in with old password...`);
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: initialPassword,
      })
    });
    
    if (!loginRes.ok) throw new Error(await loginRes.text());
    
    const loginData = await loginRes.json();
    const accessToken = loginData.accessToken;
    const refreshToken = loginData.refreshToken;
    console.log("   ✅ Logged in successfully. Received Access & Refresh tokens.");

    // 3. Verify Refresh works before password change
    console.log(`\n3️⃣ Verifying refresh token works BEFORE password change...`);
    const refreshRes1 = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    });
    
    if (!refreshRes1.ok) throw new Error(await refreshRes1.text());
    console.log("   ✅ Refresh successful! Received an access token.");

    // 4. Change Password using Access Token
    console.log(`\n4️⃣ Changing password to a new one...`);
    const changePwRes = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}` 
      },
      body: JSON.stringify({ newPassword })
    });
    
    if (!changePwRes.ok) throw new Error(await changePwRes.text());
    const changeData = await changePwRes.json();
    console.log("   ✅ Password changed successfully. Message:", changeData.message);

    // 5. Verify Refresh token is now INVALIDATED due to password change
    console.log(`\n5️⃣ Attempting to use the OLD refresh token AFTER password change...`);
    const finalRefreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    });

    if (finalRefreshRes.status === 401) {
      const errorData = await finalRefreshRes.json();
      console.log(`   ✅ SUCCESS: Refresh token was successfully rejected! Error: ${errorData.error || "Session Revoked"}`);
    } else {
      console.error("   ❌ FAILED: Refresh token was accepted but should have been revoked!");
      process.exit(1);
    }

    console.log("\n🎉 ALL TESTS PASSED! The Session Revocation Defense works perfectly.");

  } catch (error: any) {
    console.error("\n❌ Test Failed:");
    console.error(error.message);
  }
}

runTest();
