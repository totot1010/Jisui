'use client';

import React, { ReactNode, useEffect, useState } from "react";

type CookingHeatMapProps = {
  userId: string
}

export const CookingHeatMap = ({  }: CookingHeatMapProps) => {
  // TODO: ユーザーの料理履歴を取得する
  const [weeks, setWeeks] = useState<ReactNode[]>([]);

  useEffect(() => {
    // ハイドレーションエラー回避のため
      const cookingHistory = generateYearlyCookingData();

      // 週ごとに分割
      const temporaryWeeks: ReactNode[] = [];
      for (let i = 0; i < 53; i++) {
        temporaryWeeks.push(
          <div key={i} className="grid grid-rows-7 gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map(day => {
              const index = i * 7 + day;
              const data = index < cookingHistory.length ? cookingHistory[index] : null;
              return (
                <div
                  key={day}
                  className={`w-3 h-3 rounded-sm ${data ? getColor(data.count) : 'bg-gray-100'}`}
                  title={data ? `${data.date.toISOString().split('T')[0]}: ${data.count}回` : ''}
                />
              );
            })}
          </div>
        );
      }
      setWeeks(temporaryWeeks);
    }, [setWeeks]);

  return (
    <div className="flex space-x-1 overflow-x-auto pb-4">
      {weeks}
    </div>
  )
}

const getColor = (count: number) => {
  if (count === 0) return 'bg-gray-100'
  if (count === 1) return 'bg-orange-200'
  if (count === 2) return 'bg-orange-300'
  return 'bg-orange-400'
}

const generateYearlyCookingData = () => {
  const today = new Date()
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
  const data = []

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    data.push({
      date: new Date(d),
      count: Math.floor(Math.random() * 4) // 0-3のランダムな回数
    })
  }

  return data
}
