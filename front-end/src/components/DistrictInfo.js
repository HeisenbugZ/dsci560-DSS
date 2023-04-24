import React, { useState } from 'react';
import axios from 'axios'
import { Modal } from 'antd';
import { API_DistrictInfo } from '../utils/APIs';

export default function DistrictInfo( { district } ) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [info, setInfo] = useState({})
    
    const showModal = () => {
      const url = API_DistrictInfo(district)
      axios.get(url).then(res => {
        // console.log(res)
        setInfo(res.data);
      })
      setIsModalOpen(true);

    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
      <>
        <p onClick={showModal}>
          &nbsp;🔍
        </p>
        <Modal title={info.name} footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>{info.description}</p>
        </Modal>
      </>
    );
}
