import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart2, Tag, Store, ClipboardList } from 'lucide-react';

interface DashboardProps {
    stats: {
        totalCoupons: number;
        totalStores: number;
        totalCategories: number;
        totalTags: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/coupons" className="hover:opacity-80">
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

                <Link href="/admin/stores" className="hover:opacity-80">
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

                <Link href="/admin/categories" className="hover:opacity-80">
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

                <Link href="/admin/tags" className="hover:opacity-80">
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
            </div>
        </AppLayout>
    );
}
