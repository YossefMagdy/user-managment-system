import { RingLoader } from "react-spinners";

interface SpinnerProps {
  loading: boolean;
}
export default function Spinner({ loading }: SpinnerProps) {
  return (
    <>
      <div className="sweet-loading">
        <RingLoader
          loading={loading}
          size={150}
          aria-label="RingLoader"
          data-testid="RingLoader"
        />
      </div>
    </>
  );
}
