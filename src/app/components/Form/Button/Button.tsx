type ButtonProps = {
  text: string
  style: string
}

export default function Button({ text, style }: ButtonProps) {
  return (
    <button type="submit" className={style}>
      {text}
    </button>
  )
}
