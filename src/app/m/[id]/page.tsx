import { prisma } from "@/lib/prisma";
import QrMessageView from "@/components/message/QrMessageView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const msg = await prisma.qrMessage.findUnique({
    where: { id },
    select: { content: true, imageUrl: true },
  });
  if (!msg) return { title: "Không tìm thấy" };
  const preview =
    msg.content.length > 80 ? `${msg.content.slice(0, 80)}…` : msg.content;
  return {
    title: "Lời nhắn — CUPFFEE",
    description: preview,
  };
}

export default async function QrMessagePage({ params }: Props) {
  const { id } = await params;

  const msg = await prisma.qrMessage.findUnique({
    where: { id },
  });

  if (!msg) notFound();

  return (
    <QrMessageView
      content={msg.content}
      fontSize={msg.fontSize}
      color={msg.color}
      createdAt={msg.createdAt}
      imageUrl={msg.imageUrl}
    />
  );
}
