const linkGenerator = () => {
  qr_links = [];
  for (i = 1; i <= 5; i++) {
    randomized_string = (Math.random() + 1).toString(36).substring(7);
    // console.log(randomized_string);
    qr_links.push(randomized_string);
  }
  return qr_links;
};

module.exports = linkGenerator;
