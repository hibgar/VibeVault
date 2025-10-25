import { type User, type InsertUser, type Media, type InsertMedia } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllMedia(): Promise<Media[]>;
  getMediaById(id: string): Promise<Media | undefined>;
  createMedia(media: InsertMedia): Promise<Media>;
  updateMedia(id: string, media: Partial<InsertMedia>): Promise<Media | undefined>;
  deleteMedia(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private mediaItems: Map<string, Media>;

  constructor() {
    this.users = new Map();
    this.mediaItems = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllMedia(): Promise<Media[]> {
    return Array.from(this.mediaItems.values());
  }

  async getMediaById(id: string): Promise<Media | undefined> {
    return this.mediaItems.get(id);
  }

  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const id = randomUUID();
    const media: Media = { 
      id,
      title: insertMedia.title,
      type: insertMedia.type,
      year: insertMedia.year ?? null,
      coverUrl: insertMedia.coverUrl ?? null,
      vibes: insertMedia.vibes || []
    };
    this.mediaItems.set(id, media);
    return media;
  }

  async updateMedia(id: string, updates: Partial<InsertMedia>): Promise<Media | undefined> {
    const existing = this.mediaItems.get(id);
    if (!existing) return undefined;

    const updated: Media = {
      ...existing,
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.type !== undefined && { type: updates.type }),
      ...(updates.year !== undefined && { year: updates.year }),
      ...(updates.coverUrl !== undefined && { coverUrl: updates.coverUrl }),
      ...(updates.vibes !== undefined && { vibes: updates.vibes }),
    };
    this.mediaItems.set(id, updated);
    return updated;
  }

  async deleteMedia(id: string): Promise<boolean> {
    return this.mediaItems.delete(id);
  }
}

export const storage = new MemStorage();
