import { User, Bell, Shield, Globe, Save } from 'lucide-react';

const SettingsSection = ({ title, description, children }) => (
  <section className="bg-[#121214] border border-[#1f1f23] rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col gap-6">
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
    <div className="pt-2">
      {children}
    </div>
  </section>
);

const InputGroup = ({ label, type = "text", placeholder }) => (
  <div className="flex flex-col gap-2 mb-5 last:mb-0">
    <label className="text-sm font-medium text-zinc-300">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-[#0b0b0c] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5 text-sm transition-all focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655]/50 focus:shadow-[0_0_10px_rgba(255,70,85,0.3)] placeholder:text-zinc-600"
    />
  </div>
);

const Settings = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-[32px] font-bold text-white tracking-tight">Settings</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ff4655] to-[#ff6a75] text-white text-sm font-semibold rounded-md transition-all duration-200 shadow-[0_0_15px_rgba(255,70,85,0.3)] hover:shadow-[0_0_24px_rgba(255,70,85,0.5)] hover:scale-[1.02]">
           <Save size={16} />
           <span>Save Changes</span>
        </button>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl">
        
        {/* Profile Settings */}
        <SettingsSection 
          title="Creator Profile" 
          description="Update your marketplace identity and contact information."
        >
          <div className="flex items-center gap-6 mb-8">
             <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center text-3xl font-bold text-white shadow-inner relative group cursor-pointer">
                N
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <User size={20} className="text-white" />
                </div>
             </div>
             <div className="flex flex-col gap-1.5">
                <button className="text-sm font-semibold text-white bg-[#1f1f23] px-3 py-1.5 rounded-md border border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors">Change Avatar</button>
                <span className="text-xs text-zinc-500">JPG, GIF or PNG. 1MB max.</span>
             </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <InputGroup label="Display Name" placeholder="Neon Samurai" />
            <InputGroup label="Email Address" placeholder="neon@shopsmart.com" />
          </div>
          <div className="mt-6">
            <label className="text-sm font-medium text-zinc-300 mb-2 block">Creator Bio</label>
            <textarea 
              rows="4"
              placeholder="Tell the marketplace about your work..."
              className="w-full bg-[#0b0b0c] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655]/50 focus:shadow-[0_0_10px_rgba(255,70,85,0.3)] placeholder:text-zinc-600 resize-none"
            ></textarea>
          </div>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection 
          title="Security" 
          description="Manage your password and authentication protocols."
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <InputGroup label="Current Password" type="password" placeholder="••••••••" />
            <InputGroup label="New Password" type="password" placeholder="••••••••" />
          </div>
          <div className="mt-8 pt-6 border-t border-[#1f1f23] flex items-center justify-between">
             <div className="flex items-center gap-3">
                <Shield size={20} className="text-primary-accent" />
                <div className="flex flex-col">
                   <span className="text-sm font-medium text-white">Two-Factor Authentication</span>
                   <span className="text-xs text-zinc-500">Add an extra layer of security to your creator account.</span>
                </div>
             </div>
             <div className="w-12 h-6 bg-primary-accent rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
             </div>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection 
          title="System Preferences" 
          description="Control how you receive marketplace signals and drop alerts."
        >
          <div className="flex flex-col gap-5">
             {[
               { icon: Bell, title: "Sales Notifications", desc: "Get alerted when a user purchases from your drop." },
               { icon: Globe, title: "Regional Synchronization", desc: "Automatically adjust drop windows to your local timezone." }
             ].map((pref) => (
                <div key={pref.title} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <pref.icon size={18} className="text-zinc-400" />
                      <div className="flex flex-col">
                         <span className="text-sm font-medium text-white">{pref.title}</span>
                         <span className="text-xs text-zinc-500">{pref.desc}</span>
                      </div>
                   </div>
                   <div className="w-12 h-6 bg-[#1f1f23] rounded-full relative p-1 cursor-pointer border border-[#2a2a2a]">
                      <div className="w-4 h-4 bg-zinc-500 rounded-full" />
                   </div>
                </div>
             ))}
          </div>
        </SettingsSection>

      </div>
    </div>
  );
};

export default Settings;
