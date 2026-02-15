/**
 * Test SDK with real Instagram credentials
 * 
 * Usage:
 *   1. Copy .env.example to .env
 *   2. Add your Instagram access token to .env
 *   3. Run: npx tsx examples/test-live.ts
 */

import 'dotenv/config';
import { InstagramClient } from '../src';

// Load from .env file
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

if (!ACCESS_TOKEN || ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE') {
  console.error('❌ Error: Please set INSTAGRAM_ACCESS_TOKEN in .env file');
  console.error('');
  console.error('To get a token:');
  console.error('1. Go to https://developers.facebook.com/tools/explorer/');
  console.error('2. Select your Instagram App');
  console.error('3. Click "Get User Access Token"');
  console.error('4. Select instagram_business_basic permission');
  console.error('5. Click "Generate Access Token"');
  console.error('6. Copy the token to your .env file');
  process.exit(1);
}

async function main() {
  console.log('🔌 Creating Instagram client...\n');
  
  const client = new InstagramClient({
    accessToken: ACCESS_TOKEN!,
    apiVersion: 'v22.0',
  });

  try {
    // Test 1: Get current user profile
    console.log('📱 Test 1: Getting user profile...');
    const profile = await client.auth.me('id,username,account_type,media_count,followers_count');
    console.log('✅ Profile:', profile);
    console.log('');

    // Test 2: Get user media
    console.log('📷 Test 2: Getting recent media...');
    const media = await client.users.getMedia({
      limit: 5,
      fields: ['id', 'caption', 'media_type', 'permalink', 'timestamp'],
    });
    console.log(`✅ Found ${media.data.length} media items`);
    media.data.forEach((item, i) => {
      console.log(`   ${i + 1}. [${item.media_type}] ${item.caption?.substring(0, 50) || 'No caption'}...`);
    });
    console.log('');

    // Test 3: Get content publishing limit
    console.log('📊 Test 3: Checking content publishing limit...');
    const limit = await client.users.getContentPublishingLimit();
    console.log('✅ Publishing limit:', limit);
    console.log('');

    // Test 4: Get conversations (if messaging is enabled)
    console.log('💬 Test 4: Getting conversations...');
    try {
      const conversations = await client.conversations.list({ limit: 5 });
      console.log(`✅ Found ${conversations.data.length} conversations`);
    } catch (error: any) {
      console.log('⚠️  Conversations not accessible (permission may not be granted)');
    }
    console.log('');

    console.log('🎉 All tests completed successfully!');
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.code) {
      console.error('   Error code:', error.code);
    }
    if (error.type) {
      console.error('   Error type:', error.type);
    }
    process.exit(1);
  }
}

main();
