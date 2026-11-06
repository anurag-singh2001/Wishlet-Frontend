import React from "react";
import { WishesPage } from "@/features/wishes/components/WishesPage";

export const metadata = {
  title: "My wishes",
};

export default function Page(): React.ReactElement {
  return <WishesPage />;
}
