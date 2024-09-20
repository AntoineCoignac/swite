import Link from "next/link";
import "./CtaCard.scss";

export default function CtaCard({title="", button="", to="/", style=""}) {
    return (
        <Link href={to} className={`cta-card ${style}`}>
            <div className="cta-card-wrapper">
                <span className="text-regular white-text">{title}</span>
                <span className="no-click-btn">{button}</span>
            </div>
        </Link>
    )
}