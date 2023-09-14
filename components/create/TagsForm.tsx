import React, {useEffect, useRef, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import type {InputRef} from 'antd';
import {Space, Input, Tag, Tooltip, theme, Modal} from 'antd';

interface TagsFormProps {
    tags: string[];

    onTagsChange: (newTags: string[]) => void;
    fieldValues: number;
    setFieldsCount: (count: number) => void;
    maxCountBut:number;
    maxLen:number;
}

const TagsForm: React.FC<TagsFormProps> = ({tags, onTagsChange, fieldValues, setFieldsCount,maxCountBut,maxLen}) => {
    const {token} = theme.useToken();
    // const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3']);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);
    const [showLimitExceededModal, setShowLimitExceededModal] = useState(false);


    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        onTagsChange(newTags);
    };


    const showInput = () => {
        if (fieldValues+tags.length + 1 <= maxCountBut || maxCountBut === -1) {
            setInputVisible(true);
            setFieldsCount(fieldValues + 1);
        } else {
            setShowLimitExceededModal(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            onTagsChange([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        onTagsChange(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    };

    const tagInputStyle: React.CSSProperties = {
        width: 64,
        height: 22,
        marginInlineEnd: 8,
        verticalAlign: 'top',
    };

    const tagPlusStyle: React.CSSProperties = {
        height: 22,
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    return (
        <>
            <Space size={[0, 8]} wrap>
                <Space size={[0, 8]} wrap>
                    {tags.map((tag, index) => {
                        if (editInputIndex === index) {
                            return (
                                <Input
                                    ref={editInputRef}
                                    key={tag}
                                    maxLength={maxLen === -1 ? undefined : maxLen}
                                    size="small"
                                    style={tagInputStyle}
                                    value={editInputValue}
                                    onChange={handleEditInputChange}
                                    onBlur={handleEditInputConfirm}
                                    onPressEnter={handleEditInputConfirm}
                                />
                            );
                        }
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag
                                key={tag}
                                closable={index !== 0}
                                style={{userSelect: 'none'}}
                                onClose={() => handleClose(tag)}
                            >
              <span
                  onDoubleClick={(e) => {
                      if (index !== 0) {
                          setEditInputIndex(index);
                          setEditInputValue(tag);
                          e.preventDefault();
                      }
                  }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                            tagElem
                        );
                    })}
                    {inputVisible ? (
                        <Input
                            ref={inputRef}
                            type="text"
                            size="small"
                            maxLength={maxLen === -1 ? undefined : maxLen}
                            style={tagInputStyle}
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                        />
                    ) : (
                        <Tag style={tagPlusStyle} onClick={showInput}>
                            <PlusOutlined/> New Tag
                        </Tag>
                    )}
                </Space>
            </Space>
            <Modal
                title="Внимание"
                open={showLimitExceededModal}
                onOk={() => setShowLimitExceededModal(false)}
                onCancel={() => setShowLimitExceededModal(false)}
            >
                Всего доступно {maxCountBut} кнопок.
            </Modal>
        </>
    );
};

export default TagsForm;