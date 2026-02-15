/**
 * oEmbed Types for Instagram Graph API SDK
 */

/**
 * oEmbed response
 */
export interface OEmbedResponse {
  /** oEmbed version */
  version: string;
  /** oEmbed type */
  type: 'rich';
  /** Title (usually username) */
  title?: string;
  /** Author name */
  author_name?: string;
  /** Author URL */
  author_url?: string;
  /** Provider name */
  provider_name: 'Instagram';
  /** Provider URL */
  provider_url: string;
  /** HTML embed code */
  html: string;
  /** Embed width */
  width?: number;
  /** Embed height */
  height?: number | null;
  /** Thumbnail URL */
  thumbnail_url?: string;
  /** Thumbnail width */
  thumbnail_width?: number;
  /** Thumbnail height */
  thumbnail_height?: number;
}

/**
 * Get oEmbed options
 */
export interface GetOEmbedOptions {
  /** Instagram post URL */
  url: string;
  /** Maximum width */
  maxwidth?: number;
  /** Hide caption */
  hidecaption?: boolean;
  /** Omit script */
  omitscript?: boolean;
}
