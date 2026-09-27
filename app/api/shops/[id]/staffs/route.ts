import { MOCK_SHOP_STAFF } from "@/data/MockData";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> }

// http://localhost:3000/api/shops/[id]/staffs
// GETリクエスト（非同期通信）
export async function GET(_request: Request, { params }: Params) {
    const { id } = await params
    // 指定されたIDのショップを取得
    const staffs = MOCK_SHOP_STAFF[id] ?? []

    // スタッフが存在しない場合は404エラーを返す
    if (staffs.length === 0) {
        return NextResponse.json({ error: "not found" }, { status: 404 })
    }

    return NextResponse.json({ staffs })
}