import { GetStaticProps } from 'next';
import axios from 'axios';
import Branch from './branch';

export const getStaticProps: GetStaticProps<BranchProps> = async () => {
  const branchDatas = (
    await axios.get('https://coworking-space-management.vercel.app/api/branch')
  ).data;

  return {
    props: {
      branchDatas: branchDatas,
    },
  };
};

export default function Home({ branchDatas }: BranchProps) {
  return (
    <>
      <Branch branchDatas={branchDatas} />
    </>
  );
}
