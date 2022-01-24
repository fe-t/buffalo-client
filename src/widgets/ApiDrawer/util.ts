export const getKey = (keyStr: string) => {
  var reg = /(?<=List<).+(?=>)/;
  var matchRes = keyStr.match(reg)
  if (matchRes && matchRes.length > 0) {
    return matchRes[0]
  } else {
    return keyStr
  }
}

export const getItem = (item: any) => {
  return {
    title: item.name,
    type: item.type,
    description: item.comment,
  }
}

export const getKeyMaps = (list: any) => {
  const inputMaps = new Map()
  list.forEach((item: any) => {
    const keys = item.key.split('.')
    const key = keys[keys.length - 1]
    inputMaps.set(key, item.detailList)
  });
  return inputMaps;
}

export const getKeyVal = (keyList: any[], inputMaps: any) => {
  const data: any = {}
  for (var i = 0; i < keyList.length; i++) {
    const item = keyList[i]
    const type = getKey(item.type)
    const name = item.name
    data[name] = getItem(item)
    if (inputMaps.get(type)) {
      data[name]['properties'] = getKeyVal(inputMaps.get(type), inputMaps)
    }
  }
  return data
}

export const handleInputParam = (inputParam: any) => {
  const inputMaps = getKeyMaps(inputParam)
  const rootList = inputMaps.get('root')
  return getKeyVal(rootList, inputMaps)
}

export const handleOutputParam = (outputParam: any) => {
  const outputMaps = getKeyMaps(outputParam)
  const rootList = outputMaps.get('root')
  return getKeyVal(rootList, outputMaps)
}