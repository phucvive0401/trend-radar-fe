import { NotificationData } from '@/types';

export class NotificationService {
  private static instance: NotificationService;
  private notifications: NotificationData[] = [];

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public getNotifications(): NotificationData[] {
    return this.notifications;
  }

  public markAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  public markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }

  public addNotification(notification: Omit<NotificationData, 'id'>): void {
    const newNotification: NotificationData = {
      ...notification,
      id: Date.now(),
    };
    this.notifications.unshift(newNotification);
  }

  public getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  public filterNotifications(filter: string): NotificationData[] {
    if (filter === 'all') return this.notifications;
    if (filter === 'unread') return this.notifications.filter(n => !n.read);
    return this.notifications.filter(n => n.type === filter);
  }
}