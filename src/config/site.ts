// import { ADMIN_ROUTES } from "@/constants/routes";
import {
  Layers3,
  SquarePen,
  Settings,
  Upload,
  Users,
  MessageCircleQuestion,
  MessageSquareWarning,
  Dock,
} from 'lucide-react';

export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || 'https://saas.arvasit.com';

const socialLinks = {
  discord: 'https://discord.gg/Pb8uKbwpsJ',
  facebook: 'https://facebook.com/groups/bleverse',
  github: 'https://github.com/blefnk/relivator-nextjs-template',
  githubAccount: 'https://github.com/blefnk',
  twitter: 'https://x.com/blefnk',
};

export const siteConfig = (locale?: string) => ({
  name: 'arvasit/ai_chat',
  url: `${siteUrl}/${locale}`,
  ogImage: `${siteUrl}/${locale}/og.jpg`,
  description:
    'Beautifully designed saas application that you can use as a starter for your app. Accessible. Customizable. Open Source.',
  links: {
    twitter: 'https://twitter.com/arvasit',
    github: 'https://github.com/arvasit/saas-starter',
    docs: 'https://saas-doc.arvasit.com',
  },
  //   mainNav: [
  //     {
  //       title: "Catalogue",
  //       url: "/",
  //       items: [
  //         {
  //           description: "All the products we have to offer.",
  //           title: "Products",
  //           url: USER_ROUTES.HOME,
  //           // items: [],
  //         },
  //         {
  //           description: "Build the own custom clothes.",
  //           title: "Build a Look",
  //           url: "/custom/clothing",
  //           // items: [],
  //         },
  //         {
  //           description: "Read our latest blog posts.",
  //           title: "Blog",
  //           url: "/blog",
  //           // items: [],
  //         },
  //       ],
  //     },
  //     ...productCategories.map((category) => ({
  //       title: category.title,
  //       url: `/categories/${slugify(category.title)}`,
  //       items: [
  //         {
  //           description: `All ${category.title}.`,
  //           title: "All",
  //           url: `/categories/${slugify(category.title)}`,
  //           items: [],
  //         },
  //         ...category.subcategories.map((subcategory) => ({
  //           description: subcategory.description,
  //           title: subcategory.title,
  //           url: `/categories/${slugify(category.title)}/${subcategory.slug}`,
  //           items: [],
  //         })),
  //       ],
  //     })),
  //   ] satisfies HeaderItem[],
  SidebarNav: [
    {
      title: 'New Chat',
      url: '/chat',
      icon: SquarePen,
    },
    {
      title: 'Document Uploads',
      url: '/documents',
      icon: Upload,
    },
    {
      title: 'Masters',
      url: '#',
      icon: Dock,
      items: [
        {
          title: 'Category',
          url: '/category',
          icon: Layers3,
        },
        {
          title: 'User Management',
          url: '/user-manager',
          icon: Users,
        },
      ],
    },
    {
      title: 'Setting',
      url: '/setting',
      icon: Settings,
    },
    {
      title: 'Support',
      url: '#',
      icon: MessageSquareWarning,
      items: [
        {
          title: 'Help',
          url: '#',
          icon: MessageCircleQuestion,
        },
      ],
    },
  ],
});

export type SiteConfig = typeof siteConfig;
