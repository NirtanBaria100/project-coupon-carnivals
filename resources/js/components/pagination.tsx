import { Link } from '@inertiajs/react';

export default function Pagination({ meta, links }: any) {
    if (links.length <= 3) return null;

    return (
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 text-sm">
            {links.map((link: any, i: number) => (
                <Link
                    key={i}
                    href={link.url || ''}
                    className={`rounded px-3 py-1 ${
                        link.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                    } ${!link.url ? 'pointer-events-none text-gray-400' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
