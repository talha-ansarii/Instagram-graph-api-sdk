/**
 * oEmbed API Module
 * 
 * Handles oEmbed operations for embedding Instagram content.
 */

import { HttpClient } from '../http';
import { OEMBED_ENDPOINTS } from '../endpoints';
import { OEmbedResponse, GetOEmbedOptions } from '../types/oembed';

/**
 * oEmbed API class for embedding Instagram content
 */
export class OEmbedApi {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get oEmbed data for an Instagram URL
   * @param options - URL and optional formatting options
   */
  async get(options: GetOEmbedOptions): Promise<OEmbedResponse> {
    return this.http.get<OEmbedResponse>(
      OEMBED_ENDPOINTS.GET,
      {
        url: options.url,
        maxwidth: options.maxwidth,
        hidecaption: options.hidecaption,
        omitscript: options.omitscript,
      }
    );
  }
}
