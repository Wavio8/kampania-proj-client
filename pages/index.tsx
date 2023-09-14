import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {Button} from "antd";
import Link from "next/link";


export default function Home() {
    return (
        <>
            <Head>
                <title>Kampania App</title>
                {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}

            </Head>



            <section className="welcomeKampania" style={{
                background: 'url("/chat.png") center no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>

                <h3 className="welcome__subtitle">Hello, world.(напиши это или что угодно)</h3>
                <h1 className="welcome__title">Создай Кампанию!</h1>
                <div className="short_description">
                <span className="short_description__name">
                    Общение с клиентами
                </span>
                    <span className="short_description__name">
                    Настройка сообщений
                </span>

                </div>

                <Link href="/create"
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "20px"}}>
                    <Button type="primary" size="large" style={{background: '#ff43a4'}}>Создать Kампанию</Button>
                </Link>
            </section>
            <section className="review">
                <div className="diff">
                    <div className="text_part">
                        <h3 className="review__subtitle">Кто же мы?</h3>
                        <h2 className="review__title">Давай знакомиться</h2>
                        <p className="review__text">
                            Приложение <strong>Fromni</strong> позволяет пользователям инициировать общение со своими клиентами,
                            отправляя Кампании в различные мессенджеры и социальные сети. Для этого пользователю
                            необходимо указать каналы отправки и их порядок и настроить сообщение для каждого из них.
                            Помимо текста в некоторых каналах сообщение может содержать клавиатуру с кнопками,
                            позволяющими выбрать один из быстрых ответов или перейти на сторонний веб-сайт.
                            <Link href="/allKampania"
                                  style={{ padding: "20px", width:"100%"}}>
                                <Button type="primary" size="large" style={{background: '#ff43a4',marginTop:"30px"}}>Посмотреть все Кампании</Button>
                            </Link>

                        </p>

                    </div>
                    <div className="photo_part" style={{paddingTop: '30px',}}>

                        <img className="review__photo" src="/mes.jpg" alt=""/>
                    </div>
                </div>
                <aside className="results">
                    <article className="result__item">
                        <h4 className="result__count">50</h4>
                        <span className="result__text">
                    тысяч клиентов
                </span>
                    </article>
                    <article className="result__item">
                        <h4 className="result__count">4</h4>
                        <span className="result__text">
                    Социальные сети
                </span>
                    </article>
                    <article className="result__item">
                        <h4 className="result__count">105</h4>
                        <span className="result__text">
                    Положительных отзыва
                </span>
                    </article>
                    <article className="result__item">
                        <h4 className="result__count">2</h4>
                        <span className="result__text">
                    Режима отображения
                </span>
                    </article>
                </aside>
            </section>
        </>
    )
}
