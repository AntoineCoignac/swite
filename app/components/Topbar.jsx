import { ArrowLeftIcon } from "@heroicons/react/outline";
import "./Topbar.scss";
import { useRouter } from "next/navigation";

export default function Topbar({title="Lorem ipsum", to=null, content=null, isLoading=false, onClick=null}) {
    const router = useRouter();

    const goBack = () => {
        if (onClick) {
            onClick();
        }
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
                {isLoading ?
                <span className="blank-text-medium"></span>
                :
                <span className="text-white text-medium" id="topbar-title">{title}</span>
                }
            </button>
            <div className="right-wrapper">
                {content && isLoading ?
                <div className="blank-button"></div>
                :
                content
                }
            </div>
        </div>
    )
}