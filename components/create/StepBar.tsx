import React, {useState} from 'react';
import {Button, message, Steps, theme, Input, ConfigProvider} from 'antd';
import SocialMediaSelection from "@/components/create/SocialMediaSelection";
import FormCreateKampania from "@/components/create/FormCreateKampania";
import axios from "axios";
import {useRouter} from 'next/router';
import Link from "next/link";

const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];

const StepBar: React.FC = () => {
    const router = useRouter();
    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
    const [companyName, setCompanyName] = useState('');
    const [currentId, setCurrentId] = useState(0);
    const handleSocialMediaChange = (selected: string[]) => {
        setSelectedSocialMedia(selected);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
    };


    const handleSubmit = async () => {
        try {
            const dataToSend = {
                name: companyName,
            };

            const response = await axios.post(`${process.env.NEXT_PUBLIC_ORIGIN}/coreKamp/add`, dataToSend);
            let data = response.data.id;
            setCurrentId(data);
            console.log('Ответ от бэкенда:', response.data.id);
            setCurrent(current + 1);
        } catch (error) {
            console.error('Ошибка при отправке на бэкенд:', error);
        }
    };
    const handleNext = () => {
        if (selectedSocialMedia.length === 0) {
            message.error('Выберите хотя бы одну социальную сеть');
        } else {
            setCurrent(current + 1);
        }
    };

    const handleDone = async () => {
        try {
            message.success('Processing complete!')
            console.log(currentId);
            // console.log('http://localhost:3001/kampania/findAll/`${currentId}`');
            // const response = await axios.get(`http://localhost:3001/kampania/findAll/${currentId}`);
            // console.log(response);

            await router.push(`${process.env.NEXT_PUBLIC_ORIGIN}/allKampania`);

        } catch (error) {
            console.error('Ошибка при отправке на бэкенд:', error);
        }
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({key: item.title, title: item.title}));

    const forms = selectedSocialMedia.map((socialMedia, index) => {
        return <FormCreateKampania key={index} socialMedia={socialMedia} coreId={currentId}/>;
    });

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimary: '#444c65',
                        borderRadius: 2,
                        colorText: "#444c65",


                        // Alias Token
                        colorBgContainer: 'white',
                    },
                }}
            >
                <Steps current={current} items={items} style={{
                    padding: "0 30px",
                    color: "white",
                }}/>
            </ConfigProvider>
            <div className="content-container" style={{
                display: "flex", flexDirection: 'column',
                alignItems: 'center',
                height: '100vh'
            }}>
                {current === 0 && (
                    <SocialMediaSelection
                        selectedSocialMedia={selectedSocialMedia}
                        onSocialMediaChange={handleSocialMediaChange}
                    />

                )}
                {current === 1 && (
                    <>
                        <Input
                            placeholder="Введите имя компании"
                            value={companyName}
                            onChange={handleInputChange}
                        />
                        {/*<Button type="primary" onClick={handleSubmit}>*/}
                        {/*    Назвать*/}
                        {/*</Button>*/}
                    </>
                )}

                {current === 2 && (

                    forms
                )}

                <div style={{marginTop: 24}}>
                    {current < steps.length - 1 && current != 0 && current != 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === 1 && (
                        <Button type="primary" onClick={handleSubmit}>
                            Next
                        </Button>
                    )}
                    {current === 0 && (
                        <Button type="primary" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Link href="/allKampania">
                            <Button type="primary" onClick={handleDone}>
                                Done
                            </Button>
                        </Link>
                    )}
                    {current > 0 && (
                        <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default StepBar;