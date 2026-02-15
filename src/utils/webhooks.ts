import crypto from 'crypto';
import { WebhookPayload } from '../types/webhooks';

export class InstagramWebhooks {
    /**
     * Verify that the webhook request came from Meta.
     * Calculates SHA256 HMAC of the raw body using the App Secret.
     * 
     * @param body Raw request body as string
     * @param signature Signature from X-Hub-Signature-256 header (e.g., "sha256=...")
     * @param appSecret Your Instagram App Secret
     * @returns true if signature is valid
     */
    static verifySignature(body: string, signature: string, appSecret: string): boolean {
        if (!signature || !signature.startsWith('sha256=')) {
            return false;
        }

        const expectedSignature = 'sha256=' + crypto
            .createHmac('sha256', appSecret)
            .update(body)
            .digest('hex');

        // Timing-safe comparison
        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        );
    }

    /**
     * Type guard and parser for webhook payloads.
     * 
     * @param body Parsed JSON body
     * @returns Typed WebhookPayload or throws error
     */
    static parsePayload(body: any): WebhookPayload {
        if (body?.object !== 'instagram' || !Array.isArray(body?.entry)) {
            throw new Error('Invalid Instagram webhook payload');
        }
        return body as WebhookPayload;
    }
}
