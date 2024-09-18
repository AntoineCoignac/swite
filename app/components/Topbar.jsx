import { ArrowLeftIcon } from "@heroicons/react/outline";
import "./Topbar.scss";
import { useRouter } from "next/navigation";

export default function Topbar({title="Lorem ipsum", to, content=null}) {
    const router = useRouter();

    const goBack = () => {
        if(to){
            router.push(to);
        }else{
            window.history.back();
        }
    }

    return(
        <div className="topbar">
            <button className="back-button" onClick={goBack}>
                <ArrowLeftIcon className="white-icon regular-icon"/>
                <span className="text-white text-medium" id="topbar-title">{title}</span>
            </button>
            <div className="right-wrapper">
                {content}
            </div>
        </div>
    )
}