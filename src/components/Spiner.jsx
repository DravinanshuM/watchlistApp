const Spiner = ({ text }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="flex items-center space-x-3">
      <strong className="text-white text-2xl">{text}</strong>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
    </div>
  </div>
);

export default Spiner;
