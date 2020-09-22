import Layout from '../components/layouts/Layout'
import styled from '@emotion/styled'

const Heading = styled.h1`
  color:red;
`;
const Login = ()=> {
  return (
    <div>
      <Layout>
        <Heading>Login</Heading>

      </Layout>
    </div>
  )
}

export default Login