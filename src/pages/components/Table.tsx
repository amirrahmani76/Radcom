import { useState } from "react";
import Button from "./Button";
import Pagination from "./Pagination";

interface TableProps {
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][] | null>>;
}

const Table: React.FC<TableProps> = ({ matrix, setMatrix }) => {
  const [sortedMatrix, setSortedMatrix] = useState<number[][] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSortedPage, setCurrentSortedPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = matrix?.length ? Math.ceil(matrix.length / rowsPerPage) : 1;
  const totalSortedPages = sortedMatrix ? Math.ceil(sortedMatrix?.length / rowsPerPage) : 1;

  const currentRows = matrix?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const currentSortedRows = sortedMatrix ? sortedMatrix.slice((currentSortedPage - 1) * rowsPerPage, currentSortedPage * rowsPerPage) : [];

  const handleInputChange = (row: number, col: number, value: number) => {
    const newMatrix = matrix?.map((r, rowIndex) => (rowIndex === row ? r?.map((c, colIndex) => (colIndex === col ? value : c)) : r));
    setMatrix(newMatrix);
  };

  const sortMatrix = () => {
    const newMatrix = matrix?.map((row, index) => {
      return index % 2 === 0 ? [...row].sort((a, b) => a - b) : [...row].sort((a, b) => b - a);
    });
    setSortedMatrix(newMatrix);
    setCurrentSortedPage(1); // Reset to the first page when sorted
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextSortedPage = () => {
    if (currentSortedPage < totalSortedPages) setCurrentSortedPage((prev) => prev + 1);
  };

  const handlePreviousSortedPage = () => {
    if (currentSortedPage > 1) setCurrentSortedPage((prev) => prev - 1);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center w-full mt-8 border rounded-md p-2">
        <div className="w-full flex flex-col max-h-80 overflow-auto mt-2">
          {matrix?.length > 0 && (
            <table className="divide-y divide-gray-300 border-separate" style={{ borderSpacing: 0 }}>
              <thead className="bg-gray-50">
                <tr>
                  {Array.from({ length: matrix[0]?.length }, (_, col) => (
                    <th scope="col" key={col} className="py-3.5 text-center text-sm font-semibold text-gray-900 sticky top-0 z-10 bg-gray-50 border-b border-gray-300 ">
                      ستون {col + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentRows?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row?.map((cell, colIndex) => (
                      <td key={colIndex} className="whitespace-nowrap text-sm text-gray-500 text-center">
                        <input
                          type="number"
                          value={cell}
                          onChange={(e) => handleInputChange((currentPage - 1) * rowsPerPage + rowIndex, colIndex, Number(e.target.value))}
                          className="w-20 sm:w-28 whitespace-nowrap p-1 text-center focus:border-green-500 focus:ring-0 border-transparent text-sm"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />

      <div className="mt-4">
        <Button label="مرتب کردن" onClick={sortMatrix} />
      </div>

      {sortedMatrix && (
        <div className="w-full flex flex-col items-center mt-10">
          <h3 className="sm:text-lg">آرایه مرتب شده:</h3>
          <div className="w-full max-h-80 overflow-auto flex flex-col mt-2 border rounded-md p-2">
            <table className="divide-y divide-gray-300">
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentSortedRows?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row?.map((cell, colIndex) => (
                      <td key={colIndex} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentSortedPage} totalPages={totalSortedPages} handleNextPage={handleNextSortedPage} handlePreviousPage={handlePreviousSortedPage} />
        </div>
      )}
    </div>
  );
};

export default Table;
