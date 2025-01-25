import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Aarthikai</h1>
      <Image src="/path/to/image.jpg" alt="Aarthikai Image" width={500} height={300} />
    </div>
  );
}
