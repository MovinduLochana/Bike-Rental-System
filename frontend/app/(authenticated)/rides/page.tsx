import { getAllBikes } from "@/lib/bikeService";
import PageHeader from "@/components/rides/PageHeader";
import BikeSearch from "@/components/rides/BikeSearch";
import BikeResults from "@/components/rides/BikeResult";
import { Suspense } from "react";
import BikeResultLoader from "@/components/rides/BikeResultLoader";
import { cookies } from "next/headers";
import { BikeProvider } from "@/context/BikeContext";

export default async function BikesPage({searchParams} : {searchParams: Promise<{ [key: string]: string | string[] | undefined}>}) {

  const cookieStore = cookies();
  const initalBikes = await getAllBikes();

  console.log(initalBikes[0].image);

  const filters = (await searchParams).query || {};
  console.log(filters);

  if (!(await cookieStore).get("auth_token")){
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Unauthorized</h1>
          <p>Please login to access this page.</p>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="container mx-auto px-4 py-8">
  //     <div className="flex flex-col gap-6">

  //       <PageHeader />
  //       <BikeSearch initialBikes={initalBikes} />

  //       <Suspense fallback={<BikeResultLoader/>}>
  //         <BikeResults />
  //       </Suspense>

  //     </div>
  //   </div>
  // );
  
  return (
    <BikeProvider initialBikes={initalBikes}>
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">

        <PageHeader />
        <BikeSearch initialBikes={initalBikes} />

        <Suspense fallback={<BikeResultLoader/>}>
          <BikeResults />
        </Suspense>

      </div>
    </div>
    </BikeProvider>
  );
}
