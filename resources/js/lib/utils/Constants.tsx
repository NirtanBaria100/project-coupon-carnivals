import { ArrowDownUp, CirclePlus, LayoutGrid, StoreIcon, Tag } from "lucide-react";

export const ADMIN_NAVITIEMS = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Stores',
        href: '/admin/stores',
        icon: StoreIcon,
    },
    {
        title: 'Create Store',
        href: '/admin/stores/create',
        icon: CirclePlus,
    },
    {
        title: 'Coupons',
        href: '/admin/coupons',
        icon: Tag,
        isHeading: false,
    },
    {
        title: 'Create Coupon',
        href: '/admin/coupons/create',
        icon: CirclePlus,
    },
    {
        title: 'Tags',
        href: '/admin/tags',
        icon: Tag,
        isHeading: false,
    },
    {
        title: 'Create Tag',
        href: '/admin/tags/create',
        icon: CirclePlus,
    },
    {
        title: 'Category',
        href: '/admin/categories',
        icon: Tag,
        isHeading: false,
    },
    {
        title: 'Create Category',
        href: '/admin/categories/create',
        icon: CirclePlus,
    },
    {
        title: 'Reorder',
        href: '/admin/coupons/store-types/default/reorder',
        icon: ArrowDownUp,
    },
    {
        title: 'Blogs',
        href: '/admin/blogs',
        icon: ArrowDownUp,
    },
    {
        title: 'Create Blog',
        href: '/admin/blogs/create',
        icon: ArrowDownUp,
    }

];


export const toastDirection = "bottom-right"