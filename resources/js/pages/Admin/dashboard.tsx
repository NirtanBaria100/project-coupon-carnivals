import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart2, Tag, Store, ClipboardList, UserIcon ,Star} from 'lucide-react';

interface Rating {
    id:number,
    store_id:number,
    ratings:number,
    is_approved:number
    created_at:Date,
    updated_at:Date,
}
interface DashboardProps {
    stats: {
        totalCoupons: number;
        totalStores: number;
        totalCategories: number;
        totalTags: number;
        totalUsers: number | 0;
        ratings: Rating[];
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
                <Link href={route("admin.coupons.index")} className="hover:opacity-80">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <ClipboardList className="h-10 w-10 text-primary" />
                            <div>
                                <h2 className="text-lg font-semibold">Coupons</h2>
                                <p className="text-2xl font-bold">{stats.totalCoupons}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href={route("admin.stores.index")} className="hover:opacity-80">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <Store className="h-10 w-10 text-primary" />
                            <div>
                                <h2 className="text-lg font-semibold">Stores</h2>
                                <p className="text-2xl font-bold">{stats.totalStores}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href={route("admin.users.index")} className="hover:opacity-80">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <UserIcon className="h-10 w-10 text-primary" />
                            <div>
                                <h2 className="text-lg font-semibold">Total Users</h2>
                                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href={route("admin.categories.index")} className="hover:opacity-80">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <BarChart2 className="h-10 w-10 text-primary" />
                            <div>
                                <h2 className="text-lg font-semibold">Categories</h2>
                                <p className="text-2xl font-bold">{stats.totalCategories}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href={route("admin.tags.index" )}className="hover:opacity-80">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <Tag className="h-10 w-10 text-primary" />
                            <div>
                                <h2 className="text-lg font-semibold">Tags</h2>
                                <p className="text-2xl font-bold">{stats.totalTags}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <Star className="h-10 w-10 text-primary" />
                            <div>
                                <h2 className="text-lg font-semibold">Daily Ratings</h2>
                                <p className="text-2xl font-bold">{stats.ratings}</p>
                            </div>
                        </CardContent>
                    </Card>
            </div>
        </AppLayout>
    );
}
