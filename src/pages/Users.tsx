import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Shield } from 'lucide-react';
import { Card, Button, Input, Badge, Modal } from '../components/ui-base';

const initialUsers = [
  { id: '1', name: 'Prakash Sharma', email: 'prakash@example.com', phone: '+91 9876543210', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 (555) 123-4567', role: 'Sales', status: 'Active' },
  { id: '3', name: 'David Chen', email: 'david@example.com', phone: '+1 (555) 987-6543', role: 'Support', status: 'Inactive' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena@example.com', phone: '+1 (555) 456-7890', role: 'Manager', status: 'Active' },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-text-base tracking-tighter uppercase">Users</h2>
          <p className="text-text-muted text-sm font-medium">Manage your company employees and their access.</p>
        </div>
        <Button onClick={handleCreate} className="gap-2 h-12 px-6 uppercase tracking-widest font-black text-xs">
          <Plus size={16} />
          Add Employee
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border-base bg-white">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-3 text-text-muted" />
            <Input 
              placeholder="Search by name, email or role..." 
              className="pl-10 h-11 bg-bg-base border-transparent focus:bg-white focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Staff Member</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Access Level</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Contact</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base">Status</th>
                <th className="px-6 py-4 bg-bg-base text-[10px] uppercase font-bold text-text-muted tracking-wider border-b border-border-base text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors border-b border-border-base last:border-0 text-text-base">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-black text-primary text-sm uppercase">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-text-base leading-tight">{user.name}</p>
                        <p className="text-text-muted text-xs font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.role === 'Admin' ? 'info' : 'default'} className="inline-flex items-center">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-text-muted">{user.phone}</td>
                  <td className="px-6 py-4">
                    <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(user)} className="hover:text-primary">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-danger hover:bg-danger/10" onClick={() => handleDelete(user.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingUser ? 'Edit User' : 'Create New User'}
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-semibold">Full Name</label>
              <Input defaultValue={editingUser?.name} placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Email Address</label>
              <Input type="email" defaultValue={editingUser?.email} placeholder="john@company.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Phone Number</label>
              <Input defaultValue={editingUser?.phone} placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Role</label>
              <select className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <option selected={editingUser?.role === 'Admin'}>Admin</option>
                <option selected={editingUser?.role === 'Sales'}>Sales</option>
                <option selected={editingUser?.role === 'Support'}>Support</option>
                <option selected={editingUser?.role === 'Manager'}>Manager</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Status</label>
              <select className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <option selected={editingUser?.status === 'Active'}>Active</option>
                <option selected={editingUser?.status === 'Inactive'}>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingUser ? 'Save Changes' : 'Create User'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
