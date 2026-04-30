import { prisma } from "@/lib/prisma";
import AdminMessageActions from "@/components/admin/AdminMessageActions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ read: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1">
          {messages.filter((m) => !m.read).length} unread · {messages.length} total
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No messages yet
          </h3>
          <p className="text-gray-500">
            Messages from your contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-2xl border p-6 transition-all ${
                !msg.read ? "border-[#6d3018]/30 shadow-sm" : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{msg.name}</span>
                      {!msg.read && (
                        <span className="w-2 h-2 bg-[#6d3018] rounded-full" />
                      )}
                    </div>
                    {msg.company && (
                      <span className="text-sm text-gray-400">{msg.company}</span>
                    )}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-[#6d3018] hover:underline"
                  >
                    {msg.email}
                  </a>
                  <p className="text-gray-700 mt-3 leading-relaxed">{msg.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "Asia/Ho_Chi_Minh"
                    })}
                  </span>
                  <AdminMessageActions messageId={msg.id} read={msg.read} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
