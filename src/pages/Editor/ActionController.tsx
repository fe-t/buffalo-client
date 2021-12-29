import { Modal } from "antd";
import React, { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { MdAdsClick } from "react-icons/md";

export const ActionController = () => {
  const [v, setV] = useState(false);
  const close = () => setV(false);
  const show = () => setV(true);
  const save = () => {};
  const cancel = () => {
    close();
  };

  return (
    <>
      <Modal
        title="添加事件"
        visible={v}
        onOk={save}
        onCancel={cancel}
        okText="保存"
        cancelText="取消"
        width={1000}
      >
        <div className="ActionEditor">
          <div className="ActionEditor"></div>
        </div>
      </Modal>
      <div className="ActionPaneFields">
        <div className="ActionItem">
          <div className="ActionItemTrigger" onClick={show}>
            <MdAdsClick />
            <span>点击时</span>
          </div>
          <div className="ActionItemExecution">
            <span>showModal</span>
            <span>弹窗</span>
          </div>
        </div>
        <div className="ActionItem">
          <div className="ActionItemTrigger" onClick={show}>
            <BiLoader />
            <span>加载完成后</span>
          </div>
          <div className="ActionItemExecution">
            <span>callDataSource</span>
            <span>调用数据源方法</span>
          </div>
        </div>
      </div>
    </>
  );
};
