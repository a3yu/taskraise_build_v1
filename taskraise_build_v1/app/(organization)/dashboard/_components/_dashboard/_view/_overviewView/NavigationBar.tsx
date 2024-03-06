import React from "react";

export default function NavigationBar({
  pages,
  setPage,
  currentPage,
}: {
  pages: string[];
  setPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
}) {
  return (
    <div className="flex">
      {pages.map((value) => {
        return (
          <div
            key={value}
            className={`transition duration-300 ease-in-out hover:cursor-pointer ${
              currentPage == value
                ? "border-b-[4px] border-primary py-3 px-3"
                : "hover:bg-purple-50 py-3 px-3"
            }`}
            onClick={() => setPage(value)}
          >
            <h3 className="font-semibold text-sm">{value}</h3>
          </div>
        );
      })}
    </div>
  );
}
