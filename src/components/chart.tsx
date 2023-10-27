"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

const data = [
  {
    name: "1 Day",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "3 Days",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "1 Weeks",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "2 Weeks",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "1 Month",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "> 1 Month",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Chart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#red"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <Bar dataKey="total" fill="red" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
