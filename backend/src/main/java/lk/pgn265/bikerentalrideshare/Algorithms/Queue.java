package lk.pgn265.bikerentalrideshare.Algorithms;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Queue<T> {

    private List<T> queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;

    public Queue() {
        capacity = 10;
        queue = new ArrayList<>(capacity);
        front = 0;
        rear = -1;
        size = 0;
    }

    public Queue(int capacity) {
        this.capacity = capacity;
        queue = new ArrayList<>(capacity);
        front = 0;
        rear = -1;
        size = 0;
    }

    public void enqueue(T request) {
        if (isFull()) {
            resize();
        }

        while (queue.size() <= rear + 1) {
            queue.add(null);
        }

        rear = (rear + 1) % capacity;
        queue.set(rear, request);
        size++;
    }

    public T dequeue() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }

        T request = queue.get(front);
        queue.set(front, null); // garbage collection
        front = (front + 1) % capacity;
        size--;
        return request;
    }

    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        return queue.get(front);
    }

    private void resize() {
        int newCapacity = capacity * 2;
        List<T> newQueue = new ArrayList<>(newCapacity);

        // New Queue initialization
        for (int i = 0; i < newCapacity; i++) {
            newQueue.add(null);
        }

        // Copy elements from old queue to new queue
        for (int i = 0; i < size; i++) {
            newQueue.set(i, queue.get((front + i) % capacity));
        }

        queue = newQueue;
        front = 0;
        rear = size - 1;
        capacity = newCapacity;
    }

    public List<T> getAll() {
        List<T> result = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            result.add(queue.get((front + i) % capacity));
        }
        return result;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == capacity;
    }

    public int size() {
        return size;
    }
}