import { Button, Card, Form, Input, Select } from "antd";
import { debounce } from "lodash";
import React, { FC, useEffect } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FlexExpand } from "../styled";

export interface ButtonInfo {
  title: string;
  type: "submit" | "reset" | "button";
  layoutType: "primary" | "default";
  actions: Record<any, any>;
}

interface Props {
  value: ButtonInfo[];
  onChange: (v?: string) => void;
}

export const ButtonGroupEditor: FC<Props> = ({ value, onChange }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      items: value,
    });

    // 防止进入死循环，第一次设置就好
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ButtonGroupEditor">
      <Form
        form={form}
        onValuesChange={debounce((_, allVals) => {
          onChange(allVals.items);
        }, 500)}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Card size="small" key={key}>
                  <FlexExpand style={{ marginBottom: "5px" }}>
                    <span>{key + 1}.按钮</span>
                    <Button
                      type="text"
                      icon={<RiDeleteBack2Fill />}
                      onClick={() => {
                        remove(name);
                      }}
                    />
                  </FlexExpand>
                  <div className="ButtonGroupEditorRow">
                    <span>按钮文字</span>
                    <div className="ButtonGroupEditorRowContent">
                      <Form.Item name={[name, "title"]} noStyle>
                        <Input size="small" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="ButtonGroupEditorRow">
                    <span>按钮类型</span>
                    <div className="ButtonGroupEditorRowContent">
                      <Form.Item name={[name, "type"]} noStyle>
                        <Select size="small" style={{ width: "100%" }}>
                          <Select.Option value="button">button</Select.Option>
                          <Select.Option value="submit">submit</Select.Option>
                          <Select.Option value="reset">reset</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="ButtonGroupEditorRow">
                    <span>样式类型</span>
                    <div className="ButtonGroupEditorRowContent">
                      <Form.Item name={[name, "layoutType"]} noStyle>
                        <Select size="small" style={{ width: "100%" }}>
                          {[
                            "primary",
                            "ghost",
                            "dashed",
                            "link",
                            "text",
                            "default",
                          ].map((x) => (
                            <Select.Option value={x} key={x}>
                              {x}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                </Card>
              ))}
              <Button
                block
                type="ghost"
                icon={
                  <AiOutlinePlusSquare
                    style={{
                      fontSize: "17px",
                      position: "relative",
                      top: "3px",
                      marginRight: "5px",
                    }}
                  />
                }
                onClick={() =>
                  add({
                    title: "按钮文字",
                    type: "button",
                    layoutType: "default",
                  })
                }
              >
                新增按钮
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};
