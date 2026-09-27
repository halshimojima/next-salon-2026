import "server-only"
import type { Shop } from "@/types/shop"
import type { Menu } from "@/types/menu"
import type { Staff } from "@/types/staff"
// .env で NEXT_PUBLIC_APP_URL を設定していない場合は、localhost:3000 を使用
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

// 店舗一覧
export async function getShops(): Promise<Shop[]> {
  const res = await fetch(`${BASE_URL}/api/shops`, { cache: "no-store" })
  const data: { shops: Shop[] } = await res.json()
  return data.shops
}

// 店舗詳細取得
export async function getShop(id: string): Promise<Shop | null> {
  const res = await fetch(`${BASE_URL}/api/shops/${id}`, { cache: "no-store" })
  if (res.status === 404) return null;

  const data: { shop: Shop } = await res.json()
  return data.shop
}

// メニュー一覧
export async function getMenus(shopId: string): Promise<Menu[]> {
  const res = await fetch(`${BASE_URL}/api/shops/${shopId}/menus`, { cache: "no-store" })
  const data: { menus: Menu[] } = await res.json()
  return data.menus
}

// スタッフ一覧
export async function getStaffs(shopId: string): Promise<Staff[]> {
  const res = await fetch(`${BASE_URL}/api/shops/${shopId}/staffs`, { cache: "no-store" })
  const data: { staffs: Staff[] } = await res.json()
  return data.staffs
}