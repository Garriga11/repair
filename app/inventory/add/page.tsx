// app/inventory/add/page.tsx
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"; // <-- make sure you have this singleton

// ----- SERVER ACTION -----
async function addInventoryItem(formData: FormData) {
  "use server";

  const sku = formData.get("sku") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;
  const category = formData.get("category") as string | null;
  const deviceModel = formData.get("deviceModel") as string | null;
  const quantity = Number(formData.get("quantity"));
  const reorderLevel = Number(formData.get("reorderLevel"));
  const cost = Number(formData.get("cost"));
  const sellPrice = formData.get("sellPrice")
    ? Number(formData.get("sellPrice"))
    : null;
  const location = formData.get("location") as string | null;
  const binNumber = formData.get("binNumber") as string | null;

  await prisma.inventoryItem.create({
    data: {
      sku,
      name,
      description,
      category,
      deviceModel,
      quantity,
      reorderLevel,
      cost,
      sellPrice,
      location,
      binNumber,
    },
  });

  // Revalidate inventory list page if you render it server-side
  // revalidatePath("/inventory");

  redirect("/inventory");
}

// ----- OPTIONS -----
const deviceCategories = [
  "Screens",
  "Charging Ports",
  "Batteries",
  "Cameras",
  "Speakers",
  "Microphones",
  "Tools",
  "Adhesives",
  "Screws",
  "Other",
];

const deviceModels = [
  "iPhone 13",
  "iPhone 14",
  "iPhone 15",
  "Samsung Galaxy S21",
  "Samsung Galaxy S22",
  "Samsung Galaxy S23",
  "iPad Air",
  "iPad Pro",
  "Google Pixel 7",
  "Google Pixel 8",
  "Universal",
  "Other",
];

// ----- PAGE COMPONENT -----
export default function AddInventoryPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <a
          href="/inventory"
          className="mr-4 text-blue-600 hover:text-blue-800"
        >
          ← Back
        </a>
        <h1 className="text-3xl font-bold">Add New Inventory Item</h1>
      </div>

      <form
        action={addInventoryItem}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKU *
            </label>
            <input
              type="text"
              name="sku"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., IPH13-SCR-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., iPhone 13 OLED Screen Assembly"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional detailed description of the item"
          />
        </div>

        {/* Category and Device */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {deviceCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Device Model
            </label>
            <select
              name="deviceModel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Device Model</option>
              {deviceModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stock and Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reorder Level *
            </label>
            <input
              type="number"
              name="reorderLevel"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost per Unit *
            </label>
            <input
              type="number"
              name="cost"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sell Price
            </label>
            <input
              type="number"
              name="sellPrice"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage Location
            </label>
            <input
              type="text"
              name="location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Shelf A1, Storage Room B"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bin Number
            </label>
            <input
              type="text"
              name="binNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., A1-001, B2-003"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Inventory Item
          </button>
          <a
            href="/inventory"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}