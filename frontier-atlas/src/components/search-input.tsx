type SearchInputProps = {
  defaultValue?: string;
  name?: string;
  placeholder?: string;
};

export function SearchInput({
  defaultValue,
  name = "q",
  placeholder = "O que você procura hoje?",
}: SearchInputProps) {
  return (
    <label className="flex items-center gap-3 rounded-[26px] border border-[#d8ddd3] bg-white px-4 py-3 shadow-[0_20px_60px_-40px_rgba(10,10,10,0.45)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eff4e8] text-sm font-bold text-[#0a0a0a]">
        ?
      </span>
      <input
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-medium text-[#0a0a0a] outline-none placeholder:text-[#758070]"
      />
    </label>
  );
}
