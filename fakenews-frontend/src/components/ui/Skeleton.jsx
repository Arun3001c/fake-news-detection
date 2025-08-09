export default function Skeleton() {
  return (
    <div className="placeholder-glow">
      <div className="placeholder bg-secondary" style={{ height: '192px' }} />
      <div className="p-3">
        <div className="placeholder bg-secondary col-8 mb-2" style={{ height: '16px' }} />
        <div className="placeholder bg-secondary col-4" style={{ height: '16px' }} />
      </div>
    </div>
  );
}