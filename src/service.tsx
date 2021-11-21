import axios from "axios";

const HOSTNAME = `https://buffalo-sevice-test.yy.com`;

export const saveDetail = async (args: any) => {
  const { data } = await axios({
    method: "post",
    url: `${HOSTNAME}/test-api/${args.id}`,
    data: {
      config: {
        name: "test-123123",
      },
    },
  });
  if (data.code === 0) {
    return data.data;
  } else {
    throw new Error(data.msg);
  }
};

export const getDetail = async ({ id }: { id: string }) => {
  const { data } = await axios.get(`${HOSTNAME}/test-api/${id}`);
  if (data.code === 0) {
    return data.data;
  } else {
    throw new Error(data.msg);
  }
};
