package lk.pgn265.bikerentalrideshare.Algorithms;

import lk.pgn265.bikerentalrideshare.projection.BikeViewDataProjection;
import org.springframework.stereotype.Component;

@Component
public class QuickSort {

    /**
     * Sort bikes by availability using quicksort algorithm
     * @param bikes The array of bikes to sort
     * @param low Starting index
     * @param high Ending index
     */
    public void sortBikesByAvailability(BikeViewDataProjection[] bikes, int low, int high) {
        if (low < high) {
            // Find the partition index
            int partitionIndex = partition(bikes, low, high);

            // Sort elements before and after partition
            sortBikesByAvailability(bikes, low, partitionIndex - 1);
            sortBikesByAvailability(bikes, partitionIndex + 1, high);
        }
    }

    /**
     * Helper method for quicksort partitioning
     */
    private int partition(BikeViewDataProjection[] bikes, int low, int high) {
        // Use the availability code as the pivot value
        int pivot = bikes[high].getAvailability().value;
        int i = low - 1;

        for (int j = low; j < high; j++) {
            // If current element has lower or equal code than pivot
            if (bikes[j].getAvailability().value <= pivot) {
                i++;

                // Swap bikes[i] and bikes[j]
                BikeViewDataProjection temp = bikes[i];
                bikes[i] = bikes[j];
                bikes[j] = temp;
            }
        }

        // Swap bikes[i+1] and bikes[high] (pivot)
        BikeViewDataProjection temp = bikes[i + 1];
        bikes[i + 1] = bikes[high];
        bikes[high] = temp;

        return i + 1;
    }

    /**
     * Convenience method for sorting a list of bikes
     */
    public void sortBikes(BikeViewDataProjection[] bikes) {
        if (bikes == null || bikes.length <= 1) {
            return;
        }
        sortBikesByAvailability(bikes, 0, bikes.length - 1);
    }
}
