import {Checkbox, Row, Col, ConfigProvider} from 'antd';
import React from "react";

interface SocialMediaSelectionProps {
    selectedSocialMedia: string[];
    onSocialMediaChange: (selected: string[]) => void;
}

const SocialMediaSelection: React.FC<SocialMediaSelectionProps> = ({
                                                                       selectedSocialMedia, onSocialMediaChange,
                                                                   }) => {

    const socialMediaOptions = [
        {name: 'VK', icon: 'icon-vk'},
        {name: 'WhatsApp', icon: 'icon-whatsapp'},
        {name: 'Telegram', icon: 'icon-telegram'},
        {name: 'SMS', icon: 'icon-smsrr'},
    ];

    const handleCheckboxChange = (socialMediaName: string) => {
        const updatedSelection = [...selectedSocialMedia];
        const index = updatedSelection.indexOf(socialMediaName);
        console.log(updatedSelection);

        if (index !== -1) {
            updatedSelection.splice(index, 1);
        } else {
            updatedSelection.push(socialMediaName);
        }
        console.log(updatedSelection);
        onSocialMediaChange(updatedSelection);
    };

    return (
        <>
        <Row gutter={[16, 16]}>
            {socialMediaOptions.map((option) => (
                <Col key={option.name} span={6}>
                    <ConfigProvider
                        theme={{
                            token: {
                                // Seed Token
                                colorPrimary: '#ffcccc',
                                borderRadius: 2,
                                colorText: "#444c65",


                                // Alias Token
                                colorBgContainer: 'white',
                            },
                        }}
                    >
                        <Checkbox
                            style={{
                                fontSize: "18px",
                                marginTop: "25px",
                                marginLeft: "20px",
                            }}
                            checked={selectedSocialMedia.includes(option.name)}
                            onChange={() => handleCheckboxChange(option.name)}
                        >
                            <span className={option.icon}/> {option.name}
                        </Checkbox>
                    </ConfigProvider>

                </Col>
            ))}
        </Row>
        <Row gutter={16}>
            <Col  span={5}>
                <div className="icon-container">
                    <img
                        src="/vkontakte.jpg"
                        className="round-image"
                    />

                </div>
            </Col>
            <Col  span={6}>
                <div className="icon-container">
                    <img
                        src="/scale_1200.jpg"
                        className="round-image"
                    />
                </div>
            </Col>
            <Col  span={6}>
                <div className="icon-container">
                    <img
                        src="/tg.png"
                        className="round-image"
                    />
                </div>
            </Col>
            <Col  span={6}>
                <div className="icon-container">
                    <img
                        src="/sms-advertising.jpg"
                        className="round-image"
                    />
                </div>
            </Col>





    </Row>
    </>
);
}

export default SocialMediaSelection;
