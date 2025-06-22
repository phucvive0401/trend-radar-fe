export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'account_owner' | 'analyst' | 'viewer';
  avatar?: string;
  lastLogin?: Date;
}

export interface Permission {
  canViewDashboard: boolean;
  canViewAnalytics: boolean;
  canExport: boolean;
  canManageUsers: boolean;
  canManageIntegrations: boolean;
  canSchedulePosts: boolean;
  canEditReports: boolean;
  canManageBilling: boolean;
}

export const getRolePermissions = (role: User['role']): Permission => {
  switch (role) {
    case 'admin':
      return {
        canViewDashboard: true,
        canViewAnalytics: true,
        canExport: true,
        canManageUsers: true,
        canManageIntegrations: true,
        canSchedulePosts: true,
        canEditReports: true,
        canManageBilling: true,
      };
    case 'account_owner':
      return {
        canViewDashboard: true,
        canViewAnalytics: true,
        canExport: true,
        canManageUsers: true,
        canManageIntegrations: true,
        canSchedulePosts: true,
        canEditReports: true,
        canManageBilling: true,
      };
    case 'analyst':
      return {
        canViewDashboard: true,
        canViewAnalytics: true,
        canExport: true,
        canManageUsers: false,
        canManageIntegrations: false,
        canSchedulePosts: true,
        canEditReports: true,
        canManageBilling: false,
      };
    case 'viewer':
      return {
        canViewDashboard: true,
        canViewAnalytics: true,
        canExport: false,
        canManageUsers: false,
        canManageIntegrations: false,
        canSchedulePosts: false,
        canEditReports: false,
        canManageBilling: false,
      };
  }
};

// Mock user for demo
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'account_owner',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face',
  lastLogin: new Date(),
};