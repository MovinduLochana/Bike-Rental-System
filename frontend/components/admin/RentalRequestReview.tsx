"use client";

import { useState } from 'react';
import { Ride } from '@/types/rides';
import { complete } from '@/lib/rideService';

interface RentalRequestReviewProps {
  rides: Ride[];
}

export default function RentalRequestReview({ rides }: RentalRequestReviewProps) {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openRideDetails = (ride: Ride) => {
    setSelectedRide(ride);
    setIsModalOpen(true);
    setError(null);
    setSuccessMessage(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRide(null);
  };

  const handleMarkAsDone = async (rideId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      // Since we're in an admin context, we'll pass an empty token for now
      // In a real application, you'd have proper admin authentication
      await complete(rideId);
      setSuccessMessage("Rental request successfully completed!");

      
      // // Close the modal after a brief delay to show success message
      // setTimeout(() => {
      //   closeModal();
      //   // You might want to refresh the ride list here
      // }, 2000);

      closeModal();
    } catch (err) {
      setError(`Failed to complete rental: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter active rides that need review
  const pendingRides = rides.filter(ride => 
    ride.status === 'ONGOING' || ride.status === 'PENDING_PAYMENT'
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Pending Rental Requests</h3>
      
      {pendingRides.length === 0 ? (
        <p className="text-gray-500">No pending rental requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bike
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingRides.map((ride) => (
                <tr key={ride.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ride.id}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ride.bike.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(ride.startTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${ride.status === 'ONGOING' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {ride.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openRideDetails(ride)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for ride details */}
      {isModalOpen && selectedRide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Rental Request Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                {successMessage}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ride ID</p>
                  <p>{selectedRide.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="font-semibold">{selectedRide.status}</p>
                </div>
              </div>

              {/* <div>
                <p className="text-sm font-medium text-gray-500">User ID</p>
                <p>{selectedRide.userId}</p>
              </div> */}

              <div>
                <p className="text-sm font-medium text-gray-500">Bike Name</p>
                <p>{selectedRide.bike.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Start Time</p>
                  <p>{new Date(selectedRide.startTime).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">End Time</p>
                  <p>{selectedRide.endTime ? new Date(selectedRide.endTime).toLocaleString() : 'N/A'}</p>
                </div>
              </div>

             

              <div className="pt-4 border-t border-gray-200 mt-4">
                <button
                  onClick={() => handleMarkAsDone(selectedRide.id)}
                  disabled={isLoading || selectedRide.status !== 'ONGOING'}
                  className={`w-full py-2 px-4 rounded font-medium ${
                    isLoading || selectedRide.status !== 'ONGOING'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Mark as Completed'}
                </button>
                {selectedRide.status !== 'ONGOING' && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Only active rides can be marked as completed
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}