export default function AdminOrdersPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">
          Manage customer orders
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Order Management
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Orders are currently handled via the contact form and direct
          communication. A full e-commerce order system can be integrated here.
        </p>
      </div>
    </div>
  );
}
