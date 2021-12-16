import axios from "axios";
import { GetVersionConfigResult } from "./models/GetVersionConfigResult";

const HOSTNAME = `https://buffalo-sevice-test.yy.com`;

/**
 * 保存配置
 */
export const saveDetail = async (args: any) => {
  const { data } = await axios({
    method: "post",
    url: `${HOSTNAME}/version_modify/`,
    data: {
      versionId: args.versionId,
      versionConfig: JSON.stringify(args.components),
    },
  });
  if (data.code === 0) {
    return data.data;
  } else {
    throw new Error(data.msg);
  }
};

/**
 * 查看版本配置
 */
export const getDetail = async ({ versionId }: { versionId?: string }) => {
  const { data } = await axios.get<GetVersionConfigResult>(
    `${HOSTNAME}/version_list/${versionId}`
  );
  if (data.code === 0) {
    return data.data;
  } else {
    throw new Error(data.msg);
  }
};
