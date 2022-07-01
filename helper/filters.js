// function one to get all the varients
export const groupByVariants = (prev, curr) => {
  if ("varients" in curr) {
    if (curr?.varients?.length > 0) {
      curr?.varients?.forEach((variant) => {
        if (prev?.length === 0)
          prev.push({
            name: variant?.product_attribute_type,
            data: [variant.value],
          });
        else {
          const uniqueVariants = prev?.map((variant) => variant.name);
          if (uniqueVariants.includes(variant.product_attribute_type)) {
            const variantIndex = prev?.findIndex(
              (exsVariant) =>
                exsVariant.name === variant.product_attribute_type
            );
            if (!prev[variantIndex].data.includes(variant.value))
              prev[variantIndex].data = [
                ...prev[variantIndex].data,
                variant.value,
              ];
          } else {
            prev.push({
              name: variant?.product_attribute_type,
              data: [variant.value],
            });
          }
        }
      });
    }
  }
  return prev;
};

// find a product
const keys = ["value"];
export const findAttributevalues = (obj, query) => {
  const filtered = obj.filter((datum) => {
    const filteredChilds = datum.varients.filter((child) =>
      keys.some((key) => child[key] === query)
    );
    return filteredChilds?.length > 0;
  });
  return filtered;
};

export const varientsCompare = (
  parentFilters,
  filteredVariant,
  variantName
) => {
  // compare original and new
  const variantId = variantName;
  const finalData = parentFilters?.map((filter) => {
    if (filter.name !== variantId) {
      const finalVariant = filteredVariant.find(
        (filVar) => filVar.name !== variantId
      );
      const parentFilterData = filter.data;
      const finalVariantData = finalVariant.data;

      const finalParentFilterData = parentFilterData.map((finFilter) => {
        if (!finalVariantData.includes(finFilter.value))
          return { value: finFilter.value, display: false };
        return finFilter;
      });
      return { name: filter.name, data: finalParentFilterData };
    }
   
    return filter;
  });
  return finalData
};

//unique image
export const findImage = (obj) => {
  let images = [];
  let imgName = {};
  obj.map((item) => {
    item.varients.map((i) => {
      if (i.product_attribute_type === "COLOR") {
        imgName[i.value] = item.profile_photo;
        images.push(imgName);
      }
    });
  });
  var cityMap = new Map();
  images.forEach((p) => cityMap.set(p.colorName, p));
  return [...cityMap.values()];
};

export const paginationCount = (count,limit) =>{
  const pageCount = count / limit;
  const res = Math.ceil(pageCount)
  return parseInt(res);
}

export const filterCartIds = (list,type)=>{
  const newAr = list.map((item) => {
    if(type===1){
      return item.cart_id
    }
    else{
      return  {
        product_id: item?.product_id,
        quantity: item?.quantity,
      }
    }
    
  })
return newAr
}