/**
 * Comment Types for Instagram Graph API SDK
 */

/**
 * Instagram Comment
 */
export interface IGComment {
  /** Comment ID */
  id: string;
  /** Comment text */
  text?: string;
  /** Username of commenter */
  username?: string;
  /** ISO 8601 timestamp */
  timestamp?: string;
  /** Like count */
  like_count?: number;
  /** Is comment hidden */
  hidden?: boolean;
  /** User who posted the comment */
  from?: {
    id: string;
    username?: string;
  };
  /** Media this comment is on */
  media?: {
    id: string;
  };
  /** Parent comment (for replies) */
  parent_id?: string;
  /** Replies to this comment */
  replies?: {
    data: IGComment[];
  };
}

/**
 * Available fields for IGComment
 */
export const IG_COMMENT_FIELDS = [
  'id',
  'text',
  'username',
  'timestamp',
  'like_count',
  'hidden',
  'from',
  'media',
  'parent_id',
  'replies',
] as const;

export type IGCommentField = (typeof IG_COMMENT_FIELDS)[number];

/**
 * Get comments options
 */
export interface GetCommentsOptions {
  fields?: IGCommentField[];
  limit?: number;
  after?: string;
}

/**
 * Reply to comment options
 */
export interface ReplyToCommentOptions {
  message: string;
}

/**
 * Update comment options (hide/unhide)
 */
export interface UpdateCommentOptions {
  hide: boolean;
}
