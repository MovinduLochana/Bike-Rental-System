# Bike Rental System 🚴‍♂️

This project is a comprehensive bike rental and ride-sharing system developed using Java Spring Boot for the backend and Next.js (React) for the frontend. It allows users to rent bikes, manage their rides, leave reviews, and process payments.

## 🚀 Project Overview

The Bike Rental System aims to provide a seamless experience for users looking to rent bikes. It includes features for bike listing, searching, booking, and managing rentals, along with functionalities for user authentication, reviews, and payments. The backend is built with Java Spring Boot, leveraging Spring Security for authentication and JWT for token management. The frontend is a modern React application built with Next.js, utilizing Tailwind CSS for styling and Radix UI components for interactive elements.

## ✨ Features

*   **User Authentication:** Secure user registration and login using JWT.
*   **Bike Management:** Browse, search, and view detailed information about available bikes.
*   **Rental Booking:** Select rental dates, pickup/drop-off locations, and add notes.
*   **Payment Processing:** Securely process payments for bike rentals.
*   **Reviews System:** Users can leave reviews and ratings for bikes they have rented.
*   **Admin Dashboard:** An administrative interface for managing bikes, viewing statistics, and reviewing rental requests.
*   **Responsive UI:** A clean and intuitive user interface built with Next.js and Tailwind CSS.
*   **Sorting & Filtering:** Efficiently sort and filter bikes by various criteria.

## 🛠️ Tech Stack

*   **Backend:** Java, Spring Boot, Spring Security, JWT, Hibernate, PostgreSQL
*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Radix UI, Lucide React, Recharts
*   **Database:** PostgreSQL (implied by Java/Spring Boot setup, though not explicitly detailed in provided snippets)
*   **Build Tools:** Maven (implied by `gradlew` usage, though Gradle is more common for Java Spring Boot projects, this might indicate a mix or a misunderstanding of the provided files)
*   **Development:** Node.js, npm/yarn/pnpm/bun

## ⚙️ Installation & Setup

### Backend (Spring Boot)

1.  **Prerequisites:**
    *   Java Development Kit (JDK) 17 or higher
    *   Maven or Gradle (build tool)
    *   PostgreSQL database (or compatible)
    *   IDE like IntelliJ IDEA or Eclipse

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/MovinduLochana/Bike-Rental-System.git
    cd Bike-Rental-System/backend
    ```

3.  **Database Setup:**
    *   Ensure PostgreSQL is running.
    *   Create a database for the application (e.g., `bike_rental_db`).
    *   Configure `src/main/resources/application.properties` with your database connection details:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/bike_rental_db
        spring.datasource.username=your_db_username
        spring.datasource.password=your_db_password
        spring.jpa.hibernate.ddl-auto=update
        ```

4.  **Build and Run:**
    *   Using Maven:
        ```bash
        mvn clean install
        mvn spring-boot:run
        ```
    *   Using Gradle (if the project is Gradle-based, contrary to `gradlew.bat` usage suggesting Windows):
        ```bash
        ./gradlew build
        ./gradlew bootRun
        ```

### Frontend (Next.js)

1.  **Prerequisites:**
    *   Node.js and npm/yarn/pnpm/bun installed.

2.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

4.  **Set up Environment Variables:**
    Create a `.env.local` file in the `frontend` directory and add the following (replace with your actual API URL if different):
    ```dotenv
    NEXT_PUBLIC_API_URL=http://localhost:8080
    ```

5.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

6.  **Open in Browser:**
    Access the application at `http://localhost:3000`.

## 💡 Usage Examples

### User Actions

1.  **Register:** Navigate to `/signup` to create a new account.
2.  **Login:** Use `/login` to access your account.
3.  **Browse Bikes:** Go to `/rides` to view available bikes.
4.  **View Bike Details:** Click on a bike card to see more information and reviews.
5.  **Book a Bike:** From the bike details page, click "Book Now" to initiate the booking process, select dates and locations.
6.  **Make Payment:** Proceed to the payment page to complete the booking.
7.  **View History:** Access `/rides/history` to see your past rentals.
8.  **Write a Review:** Go to `/reviews` and submit your feedback for a past ride.
9.  **Update Profile:** Navigate to `/profile` to manage your personal information and preferences.

### Admin Actions

1.  **Access Admin Panel:** Navigate to `/admin`. You will be prompted to log in with the credentials `admin`/`admin123`.
2.  **Manage Bikes:** Add, edit, or delete bikes from the inventory.
3.  **View Statistics:** Monitor key metrics like total bikes, availability, and average ratings.
4.  **Review Rental Requests:** Approve or manage ongoing rental requests.

## 📁 Project Structure

```plaintext
Bike-Rental-System/
├── backend/
│   ├── gradle/
│   │   └── wrapper/
│   │       ├── gradle-wrapper.jar
│   │       └── gradle-wrapper.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── settings.gradle
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── lk/pgn265/bikerentalrideshare/
│   │   │   │       ├── Algorithms/
│   │   │   │       │   ├── Queue.java
│   │   │   │       │   └── QuickSort.java
│   │   │   │       ├── config/
│   │   │   │       │   └── SecurityConfig.java
│   │   │   │       ├── controller/
│   │   │   │       │   ├── AuthController.java
│   │   │   │       │   ├── BikeController.java
│   │   │   │       │   ├── FileController.java
│   │   │   │       │   ├── PaymentController.java
│   │   │   │       │   ├── ReviewController.java
│   │   │   │       │   ├── RideController.java
│   │   │   │       │   └── UserController.java
│   │   │   │       ├── dto/
│   │   │   │       │   ├── BikeReview.java
│   │   │   │       │   ├── PasswordChange.java
│   │   │   │       │   ├── PaymentRequest.java
│   │   │   │       │   └── UserResponse.java
│   │   │   │       ├── enums/
│   │   │   │       │   ├── BikeAvailability.java
│   │   │   │       │   ├── BikeType.java
│   │   │   │       │   ├── PaymentStatus.java
│   │   │   │       │   └── RideStatus.java
│   │   │   │       ├── filter/
│   │   │   │       │   └── JwtFilter.java
│   │   │   │       ├── model/
│   │   │   │       │   ├── Bike.java
│   │   │   │       │   ├── Payment.java
│   │   │   │       │   ├── Review.java
│   │   │   │       │   └── Ride.java
│   │   │   │       ├── projection/
│   │   │   │       │   ├── BikeViewDataProjection.java
│   │   │   │       │   └── RideProjection.java
│   │   │   │       ├── repo/
│   │   │   │       │   ├── BikeRepo.java
│   │   │   │       │   ├── PaymentRepo.java
│   │   │   │       │   ├── ReviewRepo.java
│   │   │   │       │   ├── RideRepo.java
│   │   │   │       │   └── UserRepo.java
│   │   │   │       ├── service/
│   │   │   │       │   ├── FileStorageService.java
│   │   │   │       │   ├── UserDetailsImpl.java
│   │   │   │       │   └── UserDetailsServiceImpl.java
│   │   │   │       ├── util/
│   │   │   │       │   └── JwtUtil.java
│   │   │   │       └── BikeRentalRideShareApplication.java
│   │   │   └── test/
│   │   │       └── java/
│   │   │           └── lk/pgn265/bikerentalrideshare/
│   │   │               └── BikeRentalRideShareApplicationTests.java
│   │   └── main/
│   │       └── resources/
│   │           └── application.properties
├── frontend/
│   ├── .next/
│   ├── app/
│   │   ├── (authenticated)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── profile/
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx
│   │   │   ├── rides/
│   │   │   │   ├── [bikeId]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── book/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── payments/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── history/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   └── page.tsx
│   │   ├── bikes/
│   │   │   └── search/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AddBikeForm.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── BikeManagement.tsx
│   │   │   ├── BikeTable.tsx
│   │   │   ├── DeleteBikeButton.tsx
│   │   │   ├── EditBikeForm.tsx
│   │   │   └── RentalRequestReview.tsx
│   │   ├── bike/
│   │   │   ├── BikeCard.tsx
│   │   │   └── BikeDataCard.tsx
│   │   ├── booking/
│   │   │   └── BookingForm.tsx
│   │   ├── history/
│   │   │   ├── RideHistoryCard.tsx
│   │   │   └── RideHistoryTable.tsx
│   │   ├── home/
│   │   │   └── HeroSection.tsx
│   │   ├── payment/
│   │   │   └── PaymentSuccess.tsx
│   │   ├── profile/
│   │   │   ├── Preferance.tsx
│   │   │   ├── RecentActivities.tsx
│   │   │   └── UserData.tsx
│   │   ├── rides/
│   │   │   └── PageHeader.tsx
│   │   └── ui/
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── toast.tsx
│   ├── context/
│   │   └── BikeContext.tsx
│   ├── hooks/
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── AuthContext.tsx
│   │   ├── apiConfig.tsx
│   │   ├── bikeService.ts
│   │   ├── configs/
│   │   │   └── recentActivityUtil.tsx
│   │   ├── paymentService.ts
│   │   ├── recentActivityUtil.tsx
│   │   ├── reviewService.ts
│   │   ├── rideService.ts
│   │   ├── serverAuth.ts
│   │   ├── userService.ts
│   │   └── utils.ts
│   ├── public/
│   │   ├── storage/
│   │   │   ├── assets/
│   │   │   │   ├── visa.webp
│   │   │   ├── bike/
│   │   │   │   ├── app-bg.jpg
│   │   │   │   ├── bikehero.jpg
│   │   │   │   ├── CBR.jpg
│   │   │   │   ├── KTM_Orange.webp
│   │   │   │   ├── royal-enfield.jpg
│   │   │   │   └── cb650r.jpg
│   │   │   └── user/
│   │   │       ├── app-store.jpg
│   │   │       └── google-play.png
│   ├── types/
│   │   ├── bikes.ts
│   │   ├── payments.ts
│   │   ├── reviews.ts
│   │   ├── rides.ts
│   │   └── users.ts
│   ├── .eslintrc.cjs
│   ├── .eslintrc.mjs
│   ├── .gitignore
│   ├── bun.lockb
│   ├── components.json
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── .gitignore
└── README.md
```
**File: frontend/components/ui/slider.tsx**- Type: code
- Language: Unknown
- Size: 1245 bytes
- Importance: 1/10
- Content:
```Unknown


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
