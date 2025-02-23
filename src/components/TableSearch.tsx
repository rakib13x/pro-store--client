// TableSearch.tsx
import Image from "next/image";

type TableSearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TableSearch = ({ value, onChange }: TableSearchProps) => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="Search Icon" width={14} height={14} />
      <input
        type="text"
        value={value} // Bind the value prop to the input
        onChange={onChange} // Handle input changes via the onChange prop
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
