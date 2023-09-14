import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Select, Switch, Button, InputNumber, Space, Modal, Result} from 'antd';
import {
    FireTwoTone,
    HeartTwoTone,
    MessageTwoTone,
    MinusCircleOutlined,
    PlusOutlined,
    SmileOutlined
} from '@ant-design/icons';
import {v4 as uuidv4} from 'uuid';
import TagsForm from "@/components/create/TagsForm";
import {KampaniaDto} from "@/api/dto/kampania.dto";
import axios from "axios";


const limit = [
    {
        name: "VK",
        maxButStand: 40,
        maxLenStand: -1,
        linkStand: true,
        maxButInl: 10,
        maxLenInl: -1,
        linkInl: true,

    },
    {
        name: "WhatsApp",
        maxButStand: 10,
        maxLenStand: 20,
        linkStand: false,
        maxButInl: 3,
        maxLenInl: 20,
        linkInl: true,
    },
    {
        name: "Telegram",
        maxButStand: -1,
        maxLenStand: -1,
        linkStand: false,
        maxButInl: -1,
        maxLenInl: 64,
        linkInl: true,
    },
    {
        name: "SMS",
        maxButStand: -1,
        maxLenStand: -1,
        linkStand: false,
        maxButInl: -1,
        maxLenInl: -1,
        linkInl: false,
    },
];

const FormCreateKampania: React.FC<{ socialMedia: string ,coreId:number}> = ({socialMedia,coreId}) => {
    const [inlineKeyboard, setInlineKeyboard] = useState(false);
    const [fieldsCount, setFieldsCount] = useState(0);
    const [showLimitExceededModal, setShowLimitExceededModal] = useState(false);
    const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
    const [tags, setTags] = useState(['Кнопка 1', 'Кнопка 2', 'Кнопка 3']);
    const [showImage, setShowImage] = useState(false);

    const selectedLimit = limit.find(item => item.name === socialMedia);
    if (!selectedLimit) {
        return null;
    }

    const handleClose = (newTags: string[]) => {
        setTags(newTags);
    };
    const handleCount = (count: number) => {
        setFieldsCount(fieldsCount);
    };
    const onSubmit=async (values: KampaniaDto) =>{
        try {
            const dataToSend = {
                selectNet: values.selectNet,
                text: values.text,
                inline: values.inline,
                butStand: values.butStand,
                butInl: values.butInl,
                coreId: coreId,
            };
            console.log(dataToSend);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ORIGIN}/kampania/add`, dataToSend);
            // const response = await axios.post('http://localhost:3001/kampania/add', dataToSend);

            setShowImage(true);
        }catch (err){
            console.warn("Данные не переданы", err)
        }
    };




    const handleInlineKeyboardChange = (checked: boolean) => {
        setInlineKeyboard(checked);
    };


    return (

        <>
            {!showImage && (
                <div className="content-container" style={{background: '#ffe8f2'}} >
                <Form   onFinish={(values) => {
                    const dataToSend = {
                        ...values,
                        tags,
                        socialMedia,
                    };
                    const socData=dataToSend.socialMedia;
                    const messData=dataToSend.message;
                    const inlData=dataToSend.inlineKeyboard;
                    const tagsData=dataToSend.tags;
                    const urlData=dataToSend.butUrl;
                    const dataDto={
                        selectNet: socData,
                        text: messData,
                        inline: inlData|| false,
                        butStand: tagsData|| [],
                        butInl: urlData || [],
                    }
                    console.log(dataDto);

                    onSubmit(dataDto);

                    console.log('Отправить данные на бэкенд', dataToSend);
                }}>
                    <h1>{socialMedia}</h1>
                    <Form.Item
                        label="Текст сообщения"
                        name="message"
                        rules={[
                            {required: true, message: 'Введите текст сообщения'},
                        ]}
                    >
                        {(socialMedia === 'VK' || socialMedia === "Telegram") && (
                            <div>
                                <Input.TextArea
                                    showCount
                                    maxLength={4096}
                                    style={{height: 120, resize: 'none'}}
                                    placeholder="Введите ваше сообщение"
                                />
                                <div>Максимальное количество символов: 4096</div>
                            </div>)}
                        {socialMedia === 'WhatsApp' && (
                            <div>
                                <Input.TextArea
                                    showCount
                                    maxLength={1000}
                                    style={{height: 120, resize: 'none'}}
                                    placeholder="Введите ваше сообщение"
                                />
                                <div>Максимальное количество символов: 1000</div>

                            </div>)}
                        {socialMedia === 'SMS' && (
                            <div>
                                <Input.TextArea
                                    showCount
                                    style={{height: 120, resize: 'none'}}
                                    placeholder="Введите ваше сообщение"
                                />
                                <div>Максимальное количество символов: -</div>

                            </div>)}
                    </Form.Item>

                    {socialMedia != 'SMS' && (
                        <Form.Item label="Режим отображения" name="inlineKeyboard" valuePropName="checked">
                            <Switch onChange={handleInlineKeyboardChange} checkedChildren="inline"
                                    unCheckedChildren="стандартный"/>
                        </Form.Item>
                    )}

                    {inlineKeyboard && socialMedia != 'SMS' && (
                        <>
                            <Form.Item label="Теги" name="tagsbut">
                                <TagsForm tags={tags} onTagsChange={handleClose} fieldValues={fieldsCount}
                                          setFieldsCount={handleCount} maxCountBut={selectedLimit.maxButInl}
                                          maxLen={selectedLimit.maxLenInl}/>
                            </Form.Item>

                            {selectedLimit.linkInl && (<Form.List name="butUrl">
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, ...restField}) => (
                                            <Space key={key} style={{display: 'flex', marginBottom: 8}}
                                                   align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name]}

                                                    label="URL"
                                                    rules={[{required: true, message: 'Missing URL'}, {
                                                        type: 'url',
                                                        message: "URL задан неправильно"
                                                    }, {
                                                        type: 'string',
                                                        min: 6,
                                                        warningOnly: true,
                                                        message: "Минимум 6 символов"
                                                    }]}
                                                >
                                                    <Input
                                                        maxLength={selectedLimit.maxLenInl === -1 ? undefined : selectedLimit.maxLenInl}
                                                        placeholder="input placeholder"/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => {
                                                    remove(name);
                                                    setFieldsCount(fieldsCount - 1);
                                                }
                                                }/>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => {
                                                if (fieldsCount + 1 + tags.length <= selectedLimit.maxButInl || selectedLimit.maxButInl === -1 || (selectedLimit.name === "WhatsApp" && fieldsCount < 1 && fieldsCount + 1 + tags.length <= selectedLimit.maxButInl)) {
                                                    add();
                                                    setFieldsCount(fieldsCount + 1);
                                                } else {
                                                    setShowLimitExceededModal(true);
                                                }
                                            }} block icon={<PlusOutlined/>}>
                                                Добавить кнопку-ссылку
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>)}
                        </>)}

                    {!inlineKeyboard && socialMedia != 'SMS' && (
                        <>
                            <Form.Item label="Теги" name="tagsbut">
                                <TagsForm tags={tags} onTagsChange={handleClose} fieldValues={fieldsCount}
                                          setFieldsCount={handleCount} maxCountBut={selectedLimit.maxButStand}
                                          maxLen={selectedLimit.maxLenStand}/>
                            </Form.Item>

                            {selectedLimit.linkStand && (<Form.List name="butUrl">
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, ...restField}) => (
                                            <Space key={key} style={{display: 'flex', marginBottom: 8}}
                                                   align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name]}

                                                    label="URL"
                                                    rules={[{required: true, message: 'Missing URL'}, {
                                                        type: 'url',
                                                        message: "URL задан неправильно"
                                                    }, {
                                                        type: 'string',
                                                        min: 6,
                                                        warningOnly: true,
                                                        message: "Минимум 6 символов"
                                                    }]}
                                                >
                                                    <Input
                                                        maxLength={selectedLimit.maxLenStand === -1 ? undefined : selectedLimit.maxLenStand}
                                                        placeholder="input placeholder"/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => {
                                                    remove(name);
                                                    setFieldsCount(fieldsCount - 1);
                                                }
                                                }/>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => {
                                                if (fieldsCount + 1 + tags.length <= selectedLimit.maxButStand || selectedLimit.maxButStand === -1) {
                                                    add();
                                                    setFieldsCount(fieldsCount + 1);
                                                } else {
                                                    setShowLimitExceededModal(true);
                                                }
                                            }} block icon={<PlusOutlined/>}>
                                                Добавить кнопку-ссылку
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>)}
                        </>)}

                    {selectedLimit.name === "WhatsApp" && (
                        <Modal
                            title="Внимание"
                            open={showLimitExceededModal}
                            onOk={() => setShowLimitExceededModal(false)}
                            onCancel={() => setShowLimitExceededModal(false)}
                        >
                            Всего доступно {selectedLimit.maxButInl}шт. кнопок и всего 1 кнопка-ссылка.
                        </Modal>)}
                    {selectedLimit.name != "WhatsApp" && (<Modal
                        title="Внимание"
                        open={showLimitExceededModal}
                        onOk={() => setShowLimitExceededModal(false)}
                        onCancel={() => setShowLimitExceededModal(false)}
                    >
                        Всего доступно {selectedLimit.maxButInl} кнопок.
                    </Modal>)}


                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>

                </Form>
                </div>)}

            {showImage && socialMedia=="VK" && (
                <Result
                    icon={<SmileOutlined/>}
                    title="Great, we have done the VK operations!"
                />
            )}
            {showImage && socialMedia=="SMS" && (
                <Result
                    icon={<MessageTwoTone />}
                    title="Отлично, данные по SMS сохранены!"
                />
            )}
            {showImage && socialMedia=="WhatsApp" && (
                <Result
                    icon={<HeartTwoTone />}
                    title="WhatsApp-информация передана!"
                />
            )}
            {showImage && socialMedia=="Telegram" && (
                <Result
                    icon={<FireTwoTone />}
                    title="Самолётик с инофрмацией о Telegram отправлен!"
                />
            )}
        </>

    );
};

export default FormCreateKampania;
