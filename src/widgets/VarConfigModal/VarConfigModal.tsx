import { CaretRightOutlined } from "@ant-design/icons";
import ProForm, { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Empty, Spacer } from "@yy/tofu-ui-react";
import { Button, Card, Collapse, Modal, Space, Tag, Tooltip } from "antd";
import classNames from "classnames";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { HiVariable } from "react-icons/hi";
import { RiDeleteBack2Fill, RiNumber1 } from "react-icons/ri";
import {
  VscSymbolArray,
  VscSymbolBoolean,
  VscSymbolNamespace,
  VscSymbolString,
} from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../store";
import { setAppData } from "../../store/editor/dataSourceSlice";
import { DataConfig } from "../../store/editor/initialState";
import { ProFormCopitableText } from "../ProFormCopitableText";
import { FlexCenter, LabelWithIcon } from "../styled";

/**
 * TODO: 校验初始值的类型
 */

const VarItemForm = ({
  dataConfig,
  onSuccess,
  isNew = false,
}: {
  dataConfig?: DataConfig;
  onSuccess?: Function;
  isNew?: Boolean;
}) => {
  const dispatch = useAppDispatch();
  const $app = useAppSelector((s) => s.dataSource.$app);
  const formRef = useRef<any>();

  useEffect(() => {
    if (typeof dataConfig !== "undefined") {
      formRef.current.setFieldsValue({
        ...dataConfig,
        varPath: `$app.${dataConfig.name}`,
      });
    } else {
      formRef.current.resetFields();
    }
  }, [dataConfig]);

  const saveDataSource = async () => {};
  const addDataSource = async (values: any) => {
    dispatch(setAppData($app.concat(values)));
    onSuccess?.();
  };

  return (
    <Card
      title={dataConfig ? "编辑变量" : "新建变量"}
      style={{ marginLeft: "10px" }}
    >
      <ProForm
        formRef={formRef}
        onFinish={dataConfig ? saveDataSource : addDataSource}
        submitter={{
          searchConfig: {
            submitText: dataConfig ? "保存修改" : "提交",
          },
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="变量标识"
          required
          rules={[{ required: true }]}
        />
        {/* <ProFormSelect width="md" name="type" label="变量类型" required /> */}
        <ProFormSelect
          width="md"
          name="dataType"
          label="数据类型"
          required
          rules={[{ required: true }]}
          // options={["string", "number", "boolean", "array", "object"].map(
          //   (x) => ({ value: x, label: x })
          // )}
          options={[
            {
              value: "string",
              label: (
                <LabelWithIcon>
                  <VscSymbolString />
                  <span>String 字符</span>
                </LabelWithIcon>
              ),
            },
            {
              value: "number",
              label: (
                <LabelWithIcon>
                  <RiNumber1 />
                  <span>Number 数值</span>
                </LabelWithIcon>
              ),
            },
            {
              value: "boolean",
              label: (
                <LabelWithIcon>
                  <VscSymbolBoolean />
                  <span>Boolean 布尔</span>
                </LabelWithIcon>
              ),
            },
            {
              value: "array",
              label: (
                <LabelWithIcon>
                  <VscSymbolArray />
                  <span>Array 数组</span>
                </LabelWithIcon>
              ),
            },
            {
              value: "object",
              label: (
                <LabelWithIcon>
                  <VscSymbolNamespace />
                  <span>Object 对象</span>
                </LabelWithIcon>
              ),
            },
          ]}
        />
        <ProFormText width="md" name="defaultValue" label="初始值" />
        <ProFormText width="md" name="desc" label="变量描述" />
        {!isNew && (
          <ProFormCopitableText width="md" name="varPath" label="变量路径" />
        )}
        <br />
      </ProForm>
    </Card>
  );
};

const VarItem = ({
  varKey,
  active,
  onClick,
}: {
  varKey: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={classNames("VarItem", { active })} onClick={onClick}>
      <Space>
        <HiVariable className="VarItemIcon" />
        <span>{varKey}</span>
      </Space>
      <Button type="text">
        <RiDeleteBack2Fill />
      </Button>
    </div>
  );
};

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
}
const { Panel } = Collapse;

export const VarConfigModal: FC<Props> = ({ visible, setVisible }) => {
  const $app = useAppSelector((s) => s.dataSource.$app);
  // const $page = useAppSelector((s) => s.dataSource.$page);

  const [cursor, setCursor] = useState<string>();
  const curDataConfig = useMemo(() => {
    if (cursor) {
      return $app.filter((x) => x.name === cursor)[0];
    }
    return undefined;
  }, [$app, cursor]);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!visible) {
      setCursor(undefined);
      setIsNew(false);
    }
  }, [visible]);

  return (
    <Modal
      title="变量管理"
      visible={visible}
      destroyOnClose
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={1000}
      footer={null}
    >
      <div className="VarConfig">
        <div className="VarConfigLeft">
          <Collapse
            defaultActiveKey={["1", "2"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel
              key="1"
              header={
                <FlexCenter>
                  <AiOutlineGlobal />
                  <Spacer x={0.5} />
                  <span>全局</span>
                  <Spacer x={0.5} />
                  <Tag color="blue">$app</Tag>
                </FlexCenter>
              }
              extra={
                <Tooltip title="新增全局变量">
                  <Button
                    type="text"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCursor(undefined);
                      setIsNew(true);
                    }}
                  >
                    <GoPlus />
                  </Button>
                </Tooltip>
              }
            >
              {$app.length ? (
                $app.map((x) => {
                  const key = x.name;
                  return (
                    <VarItem
                      varKey={key}
                      key={key}
                      // active={cursor === `$app.${key}`}
                      // onClick={() => setCursor(`$app.${key}`)}
                      active={cursor === key}
                      onClick={() => {
                        setIsNew(false);
                        setCursor(key);
                      }}
                    />
                  );
                })
              ) : (
                <Empty text="暂无变量, 点击『+』号新增变量" />
              )}
            </Panel>
            {/* <Panel
              key="2"
              header={
                <FlexCenter>
                  <AiOutlineFile />
                  <Spacer x={0.5} />
                  <span>当前页面</span>
                </FlexCenter>
              }
            >
              {$page.map((x) => {
                const key = x.name;
                return (
                  <VarItem
                    varKey={key}
                    key={key}
                    active={cursor === `$page.${key}`}
                    onClick={() => setCursor(`$page.${key}`)}
                  />
                );
              })}
            </Panel> */}
          </Collapse>
        </div>
        <div className="VarConfigRight">
          {isNew ? (
            <VarItemForm onSuccess={() => setIsNew(false)} isNew={isNew} />
          ) : cursor ? (
            <VarItemForm dataConfig={curDataConfig} isNew={isNew} />
          ) : (
            <Empty text="请在左侧选择变量" style={{ height: 300 }} />
          )}
        </div>
      </div>
    </Modal>
  );
};
