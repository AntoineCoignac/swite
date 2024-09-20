import Link from "next/link";
import "./CtaCard.scss";
import { useRouter } from "next/navigation";

export default function CtaCard({title="", button="", to="/", style=""}) {
    const router = useRouter();

    const handleClick = () => {
        router.push(to);
    }

    return (
        <div onClick={handleClick} className={`cta-card ${style}`}>
            <div className="cta-card-wrapper">
                <span className="text-regular text-white" id="title">{title}</span>
                <span id="no-click-btn">{button}</span>
            </div>
        </div>
    )
}