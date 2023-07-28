type InputProps = {
  type: string
  id: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  value?: string
}

export default function Input({
  type,
  id,
  placeholder,
  onChange,
  readOnly,
  value,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      className="w-full h-14 text-black dark:text-zinc-200 rounded-md pl-4 border border-gray-300 transition-all"
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
      value={value}
    />
  )
}
