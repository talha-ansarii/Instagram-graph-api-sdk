export interface WebhookEntry {
    id: string;
    time: number;
    changes?: WebhookChange[];
    messaging?: WebhookMessagingEvent[];
}

export interface WebhookChange {
    field: 'comments' | 'live_comments' | 'mentions' | 'messages' | 'message_reactions' | 'messaging_seen';
    value: any;
}

export interface WebhookMessagingEvent {
    sender: { id: string };
    recipient: { id: string };
    timestamp: number;
    message?: {
        mid: string;
        text?: string;
        attachments?: any[];
        is_deleted?: boolean;
        is_echo?: boolean;
        reply_to?: { mid: string };
    };
    reaction?: {
        mid: string;
        action: 'react' | 'unreact';
        reaction: string;
        emoji: string;
    };
    read?: {
        mid: string;
    };
}

export interface WebhookPayload {
    object: 'instagram';
    entry: WebhookEntry[];
}

export interface SubscribedFieldsResponse {
    data: {
        link: string;
        name: string;
        id: string;
        category: string;
        subscribed_fields: string[];
    }[];
}
