// 定义类型映射
export interface SharedDataMapValue {
  content: string;
  timestamp: string;
}

export interface SharedDataMapValueFnData extends SharedDataMapValue {
  id: number;
}

// 定义类型映射，为每个 key 定义具体的数据类型
export interface SharedDataMap {
  'pubsub-message': SharedDataMapValueFnData;
}
