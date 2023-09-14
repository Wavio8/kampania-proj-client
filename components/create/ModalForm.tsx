import React, {useState} from "react";
import {Modal} from "antd";
import FormCreateKampania from "@/components/create/FormCreateKampania";

const ModalForm: React.FC = (b=true) => {
    const [showLimitExceededModal, setShowLimitExceededModal] = useState(false);
    return (<Modal
        title="Внимание"
        open={showLimitExceededModal}
        onOk={() => setShowLimitExceededModal(false)}
        onCancel={() => setShowLimitExceededModal(false)}
    >
        Всего доступно 8 элементов.
    </Modal>)
}
export default ModalForm;