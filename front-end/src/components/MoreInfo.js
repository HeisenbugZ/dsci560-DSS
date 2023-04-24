import React, { useState } from 'react';
import axios from 'axios'
import { Modal } from 'antd';
import { API_IndustryInfo } from '../utils/APIs';

function MoreInfo( { naics } ) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [info, setInfo] = useState({})
    
    const showModal = () => {
      const url = API_IndustryInfo(naics)
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

    // 访问太快 后端撑不住哈哈哈哈哈
    // useEffect(() => {
    //   const url = base+'description?code=' + naics
    //   axios.get(url).then(res => {
    //     console.log(res)
    //     setInfo(res.data);
    //   })    
    // }, [naics])
  
    return (
      <>
        <p onClick={showModal} style={{cursor: 'pointer'}}>
          &nbsp;🔍
        </p>
        <Modal title={info.name} footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <img src={info.pic} className="App-logo" alt="logo" style={{ height: "100%", width: "100%" }}/>
          <p>{info.info}</p>
        </Modal>
      </>
    );
}
export default MoreInfo;
