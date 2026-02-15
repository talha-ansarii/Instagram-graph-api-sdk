/**
 * Test sending a message to a user
 * 
 * IMPORTANT: Instagram API messaging requires:
 * 1. The recipient's IGSID (Instagram-scoped user ID), NOT username
 * 2. The user must have messaged your business account first
 * 3. Message must be sent within 24 hours of their last message (or use HUMAN_AGENT tag for 7 days)
 * 
 * Usage: npx tsx examples/test-send-message.ts
 */

import 'dotenv/config';
import { InstagramClient } from '../src';

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.error('❌ Error: Please set INSTAGRAM_ACCESS_TOKEN in .env file');
  process.exit(1);
}

async function main() {
  console.log('\n📨 Instagram Messaging Test\n');

  const client = new InstagramClient({
    accessToken: ACCESS_TOKEN!,
  });

  // First, let's get the user profile
  console.log('1. Getting current user profile...');
  const profile = await client.auth.me('id,username');
  console.log(`   Logged in as: @${profile.username} (ID: ${profile.id})\n`);

  // Check for existing conversations
  console.log('2. Checking for existing conversations...');
  const conversations = await client.conversations.list({ limit: 10 });
  
  if (conversations.data.length === 0) {
    console.log('   ❌ No conversations found.');
    console.log('');
    console.log('   ⚠️  To send a message, the recipient must have messaged your');
    console.log('      business account first. This is an Instagram API limitation.');
    console.log('');
    console.log('   To test messaging:');
    console.log('   1. Have someone DM @talhanadeem1826 on Instagram');
    console.log('   2. Run this script again');
    console.log('   3. Select the conversation to reply to');
    return;
  }

  console.log(`   Found ${conversations.data.length} conversations:\n`);

  // Get details for each conversation
  for (const conv of conversations.data) {
    try {
      const details = await client.conversations.getMessages(conv.id);
      const lastMessage = details.messages?.data?.[0];
      console.log(`   - Conversation ${conv.id}`);
      if (lastMessage) {
        console.log(`     Last message: "${lastMessage.message?.substring(0, 50) || 'N/A'}..."`);
      }
    } catch (e: any) {
      console.log(`   - Conversation ${conv.id}: Unable to fetch details`);
    }
  }

  // If we have conversations, try to send a message to the first one
  console.log('\n3. Attempting to send message to first conversation...');
  
  const firstConv = conversations.data[0];
  
  try {
    // We need the participant's IGSID from the conversation
    // Note: This is a simplified example - in production you'd want to properly
    // extract the participant ID from the conversation
    
    console.log(`   Sending to conversation: ${firstConv.id}`);
    
    // Unfortunately, without the participant's IGSID, we can't send directly
    // The conversation API returns conversation IDs, but we need participant IDs
    
    console.log('');
    console.log('   ⚠️  Note: To send a message, you need the participant\'s IGSID.');
    console.log('      This is obtained when they first message you (via webhooks).');
    console.log('');
    console.log('   For now, you can test messaging by:');
    console.log('   1. Setting up a webhook to receive incoming messages');
    console.log('   2. Capturing the sender\'s IGSID from the webhook payload');
    console.log('   3. Using client.messaging.sendText(igsid, "Hello!")');
    
  } catch (error: any) {
    console.error(`   ❌ Error: ${error.message}`);
  }
}

main().catch(console.error);
