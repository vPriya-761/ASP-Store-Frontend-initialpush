export default findAllByKey =(obj, keyToFind)=> {
   const res = Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === 'object' && value)
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
      , []) || [];
     return [...new Map(res.map(o => [o, o])).values()];
  }