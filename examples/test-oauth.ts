/**
 * OAuth Flow Test Example
 * 
 * This example demonstrates the Instagram Business Login OAuth flow.
 * It creates a local server to handle the OAuth callback.
 * 
 * Usage:
 *   1. Ensure INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET are set in .env
 *   2. Run: npx tsx examples/test-oauth.ts
 *   3. Open the URL shown in the console
 *   4. Complete Instagram login
 *   5. The callback will exchange the code for a token
 */

import 'dotenv/config';
import * as http from 'http';
import { InstagramOAuth, InstagramClient } from '../src';

const APP_ID = process.env.INSTAGRAM_APP_ID;
const APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
const PORT = 3333;
// Use REDIRECT_URI from env (for ngrok) or default to localhost
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${PORT}/callback`;

if (!APP_ID || !APP_SECRET) {
  console.error('❌ Error: Please set INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET in .env file');
  process.exit(1);
}

// Store state for CSRF verification
let expectedState: string | null = null;

/**
 * Handle HTTP requests
 */
async function handleRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);

  if (url.pathname === '/') {
    // Home page - show the login link
    const state = crypto.randomUUID();
    expectedState = state;

    const authUrl = InstagramOAuth.buildAuthorizationUrl({
      clientId: APP_ID!,
      redirectUri: REDIRECT_URI,
      scopes: InstagramOAuth.getDefaultScopes(),
      state,
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Instagram OAuth Test</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
          a.btn { display: inline-block; padding: 12px 24px; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
          a.btn:hover { opacity: 0.9; }
          pre { background: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; }
          code { font-size: 14px; }
        </style>
      </head>
      <body>
        <h1>🔐 Instagram OAuth Test</h1>
        <p>Click the button below to start the Instagram Business Login flow:</p>
        <p><a href="${authUrl}" class="btn">Login with Instagram</a></p>
        <hr>
        <h3>Authorization URL:</h3>
        <pre><code>${authUrl}</code></pre>
        <h3>Requested Scopes:</h3>
        <ul>
          ${InstagramOAuth.getDefaultScopes().map(s => `<li>${s}</li>`).join('\n')}
        </ul>
      </body>
      </html>
    `);
  } else if (url.pathname === '/callback') {
    // OAuth callback
    console.log('\n📥 Received callback:', url.search);

    const params = InstagramOAuth.parseCallback(url.href);

    // Check for errors
    if (params.error) {
      console.error('❌ OAuth Error:', params.error);
      console.error('   Reason:', params.error_reason);
      console.error('   Description:', params.error_description);

      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>OAuth Error</title></head>
        <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>❌ OAuth Error</h1>
          <p><strong>Error:</strong> ${params.error}</p>
          <p><strong>Reason:</strong> ${params.error_reason || 'N/A'}</p>
          <p><strong>Description:</strong> ${params.error_description || 'N/A'}</p>
          <p><a href="/">← Try Again</a></p>
        </body>
        </html>
      `);
      return;
    }

    // Verify state (CSRF protection)
    if (params.state !== expectedState) {
      console.error('❌ State mismatch - possible CSRF attack');
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('State mismatch - possible CSRF attack');
      return;
    }

    if (!params.code) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('No authorization code received');
      return;
    }

    console.log('✅ Authorization code received');
    console.log('🔄 Exchanging code for token...\n');

    try {
      // Exchange code for tokens
      const startTime = Date.now();
      const tokens = await InstagramOAuth.exchangeCodeForToken({
        clientId: APP_ID!,
        clientSecret: APP_SECRET!,
        code: params.code,
        redirectUri: REDIRECT_URI,
      });
      const duration = Date.now() - startTime;

      console.log('✅ Token exchange successful!');
      console.log('   User ID:', tokens.user_id);
      console.log('   Token Type:', tokens.token_type);
      console.log('   Expires In:', Math.round(tokens.expires_in / 86400), 'days');
      console.log('   Duration:', duration, 'ms');
      console.log('');

      // Create client and test it
      console.log('🔌 Creating Instagram client...');
      const client = new InstagramClient({
        accessToken: tokens.access_token,
      });

      console.log('📱 Fetching user profile...');
      const profile = await client.auth.me('id,username,account_type,followers_count');
      console.log('✅ Profile:', JSON.stringify(profile, null, 2));

      // Calculate expiry date
      const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>OAuth Success</title>
          <style>
            body { font-family: system-ui, sans-serif; max-width: 700px; margin: 50px auto; padding: 20px; }
            .success { color: #22c55e; }
            pre { background: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 13px; }
            .token { word-break: break-all; }
            table { border-collapse: collapse; width: 100%; }
            th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
            th { background: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1 class="success">✅ OAuth Success!</h1>
          
          <h2>User Profile</h2>
          <table>
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>User ID</td><td>${profile.id}</td></tr>
            <tr><td>Username</td><td>@${profile.username}</td></tr>
            <tr><td>Account Type</td><td>${profile.account_type || 'N/A'}</td></tr>
            <tr><td>Followers</td><td>${profile.followers_count?.toLocaleString() || 'N/A'}</td></tr>
          </table>
          
          <h2>Token Info</h2>
          <table>
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>Token Type</td><td>${tokens.token_type}</td></tr>
            <tr><td>Expires</td><td>${expiresAt.toLocaleDateString()} (${Math.round(tokens.expires_in / 86400)} days)</td></tr>
            <tr><td>Exchange Time</td><td>${duration}ms</td></tr>
          </table>
          
          <h2>Access Token</h2>
          <pre class="token">${tokens.access_token}</pre>
          
          <h2>Usage in Code</h2>
          <pre>
import { InstagramClient } from 'instagram-graph-api-sdk';

const client = new InstagramClient({
  accessToken: '${tokens.access_token.substring(0, 20)}...',
});

const profile = await client.users.getProfile();
console.log(profile);
          </pre>
          
          <p style="margin-top: 30px; color: #666;">
            ⚠️ Copy this token to your .env file as INSTAGRAM_ACCESS_TOKEN to use with other examples.
          </p>
        </body>
        </html>
      `);

      console.log('\n🎉 OAuth flow completed successfully!');
      console.log('📋 Copy the access token from the browser to use in other examples.');
      console.log('\nPress Ctrl+C to stop the server.\n');
    } catch (error: any) {
      console.error('❌ Token exchange failed:', error.message);

      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Token Exchange Error</title></head>
        <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>❌ Token Exchange Failed</h1>
          <p><strong>Error:</strong> ${error.message}</p>
          <pre>${error.stack}</pre>
          <p><a href="/">← Try Again</a></p>
        </body>
        </html>
      `);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}

// Create server
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('');
  console.log('🚀 Instagram OAuth Test Server');
  console.log('================================');
  console.log('');
  console.log(`📍 Open this URL in your browser:`);
  console.log(`   http://localhost:${PORT}`);
  console.log('');
  console.log(`📍 Callback URL (configure in Meta App Dashboard):`);
  console.log(`   ${REDIRECT_URI}`);
  console.log('');
  console.log('Press Ctrl+C to stop the server.');
  console.log('');
});
