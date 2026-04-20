export default function ProductUserGuide({
  body,
  tags,
}: {
  body: string;
  tags: string[];
}) {
  const displayTags = tags.slice(0, 3);
  const fallback = ["An toàn sức khỏe", "Thân thiện môi trường", "Dễ vệ sinh"];
  const finalTags = displayTags.length > 0 ? displayTags : fallback;

  return (
    <div className="rounded-xl bg-white px-6 py-8 shadow-sm border border-[#e8dfd6]/80 h-full">
      <h2 className="text-lg font-bold text-[#4a2c20] mb-4">Hướng Dẫn Sử Dụng</h2>
      <p className="text-sm leading-relaxed text-[#5c4033]/90 mb-8">{body}</p>
      <div className="flex flex-wrap gap-2">
        {finalTags.map((t) => (
          <span
            key={t}
            title={t}
            className="inline-flex max-w-full items-center rounded-sm border border-[#c4bbb4] bg-white px-3 py-1.5 text-xs font-medium text-[#4a2c20] truncate"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
