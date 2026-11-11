import SectionHeading from "@/components/SectionHeading"
import ShopCard from "@/components/ShopCard";
import { getShops } from "@/lib/services/shops";

export default async function ShopPage() {
  const shops = await getShops()

  return (
    <div>
      <SectionHeading
        eyebrow="Shops"
        title="店舗一覧"
        description="ターゲット層や店舗のコンセプトに合わせて選べるよう、切り口を変えて提案します。"
      />
      <div className="mt-8 gap-3 grid md:grid-cols-2 lg:grid-cols-3">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  )
}