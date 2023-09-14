import Head from 'next/head';
import StepBar from '../../components/create/StepBar';
import SocialMediaSelection from "@/components/create/SocialMediaSelection";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, ConfigProvider} from "antd";
import {CoreKampDto} from "@/api/dto/coreKamp.dto";
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd'
import Link from "next/link";
const Home = () => {
    const [data, setData] = useState<CoreKampDto[] | null>(null);
    const gridStyle: React.CSSProperties = {
        width: "100%",
        textAlign: 'center',
        color: "#444c65",


    };



    useEffect(() => {
        fetchData()
            .then((responseData) => {
                setData(responseData);

            })
            .catch((error) => {
                console.log("Ошибка при запросе")
            });
    }, []);


    async function fetchData() {
        try {


            const response = await axios.get(`${process.env.NEXT_PUBLIC_ORIGIN}/coreKamp/coreKamps`);
            console.log(response.data.coreKamp)
            const coreKamps: CoreKampDto[] = response.data.coreKamp;
            console.log(coreKamps);
            return coreKamps;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    }

    return (
        <div>
            <Head>
                <title>Все Кампании</title>
                <meta name="description" content="Все кампании"/>
            </Head>



            <main style={{ display: 'flex', justifyContent: 'center', textAlign:"center",  background: "#fff0f5"}}>
                <Link href="/"
                      style={{ padding: "20px"}}>
                    <Button type="primary" size="large" style={{background: '#ff43a4'}}>На главную</Button>
                </Link>
                <Card title="Все Кампании" style={{ width: "75%"}}>
                    {data !== null && (

                        <>

                            {[...data].reverse().map((item, index) => (

                                <Card.Grid key={index} style={gridStyle}>

                                    <h4> Название:</h4>
                                    <h3 className="welcome__subtitle" style={{ marginTop: "15px"}}>{item.name}</h3>
                                    {item.kampania.map((itemKamp, index) => (
                                        <div key={index}>
                                        <h4 >{index+1}) Социальная сеть:{itemKamp.selectNet}</h4>
                                        <Collapse items={ [
                                            {
                                                key: '1',
                                                label: 'Текс сообщения',
                                                children: <p>{itemKamp.text}</p>,
                                            },
                                            {
                                                key: '2',
                                                label: 'Режим отображения',
                                                children: <p>{itemKamp.inline ? 'inline-отображение' : 'Стандартное отображение'}</p>,
                                            },
                                            {
                                                key: '3',
                                                label: 'Кнопки быстрого ответа',
                                                children: <p>{itemKamp.butStand.map((i,ind)=>(i))}</p>,
                                            },{
                                                key: '4',
                                                label: 'Кнопки ответа - ccылки',
                                                children: <p>{itemKamp.butInl.map((i,ind)=>(i))}</p>,
                                            },
                                        ]} defaultActiveKey={['0']}  />
                                        </div>
                                    ))}






                                </Card.Grid>

                            ))}
                        </>

                    )}
                </Card>


            </main>
        </div>
    );
};

export default Home;