export const uid = () => {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  );
};

export const handleCartIds = (list, id) => {
  if (list?.includes(id)) {
    list = list?.filter((ids) => ids != id);
  } else {
    list.push(id);
  }
  return list;
};

export const handleProductIds = (list,values) => {
  const res = list
  const exist = list?.some((item) => item?.product_id === values.product_id);
  if(exist===true){
    res = list?.filter((element) => element.product_id !== values.product_id);
  }
  else{
    list.push(values)
  }
  return res;
};

export const handleSummery = (list,values) => {
  const res = list
  const exist = list?.some((item) => item?.product_id === values.product_id);
  if(exist===true){
    res = list?.filter((element) => element.product_id !== values.product_id);
  }
  else{
    list.push(values)
  }
  return res;
};