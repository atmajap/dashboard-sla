

const calculateDuration = (start, end) => {
  const delta = end - start;
  return delta;
};

const formatData = data =>
  data.map(({id, }) => {
    return {
      id,
      value: id,
      orderId: id,
      duration: calculateDuration() 
    };
  });