/**
 * Comprehensive SDK Endpoint Test
 * 
 * Tests all available SDK endpoints with a live Instagram account.
 * 
 * Usage:
 *   1. Ensure INSTAGRAM_ACCESS_TOKEN is set in .env
 *   2. Run: npx tsx examples/test-all-endpoints.ts
 * 
 * Note: Some endpoints may fail if:
 *   - The account doesn't have the required permissions
 *   - There's no data (e.g., no comments, no conversations)
 *   - Rate limits are hit
 */

import 'dotenv/config';
import { InstagramClient, InstagramOAuth } from '../src';

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.error('❌ Error: Please set INSTAGRAM_ACCESS_TOKEN in .env file');
  process.exit(1);
}

// Test result tracking
interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'skip';
  message?: string;
  data?: any;
}

const results: TestResult[] = [];

function logTest(name: string, status: 'pass' | 'fail' | 'skip', message?: string, data?: any) {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⏭️';
  console.log(`${icon} ${name}${message ? `: ${message}` : ''}`);
  results.push({ name, status, message, data });
}

async function testWithCatch(name: string, fn: () => Promise<any>, skipCondition?: () => boolean) {
  if (skipCondition && skipCondition()) {
    logTest(name, 'skip', 'Skipped due to missing prerequisites');
    return null;
  }
  
  try {
    const result = await fn();
    logTest(name, 'pass', undefined, result);
    return result;
  } catch (error: any) {
    logTest(name, 'fail', error.message);
    return null;
  }
}

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🔬 Instagram SDK - Comprehensive Endpoint Test');
  console.log('='.repeat(60) + '\n');

  const client = new InstagramClient({
    accessToken: ACCESS_TOKEN!,
    apiVersion: 'v22.0',
  });

  // Store IDs for subsequent tests
  let userId: string | null = null;
  let mediaId: string | null = null;
  let commentId: string | null = null;

  // ============================================
  // 1. OAUTH (Static Methods)
  // ============================================
  console.log('\n📦 Module: InstagramOAuth (Static)\n' + '-'.repeat(40));

  await testWithCatch('OAuth.buildAuthorizationUrl', async () => {
    const url = InstagramOAuth.buildAuthorizationUrl({
      clientId: 'test-app-id',
      redirectUri: 'https://example.com/callback',
      scopes: ['instagram_business_basic'],
      state: 'test-state',
    });
    console.log(`   URL: ${url.substring(0, 80)}...`);
    return url;
  });

  await testWithCatch('OAuth.getDefaultScopes', async () => {
    const scopes = InstagramOAuth.getDefaultScopes();
    console.log(`   Scopes: ${scopes.join(', ')}`);
    return scopes;
  });

  await testWithCatch('OAuth.getAllScopes', async () => {
    const scopes = InstagramOAuth.getAllScopes();
    console.log(`   All Scopes: ${scopes.join(', ')}`);
    return scopes;
  });

  await testWithCatch('OAuth.parseCallback', async () => {
    const params = InstagramOAuth.parseCallback('https://example.com/callback?code=abc123&state=test#_');
    console.log(`   Parsed: code=${params.code}, state=${params.state}`);
    return params;
  });

  // ============================================
  // 2. AUTH API
  // ============================================
  console.log('\n📦 Module: client.auth\n' + '-'.repeat(40));

  const profile = await testWithCatch('auth.me', async () => {
    const result = await client.auth.me('id,username,account_type,followers_count');
    userId = result.id;
    console.log(`   User: @${result.username} (${result.account_type})`);
    return result;
  });

  await testWithCatch('auth.refreshToken', async () => {
    // This will fail if token is less than 24 hours old
    const result = await client.auth.refreshToken();
    console.log(`   New token expires in: ${result.expires_in} seconds`);
    return result;
  });

  // ============================================
  // 3. USERS API
  // ============================================
  console.log('\n📦 Module: client.users\n' + '-'.repeat(40));

  await testWithCatch('users.getProfile', async () => {
    const result = await client.users.getProfile({
      fields: ['id', 'username', 'biography', 'profile_picture_url'],
    });
    console.log(`   Profile: @${result.username}`);
    return result;
  });

  const mediaList = await testWithCatch('users.getMedia', async () => {
    const result = await client.users.getMedia({
      limit: 5,
      fields: ['id', 'caption', 'media_type', 'timestamp'],
    });
    mediaId = result.data[0]?.id || null;
    console.log(`   Found ${result.data.length} media items`);
    return result;
  });

  await testWithCatch('users.getStories', async () => {
    const result = await client.users.getStories();
    console.log(`   Found ${result.data?.length || 0} stories`);
    return result;
  });

  await testWithCatch('users.getContentPublishingLimit', async () => {
    const result = await client.users.getContentPublishingLimit();
    // The result structure varies by API version
    console.log(`   Publishing limit retrieved`);
    return result;
  });

  // ============================================
  // 4. MEDIA API
  // ============================================
  console.log('\n📦 Module: client.media\n' + '-'.repeat(40));

  await testWithCatch('media.get', async () => {
    if (!mediaId) throw new Error('No media ID available');
    const result = await client.media.get(mediaId, {
      fields: ['id', 'caption', 'media_type', 'permalink'],
    });
    console.log(`   Media: ${result.media_type} - ${result.permalink}`);
    return result;
  }, () => !mediaId);

  const comments = await testWithCatch('media.getComments', async () => {
    if (!mediaId) throw new Error('No media ID available');
    const result = await client.media.getComments(mediaId, { limit: 5 });
    commentId = result.data[0]?.id || null;
    console.log(`   Found ${result.data.length} comments`);
    return result;
  }, () => !mediaId);

  await testWithCatch('media.getChildren (carousel)', async () => {
    if (!mediaId) throw new Error('No media ID available');
    const result = await client.media.getChildren(mediaId);
    console.log(`   Children: ${result.data?.length || 0}`);
    return result;
  }, () => !mediaId);

  // ============================================
  // 5. COMMENTS API
  // ============================================
  console.log('\n📦 Module: client.comments\n' + '-'.repeat(40));

  await testWithCatch('comments.get', async () => {
    if (!commentId) throw new Error('No comment ID available');
    const result = await client.comments.get(commentId);
    console.log(`   Comment: "${result.text?.substring(0, 50)}..."`);
    return result;
  }, () => !commentId);

  await testWithCatch('comments.getReplies', async () => {
    if (!commentId) throw new Error('No comment ID available');
    const result = await client.comments.getReplies(commentId);
    console.log(`   Replies: ${result.data?.length || 0}`);
    return result;
  }, () => !commentId);

  // Note: Not testing hide/delete/reply to avoid modifying data

  // ============================================
  // 6. HASHTAGS API
  // ============================================
  console.log('\n📦 Module: client.hashtags\n' + '-'.repeat(40));

  let hashtagId: string | null = null;

  await testWithCatch('hashtags.search', async () => {
    if (!userId) throw new Error('No user ID available');
    const result = await client.hashtags.search({
      user_id: userId,
      q: 'instagram',
    });
    hashtagId = result.data[0]?.id || null;
    console.log(`   Found hashtag ID: ${hashtagId}`);
    return result;
  }, () => !userId);

  await testWithCatch('hashtags.get', async () => {
    if (!hashtagId) throw new Error('No hashtag ID available');
    const result = await client.hashtags.get(hashtagId);
    console.log(`   Hashtag: #${result.name}`);
    return result;
  }, () => !hashtagId);

  await testWithCatch('hashtags.getRecentMedia', async () => {
    if (!hashtagId || !userId) throw new Error('No hashtag or user ID available');
    const result = await client.hashtags.getRecentMedia(hashtagId, { 
      user_id: userId,
      limit: 3 
    });
    console.log(`   Recent media: ${result.data?.length || 0}`);
    return result;
  }, () => !hashtagId || !userId);

  // ============================================
  // 7. INSIGHTS API
  // ============================================
  console.log('\n📦 Module: client.insights\n' + '-'.repeat(40));

  await testWithCatch('insights.getAccountInsights', async () => {
    const result = await client.insights.getAccountInsights({
      metric: ['reach', 'profile_views'],
      period: 'day',
    });
    console.log(`   Insights: ${result.data?.length || 0} metrics`);
    return result;
  });

  await testWithCatch('insights.getMediaInsights', async () => {
    if (!mediaId) throw new Error('No media ID available');
    const result = await client.insights.getMediaInsights(mediaId, {
      metric: ['likes', 'comments', 'shares'],
    });
    console.log(`   Media insights: ${result.data?.length || 0} metrics`);
    return result;
  }, () => !mediaId);

  // ============================================
  // 8. CONVERSATIONS API
  // ============================================
  console.log('\n📦 Module: client.conversations\n' + '-'.repeat(40));

  let conversationId: string | null = null;

  const convos = await testWithCatch('conversations.list', async () => {
    const result = await client.conversations.list({ limit: 5 });
    conversationId = result.data[0]?.id || null;
    console.log(`   Found ${result.data.length} conversations`);
    return result;
  });

  await testWithCatch('conversations.getMessages', async () => {
    if (!conversationId) throw new Error('No conversation ID available');
    const result = await client.conversations.getMessages(conversationId);
    console.log(`   Messages: ${result.messages?.data?.length || 0}`);
    return result;
  }, () => !conversationId);

  await testWithCatch('conversations.getMessage', async () => {
    // Skip - need actual message ID
    throw new Error('No message ID available for testing');
  }, () => true);

  // ============================================
  // 9. MESSAGING API (Read-only tests)
  // ============================================
  console.log('\n📦 Module: client.messaging\n' + '-'.repeat(40));

  console.log('   ⚠️  Skipping message send tests (would send real messages)');
  logTest('messaging.sendText', 'skip', 'Skipped to avoid sending real messages');
  logTest('messaging.sendMedia', 'skip', 'Skipped to avoid sending real messages');
  logTest('messaging.sendQuickReplies', 'skip', 'Skipped to avoid sending real messages');

  // ============================================
  // 10. WELCOME FLOWS API
  // ============================================
  console.log('\n📦 Module: client.welcomeFlows\n' + '-'.repeat(40));

  await testWithCatch('welcomeFlows.list', async () => {
    const result = await client.welcomeFlows.list();
    console.log(`   Found ${result.data?.length || 0} welcome flows`);
    return result;
  });

  // ============================================
  // 11. MESSENGER PROFILE API
  // ============================================
  console.log('\n📦 Module: client.messengerProfile\n' + '-'.repeat(40));

  await testWithCatch('messengerProfile.getIceBreakers', async () => {
    const result = await client.messengerProfile.getIceBreakers();
    console.log(`   Ice breakers: ${result.data?.length || 0}`);
    return result;
  });

  await testWithCatch('messengerProfile.getPersistentMenu', async () => {
    const result = await client.messengerProfile.getPersistentMenu();
    console.log(`   Persistent menu items: ${result.data?.length || 0}`);
    return result;
  });

  // ============================================
  // 12. PUBLISHING API (Read-only tests)
  // ============================================
  console.log('\n📦 Module: client.publishing\n' + '-'.repeat(40));

  console.log('   ⚠️  Skipping publish tests (would create real content)');
  logTest('publishing.createImageContainer', 'skip', 'Skipped to avoid creating content');
  logTest('publishing.createVideoContainer', 'skip', 'Skipped to avoid creating content');
  logTest('publishing.publish', 'skip', 'Skipped to avoid creating content');

  // ============================================
  // 13. OEMBED API
  // ============================================
  console.log('\n📦 Module: client.oembed\n' + '-'.repeat(40));

  console.log('   ⚠️  oEmbed requires app token (different auth), skipping');
  logTest('oembed.get', 'skip', 'Requires app token instead of user token');

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Summary');
  console.log('='.repeat(60) + '\n');

  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const skipped = results.filter(r => r.status === 'skip').length;
  const total = results.length;

  console.log(`   ✅ Passed:  ${passed}`);
  console.log(`   ❌ Failed:  ${failed}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   📊 Total:   ${total}`);
  console.log('');

  if (failed > 0) {
    console.log('Failed tests:');
    results.filter(r => r.status === 'fail').forEach(r => {
      console.log(`   ❌ ${r.name}: ${r.message}`);
    });
    console.log('');
  }

  const successRate = ((passed / (total - skipped)) * 100).toFixed(1);
  console.log(`Success rate: ${successRate}% (excluding skipped)`);
  console.log('');
}

main().catch(console.error);
