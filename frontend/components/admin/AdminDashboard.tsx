
type Stats = {
  statistics: {
    totalBikes: number;
    availableBikes: number;
    avgRating: number;
  };
};

export default function AdminDashboard({ statistics } : Stats) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-3">Bike Overview</h3>
        <div className="text-3xl font-bold">{statistics.totalBikes}</div>
        <div className="text-gray-500">Total bikes in the fleet</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-3">Available Bikes</h3>
        <div className="text-3xl font-bold text-green-600">{statistics.availableBikes}</div>
        <div className="text-gray-500">Ready for rental</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-3">Average Rating</h3>
        <div className="text-3xl font-bold text-yellow-500">
          {statistics.avgRating.toFixed(1)}
          <span className="text-lg ml-1">/ 5</span>
        </div>
        <div className="text-gray-500">Customer satisfaction</div>
      </div>
    </>
  );
}