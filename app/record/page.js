"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import Topbar from "../components/Topbar";
import StopRecordButton from "../components/StopRecordButton";
import "./record.scss";
import NoResult from "../components/NoResult";

function createGrammarList() {
    const words = [
        // Académique
        "université",
        "école",
        "cours",
        "étudiant",
        "étudiante",
        "professeur",
        "professeure",
        "université",
        "prépa",
        "bac",
        "lycée",
        "collège",
        "école",
        "élève",
        // Informatique
        "algorithm",
        "database",
        "programming",
        "software",
        "hardware",
        // Réseau
        "network",
        "router",
        "firewall",
        "protocol",
        "bandwidth",
        "IP",
        "IPV4",
        "IPV6",
        "DNS",
        "TCP",
        "UDP",
        "HTTP",
        "HTTPS",
        "FTP",
        "SMTP",
        "POP3",
        "IMAP",
        "SSL",
        "TLS",
        "VPN",
        "MAC",
        "WLAN",
        "LAN",
        "PAN",
        "USB",
        "HDMI",
        "VGA",
        "DVI",
        "HDMI",
        "EGP",
        "IGP",
        "OSPF",
        "BGP",
        "VLAN",
        "VXLAN",
        "STP",
        "RSTP",
        "MSTP",
        "HSRP",
        "VRRP",
        "AS",
        "Peering",
        "Transit",
        "WIFI",
        "Bluetooth",
        "WiMAX",
        "LTE",
        "5G",
        "4G",
        "3G",
        "2G",
        "1G",
        "Ethernet",
        "RJ45",
        "pair",
        "impair",
        "client",
        "serveur",
        "switch",
        "socket",
        "OSI",
        "TCP/IP",
        "OS",
        "Windows",
        "Linux",
        "MacOS",
        "Unix",
        "Debian",
        "Ubuntu",
        "Fedora",
        "Mageia",
        "Arch Linux",
        "Gentoo",
        "Slackware",
        "OpenBSD",
        "FreeBSD",
        "NetBSD",
        "Solaris",
        "AIX",
        "HP-UX",
        "en-tête",
        "SCP",
        "ping",
        "Wireshark",
        "Arpanet",
        "bits",
        "octets",
        "kilooctets",
        "mégaoctets",
        "gigaoctets",
        "teraoctets",
        "noyau",
        "kernel",
        "système d'exploitation",
        "segment TCP",
        "handshaking",
        // Cybersécurité
        "cybersécurité",
        "vulnérabilité",
        "attaque",
        "exploit",
        "malware",
        "virus",
        "ransomware",
        "spyware",
        "adware",
        "trojan",
        "osint",
        "phishing",
        "hacking",
        "cracker",
        "cybercriminal",
        "cyberattaque",
        "cybersecurité",
        "cybersécurité",
        "cybermenace",
        "blacklist",
        "whitelist",
        "blacklister",
        // VR
        "virtual reality",
        "augmented reality",
        "headset",
        "immersive",
        "haptic",
        "VR",
        "AR",
        "MR",
        "XR",
        "Vision",
        "Reality",
        "3D",
        "Unreal Engine",
        "Unity",
        "Unreal",
        // Développement
        "API",
        "framework",
        "Git",
        "DevOps",
        "agile",
        "debug",
        "debugging",
        "Node",
        "React",
        "Vue",
        "Angular",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "PHP",
        "SQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Express",
        "React Native",
        "Flutter",
        "Swift",
        "Objective-C",
        "C#",
        "C++",
        "C",
        "Java",
        "Kotlin",
        "Python",
        "Ruby",
        "PHP",
        "Perl",
        "Assembly",
        "Symfony",
        "Laravel",
        "Django",
        "Ruby on Rails",
        "ASP.NET",
        "Spring",
        "Hibernate",
        "JPA",
        "JDBC",
        "JSP",
        "Servlet",
        "JQuery",
        "AJAX",
        "JSON",
        "XML",
        "XHTML",
        "Mongoose",
        "Sequelize",
        "Express",
        "synchrone",
        "asynchrone",
        "callback",
        "promise",
        "async/await",
        "thread",
        "threads",
        "process",
        "reset",
        "reboot",
        "shutdown",
        "start",
        "stop",
        "restart",
        "pause",
        "resume",
        "suspend",
        // Audiovisuel
        "codec",
        "streaming",
        "resolution",
        "bitrate",
        "compression",
        "streaming",
        "Twitch",
        "YouTube",
        "Facebook",
        "Instagram",
        "Twitter",
        "LinkedIn",
        "Snapchat",
        "TikTok",
        "Pinterest",
        "Tumblr",
        "Vimeo",
        "Spotify",
        "SoundCloud",
        "Apple Music",
        "Amazon Music",
        "Google Music",
        "YouTube Music",
        "Deezer",
        "Tidal",
        "FL",
        "MP3",
        "MP4",
        "AVI",
        "MOV",
        "WMV",
        "MPEG",
        "H.264",
        "H.265",
        "HEVC",
        "HLS",
        "FL studio",
        "Logic Pro",
        "Pro Tools",
        "Audacity",
        "Adobe Audition",
        "Sound Forge",
        "Waves",
        "REAPER",
        "Ableton Live",
        "Cubase",
        "DaVinci Resolve",
        "Final Cut Pro",
        "Premiere Pro",
        "After Effects",
        "Photoshop",
        "Illustrator",
        "InDesign",
        "Maya",
        "3ds Max",
        "Figma",
        "Sketch",
        "Adobe XD",
        "InVision",
        "Zeplin",
        "UXPin",
        "Framer",
        "Adobe XD",
        "InVision",
        "Zeplin",
        // Marketing
        "SEO",
        "analytics",
        "conversion",
        "branding",
        "engagement",
        "CEO",
        "CFO",
        "CTO",
        "CMO",
        "COO",
        "CIO",
        "CSO",
        "CRO",
        "Digital Marketing",
        "Marketing Strategy",
        "Marketing Plan",
        "Marketing Campaign",
        "Marketing Mix",
        "Marketing Research",
        "Marketing Analysis",
        "Marketing Budget",
        "MRR",
        "ARR",
        "Business plan",
        "Ranking",
        "SERP",
        "SEA",
        // Gaming
        "gameplay",
        "console",
        "multiplayer",
        "esports",
        "rendering",
        "heal",
        "Call of Duty",
        "Fortnite",
        "PUBG",
        "Apex Legends",
        "Valorant",
        "League of Legends",
        "Dota 2",
        "Counter-Strike",
        "Overwatch",
        "CS",
        "COD",
        "Minecraft",
        "Manette",
        "Switch",
        "Playstation",
        "Xbox",
        "Nintendo",
        "Gamepad",
        "Joystick",
        "Game",
        "Gameplay",
        "PC",
        // Électronique
        "microcontroller",
        "circuit",
        "sensor",
        "transistor",
        "PCB",
        "Arduino",
        "Raspberry Pi",
        "ESP32",
        "ESP8266",
        "STM32",
        "PIC",
        "AVR",
        "ARM",
        "8051",
        "PIC",
        "STM32",
    ];

    return `#JSGF V1.0;
    grammar technicalTerms;
    public <techWord> = ${words.join(" | ")};`;
}

export default function Record() {
    const { status } = useSession();
    const router = useRouter();
    const textWrapperRef = useRef(null);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const { transcript } = useSpeechRecognition();

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            const grammar = createGrammarList();
            const speechRecognitionList = new webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);

            SpeechRecognition.startListening({
                continuous: true,
                language: "fr-FR",
                interimResults: true,
                grammars: speechRecognitionList,
            });
            setIsRunning(true);
        }
    }, [status, router]);

    useEffect(() => {
        if (textWrapperRef.current) {
            textWrapperRef.current.scrollTop = textWrapperRef.current.scrollHeight;
        }
    });

    const handleStopRecord = async () => {
        SpeechRecognition.stopListening();
        setIsRunning(false);
        try {
            const response = await fetch("/api/text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: transcript }),
            });

            if (response.ok) {
                const { data } = await response.json();
                router.push(`/${data.id}/edit`);
            } else {
                router.push(`/`);
            }
        } catch (error) {
            console.error("Error saving text:", error);
        }
    };

    const handleStopBeforeBack = () => {
        SpeechRecognition.stopListening();
        setIsRunning(false);
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return [hours, minutes, remainingSeconds]
            .map((v) => (v < 10 ? "0" + v : v))
            .join(":");
    };

    if (status === "loading") {
        return <div></div>;
    }

    return (
        <div className="record-wrapper">
            <Topbar title="Enregistrer" onClick={handleStopBeforeBack}/>
            <div className="content-wrapper">
                <div className="text-wrapper" ref={textWrapperRef}>
                    {transcript.length > 0 ? (
                        <span className="text-medium text-white" id="speech-text">
                            {transcript}
                        </span>
                    ) : (
                        <NoResult
                            emotion="happy"
                            text="Ah super ! J'écoute. Le texte s'affichera ici."
                        />
                    )}
                </div>
                <div className="time-wrapper">
                    <span className="text-medium text-grey font-mono" id="time">
                        {formatTime(time)}
                    </span>
                </div>
            </div>
            <StopRecordButton onClick={handleStopRecord} />
        </div>
    );
}
