"use client";
import { useState } from "react";

export default function InventoryClient({ inventory }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.deviceModel && item.deviceModel.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4"
      />
      <table className="min-w-full">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Item Name</th>
            <th>Device Model</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-gray-500">
                No inventory items found.
              </td>
            </tr>
          ) : (
            filteredInventory.map((item) => (
              <tr key={item.id}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.deviceModel}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.cost}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
