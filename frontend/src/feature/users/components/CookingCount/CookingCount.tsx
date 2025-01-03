'use client';

import { useEffect, useState } from "react";

type CookingCountProps = {
  targetPeriod: 'today' | 'week';
  userId: string;
}

export const CookingCount = ({ }: CookingCountProps) => {
  // TODO: ユーザーの料理数を取得する
  const [cookingCount, setCookingCount] = useState<number>(0);
  useEffect(() => {
    // ハイドレーションエラー回避のため
    setCookingCount(Math.floor(Math.random() * 4))
  }, [setCookingCount])

  return (
    <p className="text-3xl font-bold text-primary-600">{cookingCount}</p>
  );
}