// "use client"
import SectionHeading from '@/components/SectionHeading';
import { getShop, getMenus, getStaffs } from '@/lib/services/shops'; 
import { notFound } from 'next/navigation';
// useState を使えるようにする場合は、"use client" を有効にする必要があります。
// import { useState } from 'react'

// BookingForm コンポーネントをインポート
import BookingForm from '@/components/booking/BookingForm';

type BookingPageProps = {
    params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: BookingPageProps) {
    // URL パラメータから店舗 ID を取得
    const { id } = await params;
    // APIから店舗情報を取得
    const shop = await getShop(id)
    if (!shop) notFound()
    // APIからメニューとスタッフ情報を取得
    const [menus, staffs] = await Promise.all([getMenus(id), getStaffs(id)])

    return (
        <div>
            <SectionHeading
                eyebrow="Booking"
                title={`${shop.name} の予約`}
                description="メニュー・スタッフ・日時を選んで予約します。"
            />

            <BookingForm shop={shop} menus={menus} staffs={staffs} />
        </div>
    )
}
