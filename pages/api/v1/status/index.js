function status(request, response) {
  console.log("TESTing API");
  response.status(200).json({
    field_1: "Testing 1",
    field_2: {
      sub_field: "subfield content são",
    },
  });
}

export default status;
