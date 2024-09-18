'use client'

import "./RecordButton.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RecordButton() {
    const { status } = useSession();
    const router = useRouter();

    const handleRecord = () => {
        router.push("/record");
    }

    const handleSignIn = async () => {
        await signIn("google", { callbackUrl: "/record" });
    }

    return(
        <div className="record-button">
            <button onClick={status === "authenticated" ? handleRecord : handleSignIn} className="record-button-wrapper">
                <span className="record-button-icon"></span>
            </button>
        </div>
    )
}