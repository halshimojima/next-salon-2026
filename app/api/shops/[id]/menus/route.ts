import { MOCK_SHOP_MENUS } from "@/data/MockData";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> }

// http://localhost:3000/api/shops/[id]/menus
// GETリクエスト（非同期通信）
export async function GET(_request: Request, { params }: Params) {
    const { id } = await params
    // 指定されたIDのショップを取得
    const menus = MOCK_SHOP_MENUS[id] ?? []

    // メニューが存在しない場合は404エラーを返す
    if (menus.length === 0) {
        return NextResponse.json({ error: "not found" }, { status: 404 })
    }

    return NextResponse.json({ menus })
}