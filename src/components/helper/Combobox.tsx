"use client";

import * as React from "react";
import { ChevronsUpDown, LoaderCircle } from "lucide-react";

import { BASE_URL, cn, handleDelayWheel } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import InputDemo from "@/components/helper/Input-demo";

interface ComboboxDemoProps {
    placeHolder?: string;
    label: string;
    end_point?: string;
    setSelected?: (choice: choice) => void;
    error?: string | null;
}

interface Data {
    next: string | null;
    previous: string | null;
    results: any[] | null;
}

interface Results {
    id: number;
    name: string;
}

interface choice {
    name: string;
    id: number;
}

export function ComboboxDemo({
    placeHolder,
    label,
    end_point,
    setSelected,
    error,
}: ComboboxDemoProps) {
    const containerRef = React.useRef(null);
    const [page, setPage] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState<Data>({ next: "", previous: "", results: [] });
    const [results, setResults] = React.useState<Results[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [isStartFetch, setIsStartFetch] = React.useState(false);
    const [paginateLoading, setPaginateLoading] = React.useState(false);

    function handleChoice(choice: choice) {
        setValue(choice.name);
        setOpen(false);
        setSearch("");
        setIsStartFetch(false);
        setSelected?.(choice);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        setIsStartFetch(true);
    }

    function fetchMoreData() {
        if (data?.next && search.length === 0 && !loading) {
            setPage(page + 1);
            setPaginateLoading(true);
            setIsStartFetch(true);
        }
    }

    const handleScroll = () => {
        const section = containerRef.current;
        if (section) {
            const { scrollTop, clientHeight, scrollHeight } = section;

            if (scrollTop + clientHeight >= scrollHeight) {
                fetchMoreData();
            }
        }
    };

    React.useEffect(() => {
        if (search) {
            if (isStartFetch) {
                let timeOut = setTimeout(() => {
                    setLoading(true);
                    // Your search logic here
                    fetch(BASE_URL + `${end_point}?search=${search}&page=1`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((res) => res.json())
                        .then((resultData) => {
                            setData(resultData);
                            setResults(resultData?.results);
                        })
                        .catch((err) => console.error(err))
                        .finally(() => {
                            setPaginateLoading(false);
                            setLoading(false);
                            setIsStartFetch(false);
                        });
                }, 1000);
                return () => clearTimeout(timeOut);
            }
        } else {
            if (isStartFetch) {
                setLoading(true);
                // Your search logic here
                fetch(
                    BASE_URL +
                    `${end_point}?search=${search}&page=${page}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((resultData) => {
                        setData(resultData);
                        if (page === 1) {
                            setResults(resultData?.results);
                        } else {
                            setResults([...results, ...resultData?.results]);
                        }
                    })
                    .catch((err) => console.error(err))
                    .finally(() => {
                        setPaginateLoading(false);
                        setLoading(false);
                        setIsStartFetch(false);
                    });
            }

        }
    }, [search, page, isStartFetch]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div>
                    <p className="text-[13px]">{label}</p>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("w-full flex justify-between font-light border border-gray-300", error && "border-red-800")}
                        onClick={() => setIsStartFetch(true)}
                        type="button"
                    >
                        <p className="max-w-[280px] truncate line-clamp-1">
                            {value ? value : placeHolder || "Select an item . . ."}
                        </p>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    {error ? (
                        <p className="text-red-800 text-xs pt-1 m-0">{error}</p>
                    ) : null}
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <div className="relative z-10">
                    <InputDemo
                        id="framework"
                        type="text"
                        placeHolder="What Are You Looking For ......"
                        onChange={handleChange}
                        value={search}
                        inputStyle="bg-inherit border"
                    />
                    {loading && !paginateLoading ? (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <LoaderCircle size={23} className="animate-spin text-primary" />
                        </div>
                    ) : results?.length === 0 ? (
                        <div className="flex items-center justify-center gap-2 text-gray-400 min-h-[200px]">
                            No Results found. Try a different search ...
                        </div>
                    ) : (
                        <div
                            ref={containerRef}
                            onScroll={handleScroll}
                            className="flex flex-col gap-2 p-2 max-h-[200px] overflow-y-scroll "
                            key="container"
                            onWheel={handleDelayWheel}
                        >
                            {results?.map((item: Results) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        handleChoice(item);
                                    }}
                                    className={cn(
                                        "flex items-center hover:bg-gray-100 cursor-pointer p-2",
                                        value === item.name && "bg-gray-100"
                                    )}
                                >
                                    {item.name}
                                </div>
                            ))}
                            {paginateLoading && loading && (
                                <div className="flex items-center justify-center">
                                    <LoaderCircle
                                        size={23}
                                        className="animate-spin text-primary"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
