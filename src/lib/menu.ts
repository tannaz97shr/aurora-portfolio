export type MenuItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const MAIN_MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Tokens",
    children: [
      { label: "All Tokens", href: "/tokens" },
      { label: "Watchlist", href: "/tokens?tab=watchlist" },
    ],
  },
  { label: "Transactions", href: "/transactions" },
  { label: "Settings", href: "/settings" },
];
