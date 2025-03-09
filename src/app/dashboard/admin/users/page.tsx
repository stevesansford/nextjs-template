'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell, 
  TablePagination 
} from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Card from '@/components/ui/Card';
import { toast } from 'sonner';
import { UserRole } from '@/types/prisma';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Image from 'next/image';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  emailVerified: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    pages: 1,
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleteUserName, setDeleteUserName] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Convert fetchUsers to useCallback to avoid infinite loops
  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/admin/users?page=${page}&limit=${pagination.limit}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users. Please try again.');
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  // Fetch users on component mount and page change
  useEffect(() => {
    fetchUsers(pagination.page);
  }, [pagination.page, fetchUsers]);

  // Handle page change for pagination
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  // Open delete confirmation modal
  const confirmDelete = (user: User) => {
    setDeleteUserId(user.id);
    setDeleteUserName(user.name || user.email || 'Unknown user');
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const cancelDelete = () => {
    setDeleteUserId(null);
    setDeleteUserName(null);
    setIsDeleteModalOpen(false);
  };

  // Delete user
  const deleteUser = async () => {
    if (!deleteUserId) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: deleteUserId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }
      
      // Refresh user list
      toast.success('User deleted successfully');
      fetchUsers(pagination.page);
    } catch (err: unknown) {
      console.error('Error deleting user:', err);
      
      // Handle different error types safely
      let errorMessage = 'Failed to delete user';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      cancelDelete();
    }
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not verified';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <DashboardLayout
      title="User Management"
      description="View and manage user accounts"
      showBreadcrumbs={true}
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">User Management</h2>
              <p className="text-sm text-muted">Manage user accounts in your application</p>
            </div>
            <Button onClick={() => fetchUsers(pagination.page)}>Refresh</Button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email Verified</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      {loading ? 'Loading users...' : 'No users found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {user.image && (
                            <Image
                              src={user.image}
                              alt={user.name || 'User'}
                              className="h-8 w-8 rounded-full mr-3"
                              width={32}
                              height={32}
                            />
                          )}
                          <span>{user.name || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email || 'N/A'}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(user.emailVerified)}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => confirmDelete(user)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            {pagination.pages > 1 && (
              <TablePagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </Card>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={cancelDelete}
          title="Delete User"
        >
          <div className="p-6">
            <p className="mb-4">
              Are you sure you want to delete user <strong>{deleteUserName}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={cancelDelete} disabled={isDeleting}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={deleteUser}
                isLoading={isDeleting}
              >
                Delete User
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
} 