import Head from 'next/head';
import StepBar from '../../components/create/StepBar';
import SocialMediaSelection from "@/components/create/SocialMediaSelection";
import {useState} from "react";

const Home = () => {
    const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
    const handleSocialMediaChange = (selected: string[]) => {
        setSelectedSocialMedia(selected);
    };

    return (
        <div>
            <Head>
                <title>Шаговый бар</title>
                <meta name="description" content="Шаговый бар с Ant Design" />
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <main>
                <div className="section-form">
                <h1 style={{margin: "20px",color:"white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Создание Кампании</h1>
                <StepBar />
                </div>
            </main>
        </div>
    );
};

export default Home;