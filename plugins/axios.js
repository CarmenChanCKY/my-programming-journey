export default function ({ $axios,  redirect }) {
    $axios.setBaseURL('http://localhost:3100')
    $axios.onError((error) => {
        redirect("/error");
      });
/*   const api = $axios.create({
    baseURL: 'http://localhost:3100',
    headers: {
     "Content-Type": "application/x-www-form-urlencoded"
    },
  }).onError((error) => {
    console.log(error)
    redirect("/error");
  });

  inject('axios', api) */
}
