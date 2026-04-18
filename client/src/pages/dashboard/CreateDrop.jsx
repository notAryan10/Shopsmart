import { useState } from 'react';
import { Eye, AlertCircle, Clock, DollarSign, Package } from 'lucide-react';
import DropCard from '../../components/DropCard';
import { createProduct } from '../../api';

const CreateDrop = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    timer: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    console.log("SUBMIT CLICKED");
    
    if (!formData.name || !formData.price || !formData.stock) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculate expiry date based on timer (hours)
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + (parseInt(formData.timer) || 24));

      await createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        type: 'DIGITAL', // Default type for now
        dropExpires: expiryDate.toISOString(),
        creatorId: '213cbf81-52f8-4244-81aa-c08fa5b51392' // Using the created creator ID
      });

      console.log("CREATED");
      alert("Drop created successfully!");
      // Reset form
      setFormData({
        name: '',
        price: '',
        stock: '',
        timer: '',
        description: ''
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create drop: " + (err.response?.data?.error || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl lg:text-[32px] font-bold text-white tracking-tight">
          Create Drop
        </h1>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-[#1f1f23] text-zinc-300 border border-[#2a2a2a] text-sm font-medium rounded-md hover:bg-[#2a2a2a] hover:text-white transition-colors shadow-sm">
            Save Draft
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-gradient-to-r from-[#ff4655] to-[#ff6a75] text-white text-sm font-semibold rounded-md transition-all duration-200 shadow-[0_0_15px_rgba(255,70,85,0.3)] hover:shadow-[0_0_24px_rgba(255,70,85,0.5)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Drop'}
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Alert */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 text-sm text-red-200 items-start">
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="font-medium text-red-300">Finalization Warning</h4>
              <p className="opacity-90 mt-1 leading-relaxed">Drops are finalized upon initiation. Please verify all details including allocations and pricing. These cannot be changed once the drop starts.</p>
            </div>
          </div>

          {/* Basic Info Card */}
          <section className="bg-[#121214] border border-[#1f1f23] rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] mb-2">
            <h2 className="text-lg font-semibold tracking-tight text-white mb-6">Basic Information</h2>
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Drop Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Neon Horizon Pack"
                  className="w-full bg-[#0b0b0c] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5 text-sm transition-all focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655]/50 focus:shadow-[0_0_10px_rgba(255,70,85,0.3)] placeholder:text-zinc-600"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Description</label>
                <textarea 
                  rows="4"
                  placeholder="Describe the items in this drop..."
                  className="w-full bg-[#0b0b0c] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655]/50 focus:shadow-[0_0_10px_rgba(255,70,85,0.3)] placeholder:text-zinc-600 resize-y"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>
          </section>

          {/* Pricing & Allocation */}
          <section className="bg-[#121214] border border-[#1f1f23] rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] mb-2">
            <h2 className="text-lg font-semibold tracking-tight text-white mb-6">Pricing & Allocation</h2>
            <div className="grid sm:grid-cols-2 gap-5 text-sm">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Market Value (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-[#0b0b0c] border border-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2.5 transition-all focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655]/50 focus:shadow-[0_0_10px_rgba(255,70,85,0.3)] placeholder:text-zinc-600"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Unit Allocation</label>
                <div className="relative">
                  <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input 
                    type="number"
                    placeholder="100" 
                    className="w-full bg-[#0b0b0c] border border-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2.5 transition-all focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655]/50 focus:shadow-[0_0_10px_rgba(255,70,85,0.3)] placeholder:text-zinc-600"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Timing */}
          <section className="bg-[#121214] border border-[#1f1f23] rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] mb-12 lg:mb-2">
            <h2 className="text-lg font-semibold tracking-tight text-white mb-6">Timing Configuration</h2>
            <div className="grid sm:grid-cols-2 gap-5 text-sm">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Duration (Hours)</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input 
                    type="number" 
                    placeholder="24"
                    className="w-full bg-[#0b0b0c] border border-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2.5 transition-all focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655]/50 focus:shadow-[0_0_10px_rgba(255,70,85,0.3)] placeholder:text-zinc-600"
                    value={formData.timer}
                    onChange={(e) => setFormData({...formData, timer: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar / Preview Section */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
             <Eye size={16} className="text-zinc-400" />
             <span className="text-sm font-medium text-zinc-400">Live Preview</span>
          </div>
          
          <DropCard 
            id="preview"
            name={formData.name || 'Untitled Drop'}
            creator="Neon"
            price={formData.price || '0'}
            stock={formData.stock || '0'}
            timer={formData.timer ? `${formData.timer}:00:00` : '24:00:00'}
          />
        </div>
      </div>
    </>
  );
};

export default CreateDrop;
