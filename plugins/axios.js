export default function ({ $axios, redirect }) {
  $axios.setBaseURL("http://localhost:3100");
  $axios.onError((error) => {
    redirect("/error");
  });
}
