import SearchBar from "../../components/shared/SearchBar";
import { useState, useEffect } from 'react';
import React from "react"; // required for some reason, don't know why

//material UI icon imports
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// requires @nextui-org/react
// requires @mui/icons-material


export default function example() {
    const initialArray = [
        {
            name: "test",
            value: "test",
            numberValue: 1,
        },      
        {
            name: "testa",
            value: "testa",
            numberValue: 2,
        },
    ];
    const [originalArray, setOriginalArray] = useState(initialArray); // if you do polling this is useful
    const [resultArray, setResultArray] = useState(initialArray); // this is the result of the search

    return (
        <>
        <SearchBar
            originalArray={originalArray || initialArray} // original array that doesn't change ( also showing you can pass in a static array)
            setResult={setResultArray} // accepts setState or custom function
            searchOptions={["name", "value"]} // keys you can search by
            sortable // marks it as sortable (boolean, optional)
            sortOptions={[
                {
                    name: "default", // displayValue
                    func: () => {}, // return original array
                },
                {
                    name: "alphabetical",
                    func: function (a, b) {
                        return a.name.localeCompare(b.key); // sort alphabetically
                    },
                },
                {
                    name: "value",
                    func: function (a, b) {
                        return b.numberValue - a.numberValue; // sort numbers
                    },
                },
            ]}
            reversible // mark that it can change desc/asc
            AscIcon={
                // icon to use for ascending
                <ArrowUpwardIcon
                color="primary"
                aria-label="Switch to Descending"
                />
            }
            DescIcon={
                // icon to use for descending
                <ArrowDownwardIcon
                color="primary"
                aria-label="Switch to Ascending"
                />
            }
            />
            {
                resultArray.map((k) => {
                    return <div>{k.name} : {k.value}</div>;
                })
            }
            </>
    );
}
