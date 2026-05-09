import React, { useState } from 'react';
import { Shield, Plus, Check, ChevronRight } from 'lucide-react';
import { Card, Button, Input, Badge, Modal } from '../components/ui-base';

const initialRoles = [
  { id: '1', name: 'Administrator', description: 'Full access to all modules and system settings.', users: 3, permissions: 48 },
  { id: '2', name: 'Sales Manager', description: 'Can manage products, view orders, and generate reports.', users: 8, permissions: 24 },
  { id: '3', name: 'Support Agent', description: 'Can view customer orders and update shipping status.', users: 15, permissions: 12 },
];

const permissionGroups = [
  {
    title: 'User Management',
    perms: ['View Users', 'Create Users', 'Edit Users', 'Delete Users', 'Manage User Roles']
  },
  {
    title: 'Roles & Permissions',
    perms: ['View Roles', 'Create Roles', 'Edit Roles', 'Delete Roles', 'Assign Permissions']
  },
  {
    title: 'Product Management',
    perms: ['View Products', 'Create Products', 'Edit Products', 'Delete Products', 'Manage Inventory']
  },
  {
    title: 'Order Management',
    perms: ['View Orders', 'Edit Orders', 'Ship Orders', 'Cancel Orders', 'Process Refunds']
  }
];

export default function Roles() {
  const [roles] = useState(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const openPermissions = (role: any) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-text-base tracking-tighter uppercase">Permissions</h2>
          <p className="text-text-muted text-sm font-medium">Define what users can see and do within the application.</p>
        </div>
        <Button className="gap-2 h-12 px-6 uppercase tracking-widest font-black text-xs">
          <Plus size={16} />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roles.map((role) => (
          <Card key={role.id} className="p-10 flex flex-col h-full group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <Shield size={24} />
              </div>
              <h3 className="font-black text-xl text-text-base tracking-tight">{role.name}</h3>
            </div>
            
            <p className="text-sm text-text-muted mb-8 flex-1 leading-relaxed">{role.description}</p>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-text-muted tracking-widest mb-1">Users</span>
                <span className="text-sm font-bold text-text-base">{role.users} Members</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] uppercase font-black text-text-muted tracking-widest mb-1">Rules</span>
                <span className="text-sm font-bold text-text-base">{role.permissions} Active</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 text-xs font-black uppercase tracking-widest gap-2 bg-bg-base border-transparent group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm" onClick={() => openPermissions(role)}>
              Edit Permissions
              <ChevronRight size={14} />
            </Button>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Permissions: ${selectedRole?.name}`}
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-500 mb-4">Assign specific permissions to this role. Some changes may require users to re-login.</p>
          
          {permissionGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 border-b pb-1">{group.title}</h4>
              <div className="space-y-2">
                {group.perms.map((perm) => (
                  <label key={perm} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      defaultChecked={selectedRole?.name === 'Administrator' || Math.random() > 0.4}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                    />
                    <span className="text-sm text-gray-700">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-6 border-t mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Update Permissions</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
