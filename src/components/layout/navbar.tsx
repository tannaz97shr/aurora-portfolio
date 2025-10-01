"use client";

import { MAIN_MENU, MenuItem } from "@/lib/menu";
import { cn } from "@/lib/utils"; // optional: a classNames helper if you have one
import { ChevronRight, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "../theme-toggle";

function DesktopMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-2">
      {MAIN_MENU.map((item) =>
        item.children ? (
          // Parent with children → show only parent label as non-click in desktop (or turn into a dropdown if you want)
          <div key={item.label} className="relative group">
            <span className="px-3 py-2 text-sm text-muted-foreground group-hover:text-foreground transition">
              {item.label}
            </span>
            <div
              className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition
                            absolute left-0 top-full mt-2 rounded-xl border bg-background shadow-lg w-48 p-2"
            >
              {item.children.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                    pathname === sub.href && "bg-accent text-accent-foreground"
                  )}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href!}
            className={cn(
              "rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
              pathname === item.href && "bg-accent text-accent-foreground"
            )}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

function MobileSidebar() {
  const pathname = usePathname();

  const renderItem = (item: MenuItem) => {
    if (item.children) {
      return (
        <Accordion
          type="single"
          collapsible
          key={item.label}
          className="w-full"
        >
          <AccordionItem value={item.label}>
            <AccordionTrigger className="text-base">
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="pl-2">
              <div className="flex flex-col">
                {item.children.map((sub) => (
                  <SheetClose asChild key={sub.href}>
                    <Link
                      href={sub.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                        pathname === sub.href &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      <span>{sub.label}</span>
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    return (
      <SheetClose asChild key={item.href}>
        <Link
          href={item.href!}
          className={cn(
            "rounded-lg px-3 py-2 text-base hover:bg-accent hover:text-accent-foreground",
            pathname === item.href && "bg-accent text-accent-foreground"
          )}
        >
          {item.label}
        </Link>
      </SheetClose>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[86%] sm:w-96 p-0">
        <SheetHeader className="px-4 pb-0 pt-4">
          <SheetTitle className="text-left">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-fuchsia-500 to-blue-500" />
              <span className="font-semibold">Aurora Portfolio</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <Separator />
        </div>

        <div className="flex flex-col gap-1 p-4">
          {MAIN_MENU.map(renderItem)}
        </div>

        <div className="mt-auto p-4">
          <Separator className="mb-4" />
          {/* Actions area: Connect, Theme, etc. */}
          {/* Replace with your RainbowKit button if you have it */}
          <SheetClose asChild>
            <Button className="w-full">Connect Wallet</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-fuchsia-500 to-blue-500" />
          <span className="hidden sm:inline font-semibold">
            Aurora Portfolio
          </span>
        </Link>

        {/* Center (desktop) */}
        <DesktopMenu />

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Desktop connect button placeholder; replace with RainbowKit ConnectButton */}
          <Button className="hidden md:inline-flex">Connect Wallet</Button>
          <ThemeToggle />
          {/* Mobile hamburger */}
          <div className="md:hidden">
            <MobileSidebar />
          </div>
        </div>
      </div>
    </header>
  );
}
