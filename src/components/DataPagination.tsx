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
        <div className="md:w-[600px] sm:max-w-[600px]  min-h-[786px] mx-auto py-4 border rounded-lg shadow-lg mb-6 card flex flex-col justify-between">
            <ul className="list-none">
                {displayedData?.map((item: any, index: any) => (
                    <li key={index} className="px-4 py-2 break-words">
                        {item.input} {item.prediction === "positive" ? "🟢" : item.prediction === "negative" ? "🔴" : "⚫"}
                    </li>
                ))}
            </ul>
            <div className="flex justify-center py-4 align-bottom">
                <button
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                    className="bg-black hover:bg-gray-800 px-4 py-2 m-2 rounded text-white">
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
                                className={`bg-black hover:bg-gray-800 px-4 py-2 m-2 rounded ${
                                    currentPage === index + 1 ? "bg-black text-white" : "text-white"
                                }`}>
                                {index + 1}
                            </button>
                        )
                )}
                <button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    className="bg-black hover:bg-gray-800 px-4 py-2 m-2 rounded text-white">
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataPagination;
