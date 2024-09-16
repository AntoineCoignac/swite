import { SearchIcon } from "@heroicons/react/outline";
import "./Search.scss";
import SearchResult from "./SearchResult";

export default function Search() {
    return (
        <div className="search">
            <div className="searchbar">
                <SearchIcon className="search-icon mini-icon grey-icon" />
                <input type="text" placeholder="Rechercher un cours" />
            </div>
            <div className="search-results">
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
            </div>
        </div>

    )
}