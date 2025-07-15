// src/components/AllStorePage.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "@inertiajs/react";
import WebLayout from "@/layouts/web-layout";

interface Store {
    name: string | "";
    slug: string | "";
    id: number | "";
}

interface Props {
    allStores: Store[];
}

const AllStorePage = ({ allStores }: Props) => {
    const [stores, setStores] = useState<Store[]>([]); // Stores will be fetched from backend
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // State for the active letter in the A-Z filter
    const [activeLetter, setActiveLetter] = useState("All");

    // Dummy fetch function - REPLACE WITH YOUR ACTUAL API CALL if needed
    const fetchStores = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulate network delay if allStores is large or needs processing
            await new Promise((resolve) => setTimeout(resolve, 300));
            setStores(allStores);
        } catch (err) {
            setError("Failed to load stores. Please try again."); // More descriptive error
            console.error("Error fetching stores:", err);
        } finally {
            setLoading(false);
        }
    }, [allStores]); // Depend on allStores so it re-runs if the prop changes

    useEffect(() => {
        fetchStores(); // Initial fetch on component mount
    }, [fetchStores]);

    // Memoized list for the A-Z "All Stores" section
    // *** CONFIRMED: Logic remains correct and handles '0-9' or A-Z properly. ***
    const alphaFilteredStores = useMemo(() => {
        let filtered = [...stores]; // Create a shallow copy to avoid direct mutation of 'stores'

        // Apply A-Z or 0-9 filter
        if (activeLetter !== "All") {
            if (activeLetter === "0-9") {
                filtered = filtered.filter((store) =>
                    /^[0-9]/.test(store.name) // Check if name starts with a digit
                );
            } else {
                filtered = filtered.filter((store) =>
                    store.name.toLowerCase().startsWith(activeLetter.toLowerCase())
                );
            }
        }

        // Always sort alphabetically by name for this section
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        return filtered;
    }, [stores, activeLetter]);

    // A-Z filter buttons array including "0-9" at the END of the alphabet.
    const alphabetLetters = useMemo(() => {
        const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
        // Client's request: "0-9" comes AFTER A-Z
        return ["All", ...letters, "0-9"];
    }, []);

    if (loading) {
        return (
            <WebLayout>
                <div
                    className="min-h-screen flex items-center justify-center font-sans"
                    style={{ backgroundColor: "var(--page-bg, #f8f8f8)" }}
                >
                    <div className="text-center">
                        <div
                            className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mx-auto mb-4"
                            style={{ borderColor: "var(--primary-orange, #f97316)" }}
                        ></div>
                        <p className="text-lg" style={{ color: "var(--text-muted, #6b7280)" }}>
                            Loading stores...
                        </p>
                    </div>
                </div>
            </WebLayout>
        );
    }

    if (error) {
        return (
            <WebLayout>
                <div
                    className="min-h-screen flex items-center justify-center font-sans"
                    style={{ backgroundColor: "var(--page-bg, #f8f8f8)" }}
                >
                    <div
                        className="text-center p-8 rounded-lg shadow-lg border"
                        style={{
                            backgroundColor: "var(--card-bg, #ffffff)",
                            borderColor: "var(--error-border, #ef4444)",
                        }}
                    >
                        <p
                            className="text-xl font-semibold mb-4"
                            style={{ color: "var(--error-text, #dc2626)" }}
                        >
                            {error}
                        </p>
                        <button
                            onClick={fetchStores}
                            className="font-bold py-2 px-4 rounded-md transition-colors duration-200"
                            style={{
                                backgroundColor: "var(--error-button-bg, #ef4444)",
                                color: "var(--neutral-white, #ffffff)",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "var(--error-button-hover, #dc2626)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "var(--error-button-bg, #ef4444)")
                            }
                        >
                            Retry Loading{" "}
                        </button>
                    </div>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout>
            <div
                className="pb-12 font-sans"
                style={{ backgroundColor: "var(--page-bg, #f8f8f8)" }}
            >
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                    {/* Breadcrumbs - These remain at the top */}
                    <nav className="text-sm mb-6">
                        <Link
                            href="/"
                            className="transition-colors duration-300 hover:text-primary-orange"
                            style={{ color: "var(--text-muted, #6b7280)" }}
                        >
                            Home{" "}
                        </Link>
                        <span
                            className="mx-2"
                            style={{ color: "var(--breadcrumb-separator-color, #9ca3af)" }}
                        >
                            &gt;
                        </span>
                        <span
                            className="font-semibold"
                            style={{ color: "var(--main-heading-color, #1a202c)" }}
                        >
                            All Stores
                        </span>
                    </nav>

                    {/* NEW: A-Z Navigation for All Stores */}
                    <section className="mt-10">
                        <h1
                            className="text-3xl sm:text-4xl font-extrabold mb-6 text-center"
                            style={{ color: "var(--main-heading-color, #1a202c)" }}
                        >
                            All Stores
                        </h1>
                        <div
                            className="flex flex-wrap justify-center gap-2 sm:gap-3 p-4 rounded-lg shadow-md border mb-6 max-w-4xl mx-auto"
                            style={{
                                backgroundColor: "var(--card-bg, #ffffff)",
                                borderColor: "var(--card-border, #e5e7eb)",
                            }}
                        >
                            {/* Updated: Order of buttons will now be All, A-Z, then 0-9 */}
                            {alphabetLetters.map((letter) => (
                                <button
                                    key={letter}
                                    onClick={() => {
                                        setActiveLetter(letter);
                                    }}
                                    className={`px-3 py-1 rounded-md text-sm font-semibold transition-all duration-200 ease-in-out
                                        ${activeLetter === letter
                                            ? "text-white bg-primary-orange shadow-sm"
                                            : "text-text-default hover:bg-gray-100 hover:text-primary-orange"
                                        }`}
                                    style={{
                                        backgroundColor:
                                            activeLetter === letter
                                                ? "var(--primary-orange, #f97316)"
                                                : "transparent",
                                        color:
                                            activeLetter === letter
                                                ? "var(--neutral-white, #ffffff)"
                                                : "var(--text-default, #333)",
                                        border: `1px solid ${activeLetter === letter
                                            ? "var(--primary-orange, #f97316)"
                                            : "var(--border-color-light, #d1d5db)"
                                            }`,
                                    }}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* All Stores List (using alphaFilteredStores) */}
                    {alphaFilteredStores.length > 0 ? (
                        <div className="grid bg-white p-4 shadow-sm rounded-lg grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 sm:gap-y-4">
                            {alphaFilteredStores.map((store) => (
                                <Link
                                    key={store.id}
                                    href={`/store/${store.slug}`}
                                    className="block py-2 px-2 text-sm md:text-base transition-colors duration-200 hover:text-primary-orange hover:bg-gray-50 rounded-md"
                                    style={{ color: "var(--text-default, #333)" }}
                                >
                                    {store.name}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="p-6 sm:p-8 rounded-lg shadow-md border text-center max-w-xl mx-auto"
                            style={{
                                backgroundColor: "var(--card-bg, #ffffff)",
                                borderColor: "var(--card-border, #e5e7eb)",
                            }}
                        >
                            <p className="text-xl" style={{ color: "var(--text-default, #333)" }}>
                                No stores found matching your criteria.
                            </p>
                            <button
                                onClick={() => {
                                    setActiveLetter("All"); // Reset the A-Z filter
                                }}
                                className="mt-4 inline-block font-bold py-2 px-4 rounded-md transition-colors duration-200"
                                style={{
                                    backgroundColor: "var(--primary-orange, #f97316)",
                                    color: "var(--neutral-white, #ffffff)",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "var(--button-hover-orange, #ea580c)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "var(--primary-orange, #f97316)")
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
