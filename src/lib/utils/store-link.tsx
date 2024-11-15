"use client";

import { useSaasStore } from "@/providers";
import { OrganizationSlice } from "@/stores/tenants-slice";
import Link, { LinkProps } from "next/link";

interface StoreLinkProps extends LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const StoreLink = ({ href, children, className, ...props }: StoreLinkProps) => {
  const activeStore = useSaasStore(
    (state) => (state as OrganizationSlice).activeStore,
  );

  const storeId = activeStore?._id || "";

  const storeHref = `/store/${storeId}${href}`;

  return (
    <Link href={storeHref} className={className} {...props}>
      {children}
    </Link>
  );
};

export default StoreLink;
