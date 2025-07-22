import AppLayout from '@/layouts/app-layout'
import { toastDirection } from '@/lib/utils/Constants';
import { BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react'
import { User } from 'lucide-react';
import React, { FormEventHandler, useEffect } from 'react'
import toast from 'react-hot-toast';
import { Switch } from '@/components/ui/switch';
import { profile } from 'console';

type User = {
    name: string | '',
    email: string | '',
    profile: string | '',
    email_verified_at: string | '',
    password: string | '',
    id: number,
}

interface Props {
    user: User,
}
export default function Create({ user }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        password: user?.password || "",
        is_active: user?.email_verified_at ? true : false,
        id: user?.id || "",
        profile: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('profile', file);
    };

    const handleSwitch = (name: string, value: boolean) => {
        setData(name as keyof typeof data, value);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.users.store', user?.id), {
            forceFormData: true,
            onSuccess: () => toast.success('Data Saved!', { position: toastDirection }),
        });
    };
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Users', href: route('admin.users.index') },
        { title: (user ? "Update User" : "Create User"), href: route('admin.stores.create') },
    ];
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((msg) =>
                toast.error(msg || "", {
                    position: toastDirection,
                }),
            );
        }
    }, [errors]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Store</h1>
                    <Button onClick={handleSubmit} disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-black">
                        <input
                            name="name"
                            placeholder="User name"
                            required
                            value={data.name}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        <input
                            name="email"
                            placeholder="Email"
                            required
                            value={data.email}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {!data.id ? <>
                            <input
                                name="password"
                                placeholder="User Password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                        </> : <></>}

                        <label className="block font-medium">User Profile</label>
                        <input
                            type="file"
                            name="profile"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        <label className="flex items-center gap-2">
                            Verify User
                            <Switch checked={data.is_active} onCheckedChange={(checked: boolean) => handleSwitch('is_active', checked)} />
                        </label>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}
