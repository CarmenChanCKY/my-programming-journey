export default function ({ $axios, redirect }) {
  $axios.setBaseURL("http://localhost:3100");
  $axios.onError((error) => {
    console.error(error);
    redirect("/error");
  });
}
