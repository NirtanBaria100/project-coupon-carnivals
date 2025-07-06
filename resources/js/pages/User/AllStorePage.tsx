// src/components/AllStorePage.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "@inertiajs/react";
import WebLayout from "@/layouts/web-layout";
interface Store {
    name: string | "",
    slug: string | "",
    id  : number | "",
}
interface Props {
    allStores: Store[],
}
const AllStorePage = ({ allStores }: Props) => {
    const [stores, setStores] = useState<Store[]>([]); // Stores will be fetched from backend
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // NEW: State for the active letter in the A-Z filter
    const [activeLetter, setActiveLetter] = useState("All");

    // Dummy fetch function - REPLACE WITH YOUR ACTUAL API CALL
    const fetchStores = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {



            await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
            setStores(allStores);
        } catch (err) {

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStores(); // Initial fetch on component mount
    }, [fetchStores]);

    // NEW: Memoized list for the A-Z "All Stores" section
    const alphaFilteredStores = useMemo(() => {
        let filtered = stores;

        // Apply A-Z filter
        if (activeLetter !== "All") {
            filtered = filtered.filter((store) =>
                store.name.toLowerCase().startsWith(activeLetter.toLowerCase())
            );
        }

        // Always sort alphabetically by name for this section
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        return filtered;
    }, [stores, activeLetter]);

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center font-sans"
                style={{ backgroundColor: "var(--page-bg)" }}
            >
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mx-auto mb-4"
                        style={{ borderColor: "var(--primary-orange)" }}
                    ></div>
                    <p className="text-lg" style={{ color: "var(--text-muted)" }}>
                        Loading stores...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="min-h-screen flex items-center justify-center font-sans"
                style={{ backgroundColor: "var(--page-bg)" }}
            >
                <div
                    className="text-center p-8 rounded-lg shadow-lg border"
                    style={{
                        backgroundColor: "var(--card-bg)",
                        borderColor: "var(--error-border)",
                    }}
                >
                    <p
                        className="text-xl font-semibold mb-4"
                        style={{ color: "var(--error-text)" }}
                    >
                        {error}
                    </p>
                    <button
                        onClick={fetchStores}
                        className="font-bold py-2 px-4 rounded-md transition-colors duration-200"
                        style={{
                            backgroundColor: "var(--error-button-bg)",
                            color: "var(--neutral-white)",
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            "var(--error-button-hover)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "var(--error-button-bg)")
                        }
                    >
                        Retry Loading{" "}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <WebLayout>  <div
            className="pb-12 font-sans"
            style={{ backgroundColor: "var(--page-bg)" }}
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="text-sm mb-6">
                    <Link
                        href="/"
                        className="transition-colors duration-300"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--primary-orange)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--text-muted)")
                        }
                    >
                        Home{" "}
                    </Link>
                    <span
                        className="mx-2"
                        style={{ color: "var(--breadcrumb-separator-color)" }}
                    >
                        &gt;
                    </span>
                    <span
                        className="font-semibold"
                        style={{ color: "var(--main-heading-color)" }}
                    >
                        All Stores
                    </span>
                </nav>

                {/* NEW: A-Z Navigation for All Stores */}
                <section className="mb-10">
                    <h2
                        className="text-2xl sm:text-3xl font-bold mb-6 text-center"
                        style={{ color: "var(--main-heading-color)" }}
                    >
                        All Stores A-Z
                    </h2>
                    <div
                        className="flex flex-wrap justify-center gap-2 p-4 rounded-lg shadow-md border mb-6"
                        style={{
                            backgroundColor: "var(--card-bg)",
                            borderColor: "var(--card-border)",
                        }}
                    >
                        {["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))].map(
                            (letter) => (
                                <button
                                    key={letter}
                                    onClick={() => {
                                        setActiveLetter(letter);
                                    }}
                                    className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200
              ${activeLetter === letter
                                            ? "text-white"
                                            : "hover:text-primary-orange"
                                        }`}
                                    style={{
                                        backgroundColor:
                                            activeLetter === letter
                                                ? "var(--primary-orange)"
                                                : "transparent",
                                        color:
                                            activeLetter === letter
                                                ? "var(--neutral-white)"
                                                : "var(--text-default)",
                                        border: `1px solid ${activeLetter === letter
                                            ? "var(--primary-orange)"
                                            : "var(--border-color-light)"
                                            }`,
                                    }}
                                >
                                    {letter}
                                </button>
                            )
                        )}</div>
                </section >

                {/* Modified: All Stores List (using alphaFilteredStores) */}
                {alphaFilteredStores.length > 0 ? (
                    <div className="grid bg-white p-2 shadow rounded grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-2 gap-x-4">
                        {alphaFilteredStores.map((store) => (
                            <Link
                                key={store.id}
                                href={`/store/${store.slug}`}
                                className="block py-1 px-2 text-sm md:text-base transition-colors duration-200"
                                style={{ color: "var(--text-default)" }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "var(--primary-orange)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "var(--text-default)")
                                }
                            >
                                {store.name}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div
                        className="p-6 sm:p-8 rounded-lg shadow-lg border text-center"
                        style={{
                            backgroundColor: "var(--card-bg)",
                            borderColor: "var(--card-border)",
                        }}
                    >
                        <p className="text-xl" style={{ color: "var(--text-default)" }}>
                            No stores found matching your criteria.
                        </p>
                        <button
                            onClick={() => {
                                setActiveLetter("All"); // Reset the A-Z filter
                            }}
                            className="mt-4 inline-block font-bold py-2 px-4 rounded-md transition-colors duration-200"
                            style={{
                                backgroundColor: "var(--primary-orange)",
                                color: "var(--neutral-white)",
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                "var(--button-hover-orange)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "var(--primary-orange)")
                            }
                        >
                            Reset Filters{" "}
                        </button>
                    </div>
                )}
            </div>
        </div>
        </WebLayout>
    );
};

export default AllStorePage;
