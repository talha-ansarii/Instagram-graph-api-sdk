/**
 * Messenger Profile Types for Instagram Graph API SDK
 * (Ice Breakers, Persistent Menu, etc.)
 */

/**
 * Ice breaker question
 */
export interface IceBreakerQuestion {
  /** Question text shown to user */
  question: string;
  /** Payload sent back when clicked */
  payload: string;
}

/**
 * Ice breaker configuration
 */
export interface IceBreaker {
  /** Questions for this locale */
  call_to_actions: IceBreakerQuestion[];
  /** Locale code (e.g., 'en_US', 'zh_CN') */
  locale?: string;
}

/**
 * Set ice breakers options
 */
export interface SetIceBreakersOptions {
  /** Platform (always 'instagram') */
  platform: 'instagram';
  /** Ice breaker configurations */
  ice_breakers: IceBreaker[];
}

/**
 * Get ice breakers response
 */
export interface IceBreakersResponse {
  data: IceBreaker[];
}

/**
 * Persistent menu button
 */
export interface PersistentMenuButton {
  type: 'web_url' | 'postback';
  title: string;
  url?: string;
  payload?: string;
}

/**
 * Persistent menu configuration
 */
export interface PersistentMenu {
  /** Locale code */
  locale?: string;
  /** Whether to disable user input */
  composer_input_disabled?: boolean;
  /** Menu buttons */
  call_to_actions: PersistentMenuButton[];
}

/**
 * Set persistent menu options
 */
export interface SetPersistentMenuOptions {
  /** Platform (always 'instagram') */
  platform: 'instagram';
  /** Persistent menu configurations */
  persistent_menu: PersistentMenu[];
}

/**
 * Sender action type
 */
export type SenderAction = 'typing_on' | 'typing_off' | 'mark_seen';
