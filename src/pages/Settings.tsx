import React, { useState } from 'react';
import { Building2, Save, Globe, Shield, Users as UsersIcon, Settings as SettingsIcon } from 'lucide-react';
import { Card, Button, Input } from '../components/ui-base';
import Users from './Users';
import Roles from './Roles';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'org' | 'users' | 'roles'>('org');

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-border-base pb-8">
        <div>
          <h2 className="text-3xl font-black text-text-base tracking-tighter uppercase">Administration Hub</h2>
          <p className="text-text-muted text-sm font-medium">Manage your organization profile, team members, and security policies.</p>
        </div>
        
        <div className="flex bg-bg-base p-1 rounded-xl border border-border-base">
          <button 
            onClick={() => setActiveTab('org')}
            className={cn(
                "px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                activeTab === 'org' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-base"
            )}
          >
            Organization
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={cn(
                "px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                activeTab === 'users' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-base"
            )}
          >
            Team Members
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={cn(
                "px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                activeTab === 'roles' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-base"
            )}
          >
            Access Policies
          </button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === 'org' && (
          <div className="grid grid-cols-1 gap-10">
            {/* Company Profile */}
            <Card className="p-10 border border-border-base bg-white shadow-xl">
              <div className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest border-b border-border-base pb-4 mb-10">
                <Building2 size={16} />
                <span>Organization Identity</span>
              </div>

              <form className="space-y-10">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-40 h-40 rounded-2xl bg-bg-base flex items-center justify-center border border-border-base relative group overflow-hidden shadow-inner">
                      <Building2 size={48} className="text-text-muted opacity-20" />
                      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center">
                        <Button size="sm" variant="secondary" className="text-[10px] font-black uppercase tracking-widest h-8 px-4">Upload New</Button>
                        <p className="text-[9px] text-white font-bold leading-tight opacity-80 uppercase tracking-tighter">Square PNG/SVG preferred</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Legal Status Name</label>
                      <Input defaultValue="NextERP Solutions Ltd." className="font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Network Edge Slug</label>
                      <div className="relative">
                        <Input defaultValue="nexterp" readOnly className="bg-bg-base text-text-muted font-mono" />
                        <span className="absolute right-3 top-2.5 text-text-muted text-[10px] font-bold uppercase tracking-wider">.erp.com</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Primary Operations Email</label>
                      <Input type="email" defaultValue="hq@nexterp.io" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Global Support Line</label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-border-base">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Physical HQ Address</label>
                      <Input defaultValue="789 Enterprise Blvd, Suite 200" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Locality / City</label>
                        <Input defaultValue="San Francisco" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Digital Zip Code</label>
                        <Input defaultValue="94105" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Legal Jurisdiction</label>
                        <select className="flex h-10 w-full rounded-[0.375rem] border border-border-base bg-white px-3 py-2 text-sm font-bold focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all cursor-pointer">
                          <option selected>United States</option>
                          <option>European Union</option>
                          <option>Asia Pacific</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-border-base">
                  <Button className="gap-3 px-10 h-14 uppercase tracking-[0.2em] font-black text-xs shadow-lg">
                    <Save size={18} />
                    Commit Archive
                  </Button>
                </div>
              </form>
            </Card>

            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 flex items-start gap-6 shadow-sm">
                <div className="p-3 bg-white rounded-xl shadow-sm ring-1 ring-primary/10">
                    <Globe className="text-primary shrink-0" size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-black text-text-base uppercase tracking-widest mb-1 italic">Network Exposure Control</h4>
                    <p className="text-sm text-text-muted font-medium max-w-xl leading-relaxed">
                        Your public storefront is propagating via global edge nodes. The current endpoint is <span className="text-primary font-black underline cursor-pointer">nexterp.erp.com/store</span>.
                    </p>
                    <div className="mt-6">
                        <Button variant="outline" size="sm" className="bg-white border-primary/20 text-primary uppercase font-black tracking-widest h-10 px-6">Manage DNS Assets</Button>
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && <Users />}
        {activeTab === 'roles' && <Roles />}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

