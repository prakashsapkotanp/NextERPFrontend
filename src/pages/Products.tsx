import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Package, Tag, Layers } from 'lucide-react';
import { Card, Button, Input, Badge, Modal } from '../components/ui-base';

const initialProducts = [
  { id: '1', name: 'Wireless Headphones', sku: 'HD-001', price: 129.99, stock: 45, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' },
  { id: '2', name: 'Mechanical Keyboard', sku: 'KB-042', price: 159.00, stock: 2, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&h=300&fit=crop' },
  { id: '3', name: 'Leather Back-pack', sku: 'BP-109', price: 89.50, stock: 12, category: 'Accessories', image: 'https://images.unsplash.com/photo-1548036627-19fce01cbbd5?w=300&h=300&fit=crop' },
  { id: '4', name: 'Minimalist Watch', sku: 'WT-555', price: 199.00, stock: 8, category: 'Acessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleEdit = (product: any) => {
    setEditingItem(product);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-black text-text-base tracking-tighter uppercase">Inventory</h2>
          <p className="text-text-muted text-sm font-medium">Manage your catalog, prices, and stock levels.</p>
        </div>
        <Button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="gap-2 h-12 px-6 uppercase tracking-widest font-black text-xs">
          <Plus size={16} />
          New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col group h-full">
            <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-border-base">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="icon" variant="outline" className="bg-white/95 backdrop-blur-sm" onClick={() => handleEdit(product)}>
                  <Edit size={14} className="text-text-base" />
                </Button>
                <Button size="icon" variant="danger" className="bg-danger/95 text-white border-none shadow-lg">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{product.category}</span>
                <Badge variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}>
                  {product.stock === 0 ? 'None' : `${product.stock} Units`}
                </Badge>
              </div>
              <h3 className="font-black text-text-base mb-1 tracking-tight">{product.name}</h3>
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-6">SKU: {product.sku}</p>
              
              <div className="mt-auto pt-6 border-t border-border-base flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">MSRP</span>
                  <span className="text-2xl font-light text-text-base tracking-tighter">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                    <Layers size={14} className="text-text-muted" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                    <Tag size={14} className="text-text-muted" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Product' : 'Add New Product'}
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Product Name</label>
            <Input defaultValue={editingItem?.name} placeholder="e.g. Wireless Mouse" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">SKU</label>
              <Input defaultValue={editingItem?.sku} placeholder="e.g. WM-100" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Category</label>
              <Input defaultValue={editingItem?.category} placeholder="e.g. Electronics" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Price ($)</label>
              <Input type="number" step="0.01" defaultValue={editingItem?.price} placeholder="0.00" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Initial Stock</label>
              <Input type="number" defaultValue={editingItem?.stock} placeholder="0" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Image URL</label>
            <Input defaultValue={editingItem?.image} placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Description</label>
            <textarea 
              className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" 
              placeholder="Tell customers more about this product..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingItem ? 'Save Changes' : 'Add Product'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
