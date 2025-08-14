
interface AlertProps {
  text: string;
}


export default function Alert({text}:AlertProps) {
  return (
    <div>
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <p>{text}</p>
      </div>
    </div>
  );
}
