import Layout from '../components/layouts/Layout'
import styled from '@emotion/styled'

const Heading = styled.h1`
  color:red;
`;
export default function Home() {
  return (
    <div>
      <Layout>
        <Heading>Inicio</Heading>

      </Layout>
    </div>
  )
}
