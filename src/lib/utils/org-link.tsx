"use client";

import { useSaasStore } from "@/providers";
import { OrganizationSlice } from "@/stores/tenants-slice";
import Link, { LinkProps } from "next/link";

interface OrgLinkProps extends LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const OrgLink = ({ href, children, className, ...props }: OrgLinkProps) => {
  const activeOrg = useSaasStore(
    (state) => (state as OrganizationSlice).activeOrg,
  );

  const orgId = activeOrg?._id || "";

  const orgHref = `/organization/${orgId}${href}`;

  return (
    <Link href={orgHref} className={className} {...props}>
      {children}
    </Link>
  );
};

export default OrgLink;
