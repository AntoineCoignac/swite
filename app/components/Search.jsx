'use client'

import { SearchIcon } from "@heroicons/react/outline";
import "./Search.scss";
import SearchResult from "./SearchResult";
import NoResult from "./NoResult";
import { useState, useEffect } from "react";

export default function Search() {
    const [texts, setTexts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTexts, setFilteredTexts] = useState([]);

    useEffect(() => {
        fetchTexts();
    }, []);

    useEffect(() => {
        filterTexts();
    }, [searchTerm, texts]);

    const fetchTexts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/text/all');
            if (response.ok) {
                const data = await response.json();
                setTexts(data);
                console.log(data);
            } else {
                console.error('Failed to fetch texts');
            }
        } catch (error) {
            console.error('Error fetching texts:', error);
        }
    };

    const filterTexts = () => {
        const filtered = texts.filter(text =>
            text.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTexts(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search">
            <div className="searchbar">
                <SearchIcon className="search-icon mini-icon grey-icon" />
                <input type="text" placeholder="Rechercher un cours" onChange={handleSearchChange} value={searchTerm} />
            </div>
            <div className="search-results">
                {filteredTexts.length > 0 ? (
                    filteredTexts.map(text => (
                        <SearchResult 
                            key={text._id}
                            url={`/${text._id}`}
                            title={text.title}
                            time={`${Math.ceil(text.text.split(' ').length / 200)} min`}
                            date={new Date(text.createdAt).toLocaleDateString()}
                        />
                    ))
                ) : (
                    <NoResult />
                )}
            </div>
        </div>

    )
}