export default function ({ app, $axios }) {
  $axios.setBaseURL("http://localhost:3100");

  $axios.onError((err) => {
    const error = { ...err };

    console.log(error);

    app.context.error({
      statusCode: error.response.status,
      name: error.response.data.name,
      message: error.response.data.description,
    });
  });
}
