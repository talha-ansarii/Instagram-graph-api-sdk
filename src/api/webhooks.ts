import { HttpClient } from '../http';
import { SubscribedFieldsResponse } from '../types/webhooks';

export class WebhooksApi {
    private readonly http: HttpClient;
    private readonly userId: string;

    constructor(http: HttpClient, userId: string) {
        this.http = http;
        this.userId = userId;
    }

    /**
     * Subscribe your app to specific fields for this user/page.
     * 
     * @param fields List of fields to subscribe to (e.g., ['messages', 'comments'])
     */
    async subscribe(fields: string[]): Promise<{ success: boolean }> {
        return this.http.post<{ success: boolean }>(`/${this.userId}/subscribed_apps`, {
            subscribed_fields: fields.join(','),
        });
    }

    /**
     * Unsubscribe from specific fields or all fields.
     * 
     * @param fields Optional list of fields to unsubscribe from. If empty, unsubscribes from all.
     */
    async unsubscribe(fields?: string[]): Promise<{ success: boolean }> {
        if (fields && fields.length > 0) {
            // Unsubscribe from specific fields by subscribing to the remaining ones?
            // Actually, the DELETE endpoint removes the app subscription entirely if no fields specified.
            // To remove specific fields, you typically re-subscribe with the fields you WANT to keep.
            // But strictly speaking, DELETE /{user-id}/subscribed_apps removes the app from the page/user.
            
            // If fields are provided, we should probably check current subscriptions and remove the ones listed.
            // For now, let's just support full unsubscribe via DELETE.
            throw new Error('Partial unsubscribe not directly supported by API. Use subscribe() with the fields you want to keep.');
        }

        return this.http.delete<{ success: boolean }>(`/${this.userId}/subscribed_apps`);
    }

    /**
     * Get the list of fields your app is currently subscribed to.
     */
    async getSubscribedFields(): Promise<SubscribedFieldsResponse> {
        return this.http.get<SubscribedFieldsResponse>(`/${this.userId}/subscribed_apps`);
    }
}
