"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import ShopCard from "@/components/ShopCard";
import type { Shop } from "@/types/shop";

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadShops() {
      try {
        const response = await fetch("/api/shops", { signal: controller.signal });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data: { shops: Shop[] } = await response.json();
        if (!Array.isArray(data.shops)) throw new Error("Invalid shops response");
        setShops(data.shops);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("ショップ一覧の取得に失敗しました", err);
        setError("ショップ一覧を取得できませんでした。ページを再読み込みしてください。");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadShops();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <SectionHeading
        eyebrow="Featured Shops"
        title="今日の気分から選べるサロン"
        description="エリアやメニューから、あなたにぴったりのサロンを見つけましょう。"
      />
      {loading && <p role="status" className="mt-8 text-slate-600">ショップ一覧を読み込み中です...</p>}
      {error && <p role="alert" className="mt-8 text-rose-700">{error}</p>}
      {!loading && !error && shops.length === 0 && (
        <p className="mt-8 text-slate-600">現在、表示できるショップはありません。</p>
      )}
      {!loading && !error && (
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => <ShopCard key={shop.id} shop={shop} />)}
        </div>
      )}
    </div>
  );
}
