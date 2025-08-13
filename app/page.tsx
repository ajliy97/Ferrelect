import { Cards } from "@/components/card";



export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[50px_1fr_50px] min-h-screen">
      <main className="mt-16 flex flex-col row-start-2 items-center">
        <div className="w-11/12 mx-auto bg-yellow-400">
          <Cards />
        </div>
      </main>
    </div>
  );
}
