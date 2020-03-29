const Detail = () => <span>Detail</span>;

Detail.getInitialProps = () => {
  return new Promise(r => {
    setTimeout(() => {
      r({});
    }, 1000);
  });
};

export default Detail;
