import React from "react";
import { GetServerSideProps } from "next";
import { getPipelines } from "@services/index";

type Data = { id: number }

const MiniProgramPage: React.FC<Data>= ({id}) => (
  <div>MiniProgramPage {id}</div>
)

export default MiniProgramPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string

    const { data } = await getPipelines({ project_id: id})
    
    return { props: { data } }
  } catch (error) {
    return { props: {errors: error.message }} 
  }
}