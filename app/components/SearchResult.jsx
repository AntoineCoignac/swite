import Link from "next/link";
import "./SearchResult.scss";

export default function SearchResult({url="/", title="Lorem ipsum dolor", time="12 min", date="12/01/2024"}) {


    return(
        <Link href={url} className="search-result">
            <div className="left-wrapper">
                <p className="text-white text-regular" id="search-result-title">{title}</p>
                <p className="text-grey text-small">{date}</p>
            </div>
            <div className="right-wrapper">
                <p className="text-grey text-small" id="search-result-time">{time}</p>
            </div>
        </Link>
    )
}