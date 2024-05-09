type ErrorLogProps = {
  message: string
}

export default function ErrorLog ({ message }: ErrorLogProps) {
  return (
    <div className=" p-4 font-bold text-lg">{message}</div>
  )
}