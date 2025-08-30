
import { addStockMovement } from './actions';
import { redirect } from 'next/navigation';

export default function StockMovementPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    await addStockMovement(formData);
    redirect('/inventory');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Stock Movement</h1>
      <form action={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Inventory ID *</label>
            <input type="text" name="inventoryId" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <select name="type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select Type</option>
              <option value="STOCK_IN">Stock In</option>
              <option value="STOCK_OUT">Stock Out</option>
              <option value="ADJUSTMENT">Adjustment</option>
              <option value="DAMAGED">Damaged</option>
              <option value="RETURNED">Returned</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
            <input type="number" name="quantity" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
            <input type="text" name="reason" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reference</label>
          <input type="text" name="reference" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-4 pt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Add Movement</button>
          <a href="/inventory" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 text-center">Cancel</a>
        </div>
      </form>
    </div>
  );
}