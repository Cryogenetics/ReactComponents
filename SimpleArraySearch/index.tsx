// this was my first time using TypeScript in a component, and one of my first times using React

import { Input, Dropdown, Row, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface sortOptions {
    name: String,
    func: (a: any, b: any) => number
    }

    interface sortOptionsArray extends Array<sortOptions> {}

    
    //Object that needs string keys
    interface arrayObject {
        [key: string]: any
    }


    
    interface searchProps {
    originalArray: Array<arrayObject>,
    setResult: React.Dispatch<React.SetStateAction<Array<arrayObject>>>,
    searchOptions: Array<string>,
    sortable?: Boolean,
    reversible?: Boolean,
    sortOptions?: sortOptionsArray,
    AscIcon?: React.ReactNode,
    DescIcon?: React.ReactNode,
}

 export default function SearchBar({
    originalArray,
    setResult,
    searchOptions,
    sortable,
    sortOptions,
    reversible,
    AscIcon,
    DescIcon,
}: searchProps) {
    console.log(searchOptions)
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState(searchOptions[0]);
    const [sortBy, setSortBy] = useState(sortOptions![0]?.name);
    const [reversed, setReversed] = useState(false);
    useEffect(() => {
        if (!search && !sortable && !reversible) return setResult(originalArray); // reset the array if no search and no sort
        let result = originalArray;
        if (search && searchBy && search !== "")
            result = originalArray.filter((k) =>
                String(k[searchBy as keyof typeof k])
                    ?.toLowerCase()
                    .startsWith(search.toLowerCase()),
            );
        console.log(result.length);
        if (result.length === 0) result = originalArray;
        console.log("change", reversed, reversible);
        if (sortable && sortOptions!.length > 0)
            result.sort(sortOptions!.find((o) => o.name === sortBy)?.func);
        if (reversible && reversed) result.reverse();
        setResult(result);
    }, [reversed, searchBy, search, sortBy, originalArray]);

    return (
        <Input
            css={{ paddingBottom: "1vh" }}
            type="search"
            aria-label="Search"
            placeholder="Search.."
            name="SearchQuery"
            key="SearchQuery"
            onChange={(event) => {
                setSearch(event.currentTarget.value);
            }}
            labelRight={
                <Row>
                    <Dropdown>
                        <Dropdown.Button
                            aria-label="searchBy"
                            name="searchBy"
                            color={"primary"}
                            light
                        >
                            {searchBy}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Search By"
                            onAction={(value) => {
                                setSearchBy(value as string);
                            }}
                        >
                            {searchOptions?.map((b : String) => {
                                return (
                                    <Dropdown.Item
                                        key={b as React.Key}
                                        color={
                                            searchBy === b
                                                ? "primary"
                                                : "default"
                                        }
                                    >
                                        {b}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    {sortable && sortOptions!.length > 1 && (
                        <Dropdown>
                            <Dropdown.Button
                                aria-label="Sort By"
                                name="SortBy"
                                color={"primary"}
                                light
                            >
                                {sortBy}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Sort By"
                                onAction={(value) => {
                                    setSortBy(value.toString());
                                }}
                            >
                                {sortOptions!.map((b) => {
                                    return (
                                        <Dropdown.Item
                                            key={b.name as React.Key}
                                            color={
                                                sortBy === b.name
                                                    ? "primary"
                                                    : "default"
                                            }
                                        >
                                            {b.name}
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    {reversible && (
                        <Button
                            aria-label="Change Order"
                            auto
                            light
                            onClick={() => setReversed(!reversed)}
                        >
                            {(reversed ? AscIcon : DescIcon)}
                        </Button>
                    )}
                </Row>
            }
        />
    );
}
