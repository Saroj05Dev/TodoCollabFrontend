// TaskPage/data/mockData.js - Mock data for the component
export const mockTaskData = {
  _id: '1',
  title: 'Implement user authentication system',
  description: 'Create a secure authentication system with JWT tokens, password hashing, and role-based access control. Include login, logout, and password reset functionality.',
  priority: 'High',
  status: 'In Progress',
  createdBy: { 
    _id: '1', 
    name: 'John Doe', 
    fullName: 'John Doe', 
    email: 'john@example.com' 
  },
  assignedUser: { 
    _id: '2', 
    name: 'Sarah Johnson', 
    fullName: 'Sarah Johnson', 
    email: 'sarah@example.com' 
  },
  createdAt: new Date('2024-01-18T09:00:00Z'),
  lastModified: new Date('2024-01-20T10:30:00Z'),
  updatedAt: new Date('2024-01-20T10:30:00Z')
};

export const mockRecentActivities = [
  {
    id: '1',
    user: { name: 'Sarah Johnson' },
    action: 'updated',
    timestamp: new Date('2024-01-20T10:15:00Z')
  },
  {
    id: '2',
    user: { name: 'John Doe' },
    action: 'assigned',
    timestamp: new Date('2024-01-19T15:30:00Z')
  },
  {
    id: '3',
    user: { name: 'Mike Wilson' },
    action: 'commented',
    timestamp: new Date('2024-01-19T14:20:00Z')
  }
];