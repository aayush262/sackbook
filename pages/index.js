import { Main } from './../components/main'
import baseUrl from './../util/baseUrl';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';

export default function Home({ user, postsData }) {

  return (
    <div>
      <Main
        user={user}
        postsData={postsData}
      ></Main>
    </div>
  )
}

const redirectUser = (location) => {
  return {
    redirect: {
      destination: location,
      permanent: false
    }
  }
}
export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  try {
    if (!token) {
      redirectUser('/login');
    }
    const { data } = await axios.get(`${baseUrl}/api/auth`, {
      headers: {
        Authorization: token
      }
    })
    const response = await axios.get(`${baseUrl}/api/post?pageNumber=1`, {
      headers: {
        Authorization: token
      }
    })
    return {
      props: {
        user: data.user,
        postsData: response.data.posts
      }
    }
  } catch (err) {
    destroyCookie(context, 'token')
    return redirectUser('/login')
  }
}