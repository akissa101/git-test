"use client";

import ReactQueryWrapper from "../ReactQueryWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <ReactQueryWrapper>{children}</ReactQueryWrapper>
    </html>
  );
}
