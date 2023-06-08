import React from "react";

import {
    CTable,
    CPaginationItem,
    CPagination,
} from "@coreui/react";

/**
 * Account table
 * @param {*} param0
 * @returns
 */
const Table = ({
          maxPages,
          pageNumber,
          setPageNumber,
          children,
          tableHeaderCells,
          filters,
          filterErrors,
          handleFilterChange,
          handleFilterSubmit,
          handleClearFilter,
          accountsType,
      }) => {
    // Functions
    const handlePageChangePrevious = () => {
        // eslint-disable-next-line no-unused-expressions
        pageNumber === 1 ? 1 : setPageNumber(pageNumber - 1);
    };
    const handlePageChangeNext = () => {
        // eslint-disable-next-line no-unused-expressions
        pageNumber === maxPages ? maxPages : setPageNumber(pageNumber + 1);
    };

    const PaginationPages = () => {
        const items = [];
        for (let i = 1; i <= maxPages; i++) {
            items.push(
                <CPaginationItem
                    key={i}
                    active={i === pageNumber}
                    onClick={() => setPageNumber(i)}
                >
                    {i}
                </CPaginationItem>
            );
        }
        return items;
    };

    return (
        <>
            <div className="shadow border-b border-gray-200 sm:rounded-lg bg-white p-4 mb-5">
                <CTable>
                    {/* <CTableHead> */}
                        {/* <CTableRow>
                            {tableHeaderCells.map((cell, index) => (
                                <CTableHeaderCell key={index} scope="col">
                                    {cell}
                                </CTableHeaderCell>
                            ))}
                        </CTableRow> */}
                    {/* </CTableHead> */}
                    {children}
                </CTable>
                {maxPages !== 1 && (
                    <div className="flex justify-end">
                        <CPagination aria-label="Page navigation example" className="">
                            <CPaginationItem
                                disabled={pageNumber === 1}
                                aria-label="Previous"
                                onClick={handlePageChangePrevious}
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </CPaginationItem>
                            {PaginationPages()}

                            <CPaginationItem
                                disabled={pageNumber === maxPages}
                                aria-label="Next"
                                onClick={handlePageChangeNext}
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
                    </div>
                )}
            </div>
        </>
    );
};

export default Table;
