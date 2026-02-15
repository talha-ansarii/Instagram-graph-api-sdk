/**
 * Messenger Profile API Module
 * 
 * Handles Ice Breakers, Persistent Menu, and Sender Actions.
 */

import { HttpClient } from '../http';
import { MESSENGER_PROFILE_ENDPOINTS } from '../endpoints';
import {
  IceBreaker,
  IceBreakerQuestion,
  SetIceBreakersOptions,
  IceBreakersResponse,
  PersistentMenu,
  SetPersistentMenuOptions,
  SenderAction,
} from '../types/messengerProfile';
import { SuccessResponse } from '../types/common';

/**
 * Messenger Profile API class for managing ice breakers and persistent menu
 */
export class MessengerProfileApi {
  private readonly http: HttpClient;
  private readonly userId: string;

  constructor(http: HttpClient, userId: string) {
    this.http = http;
    this.userId = userId;
  }

  /**
   * Get current ice breakers
   */
  async getIceBreakers(): Promise<IceBreakersResponse> {
    return this.http.get<IceBreakersResponse>(
      MESSENGER_PROFILE_ENDPOINTS.PROFILE(this.userId),
      { fields: 'ice_breakers' }
    );
  }

  /**
   * Set ice breakers (FAQ questions)
   * @param iceBreakers - Ice breaker configurations (max 4 questions per locale)
   */
  async setIceBreakers(iceBreakers: IceBreaker[]): Promise<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      MESSENGER_PROFILE_ENDPOINTS.PROFILE(this.userId),
      {
        platform: 'instagram',
        ice_breakers: iceBreakers,
      }
    );
  }

  /**
   * Delete ice breakers
   */
  async deleteIceBreakers(): Promise<SuccessResponse> {
    return this.http.delete<SuccessResponse>(
      MESSENGER_PROFILE_ENDPOINTS.PROFILE(this.userId),
      { fields: ['ice_breakers'] }
    );
  }

  /**
   * Get persistent menu
   */
  async getPersistentMenu(): Promise<{ data: PersistentMenu[] }> {
    return this.http.get<{ data: PersistentMenu[] }>(
      MESSENGER_PROFILE_ENDPOINTS.PROFILE(this.userId),
      { fields: 'persistent_menu' }
    );
  }

  /**
   * Set persistent menu
   * @param menus - Persistent menu configurations
   */
  async setPersistentMenu(menus: PersistentMenu[]): Promise<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      MESSENGER_PROFILE_ENDPOINTS.PROFILE(this.userId),
      {
        platform: 'instagram',
        persistent_menu: menus,
      }
    );
  }

  /**
   * Delete persistent menu
   */
  async deletePersistentMenu(): Promise<SuccessResponse> {
    return this.http.delete<SuccessResponse>(
      MESSENGER_PROFILE_ENDPOINTS.PROFILE(this.userId),
      { fields: ['persistent_menu'] }
    );
  }
}
