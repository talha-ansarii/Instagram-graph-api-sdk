/**
 * Publishing API Module
 * 
 * Handles content publishing operations.
 */

import { HttpClient } from '../http';
import { PUBLISHING_ENDPOINTS } from '../endpoints';
import {
  ContainerResponse,
  ContainerStatus,
  PublishResponse,
  CreateImageContainerOptions,
  CreateVideoContainerOptions,
  CreateCarouselContainerOptions,
  ResumableUploadOptions,
} from '../types/publishing';

/**
 * Publishing API class for content publishing operations
 */
export class PublishingApi {
  private readonly http: HttpClient;
  private readonly userId: string;

  constructor(http: HttpClient, userId: string) {
    this.http = http;
    this.userId = userId;
  }

  /**
   * Create an image container
   * @param options - Image URL and optional caption, location, tags
   */
  async createImageContainer(options: CreateImageContainerOptions): Promise<ContainerResponse> {
    return this.http.post<ContainerResponse>(
      PUBLISHING_ENDPOINTS.CREATE_CONTAINER(this.userId),
      {
        image_url: options.image_url,
        caption: options.caption,
        location_id: options.location_id,
        user_tags: options.user_tags ? JSON.stringify(options.user_tags) : undefined,
        collaborators: options.collaborators?.join(','),
        alt_text: options.alt_text,
        is_carousel_item: options.is_carousel_item,
      }
    );
  }

  /**
   * Create a video/reel/story container
   * @param options - Video URL, media type, and optional settings
   */
  async createVideoContainer(options: CreateVideoContainerOptions): Promise<ContainerResponse> {
    return this.http.post<ContainerResponse>(
      PUBLISHING_ENDPOINTS.CREATE_CONTAINER(this.userId),
      {
        video_url: options.video_url,
        media_type: options.media_type,
        caption: options.caption,
        location_id: options.location_id,
        user_tags: options.user_tags ? JSON.stringify(options.user_tags) : undefined,
        collaborators: options.collaborators?.join(','),
        share_to_feed: options.share_to_feed,
        is_carousel_item: options.is_carousel_item,
        cover_url: options.cover_url,
        thumb_offset: options.thumb_offset,
        audio_name: options.audio_name,
      }
    );
  }

  /**
   * Create a carousel container
   * @param options - Child container IDs and optional caption
   */
  async createCarouselContainer(options: CreateCarouselContainerOptions): Promise<ContainerResponse> {
    return this.http.post<ContainerResponse>(
      PUBLISHING_ENDPOINTS.CREATE_CONTAINER(this.userId),
      {
        media_type: 'CAROUSEL',
        children: options.children.join(','),
        caption: options.caption,
        location_id: options.location_id,
        collaborators: options.collaborators?.join(','),
      }
    );
  }

  /**
   * Create a resumable upload session
   * @param options - Media type and settings
   */
  async createResumableUpload(options: ResumableUploadOptions): Promise<ContainerResponse> {
    return this.http.post<ContainerResponse>(
      PUBLISHING_ENDPOINTS.CREATE_CONTAINER(this.userId),
      {
        media_type: options.media_type,
        upload_type: 'resumable',
        caption: options.caption,
        location_id: options.location_id,
        collaborators: options.collaborators?.join(','),
      }
    );
  }

  /**
   * Get container status
   * @param containerId - Container ID
   */
  async getContainerStatus(containerId: string): Promise<ContainerStatus> {
    return this.http.get<ContainerStatus>(
      PUBLISHING_ENDPOINTS.CONTAINER_STATUS(containerId),
      { fields: 'id,status_code,status' }
    );
  }

  /**
   * Publish a container
   * @param containerId - Container ID to publish
   */
  async publishContainer(containerId: string): Promise<PublishResponse> {
    return this.http.post<PublishResponse>(
      PUBLISHING_ENDPOINTS.PUBLISH(this.userId),
      { creation_id: containerId }
    );
  }

  /**
   * Wait for container to be ready, then publish
   * @param containerId - Container ID
   * @param maxAttempts - Maximum number of status checks (default: 30)
   * @param intervalMs - Interval between checks in ms (default: 2000)
   */
  async waitAndPublish(
    containerId: string,
    maxAttempts: number = 30,
    intervalMs: number = 2000
  ): Promise<PublishResponse> {
    for (let i = 0; i < maxAttempts; i++) {
      const status = await this.getContainerStatus(containerId);
      
      if (status.status_code === 'FINISHED') {
        return this.publishContainer(containerId);
      }
      
      if (status.status_code === 'ERROR' || status.status_code === 'EXPIRED') {
        throw new Error(`Container failed with status: ${status.status_code}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
    
    throw new Error('Container did not become ready in time');
  }
}
