import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface PaginationContextProps {
  currentPage: number;
  changeCurrentPage: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextProps>(
  {} as PaginationContextProps,
);

const PaginationProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrrentPage] = useState<number>(1);

  const changeCurrentPage = (page: number) => {
    setCurrrentPage(page);
  };

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        changeCurrentPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
export const usePagination = () => useContext(PaginationContext);
