import React from "react";
import { GetServerSideProps } from "next";

const MiniProgramPage: React.FC = ({id}) => (
  <div>MiniProgramPage {id}</div>
)

export default MiniProgramPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id
    
    return { props: { id } }
  } catch (error) {
    return { props: {errors: error.message }} 
  }
}