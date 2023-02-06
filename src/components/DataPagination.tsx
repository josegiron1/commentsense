import React, { useState } from "react";

const DataPagination = ({ data }: { data: any }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const handlePageChange = (page: any) => setCurrentPage(page);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = data?.slice(startIndex, endIndex);

    const handlePrevClick = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextClick = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className="max-w-[600px] min-h-[786px] mx-auto py-4 border rounded-md border-zinc-900 mb-6 card flex flex-col justify-between">
            <ul className="list-none">
                {displayedData?.map((item: any, index: any) => (
                    <li key={index} className="px-4 py-2 break-words">
                        {item.input} - {item.prediction}
                    </li>
                ))}
            </ul>
            <div className="flex justify-center py-4 align-bottom">
                <button
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 m-2 rounded text-gray-700">
                    Previous
                </button>
                {Array.from(
                    { length: totalPages },
                    (_, index) =>
                        index + 1 >= currentPage - 1 &&
                        index + 1 <= currentPage + 1 && (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`bg-gray-300 hover:bg-gray-400 px-4 py-2 m-2 rounded ${
                                    currentPage === index + 1 ? "bg-gray-400 text-white" : "text-gray-700"
                                }`}>
                                {index + 1}
                            </button>
                        )
                )}
                <button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 m-2 rounded text-gray-700">
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataPagination;
