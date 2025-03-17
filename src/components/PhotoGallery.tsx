// import Image from 'next/image';

// export default function PhotoGallery() {
//     const photos = [
//         {
//           id: 1,
//           title: "Yala Leopard Sighting",
//           description: "A majestic leopard spotted during a sunrise safari.",
//           imageUrl: "https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGxlb3BhcmR8ZW58MHx8MHx8fDA%3D",
//         },
//         {
//           id: 2,
//           title: "Elephant Herd",
//           description: "A family of elephants roaming freely in Yala.",
//           imageUrl: "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVsZXBoYW50c3xlbnwwfHwwfHx8MA%3D%3D",
//         },
//         {
//           id: 3,
//           title: "Sunset Over Yala",
//           description: "A breathtaking sunset view during an evening safari.",
//           imageUrl: "https://plus.unsplash.com/premium_photo-1669750818169-b598e1de3a1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U3Vuc2V0fGVufDB8fDB8fHww",
//         },
//         {
//           id: 4,
//           title: "Birds of Yala",
//           description: "Colorful birdlife in Yala National Park.",
//           imageUrl: "https://plus.unsplash.com/premium_photo-1724864863815-1469c8b74711?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmlyZHN8ZW58MHx8MHx8fDA%3D",
//         },
//       ];

//   return (
//     <section className="w-full p-6 bg-black">
//       <h2 className="text-2xl sm:text-3xl md:text-2xl font-black text-white text-center mb-8 md:mb-12">
//         Yala Safari Photo Gallery
//       </h2>
//       <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {photos.map((photo) => (
//           <div
//             key={photo.id}
//             className="group relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl max-w-full"
//           >
//             {/* Big Image Section */}
//             <div className="relative w-full h-[400px] md:h-[500px]">
//               <Image
//                 src={photo.imageUrl}
//                 alt={photo.title}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
//               />
//               {/* Overlay with Content */}
//               <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-8">
//                 <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{photo.title}</h3>
//                 <p className="text-white text-base md:text-lg line-clamp-2">{photo.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import Image from 'next/image';

export default function PhotoGallery() {
  const photos = [
    {
      id: 1,
      title: "Yala Leopard Sighting",
      description: "A majestic leopard spotted during a sunrise safari.",
      imageUrl: "https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGxlb3BhcmR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      title: "Elephant Herd",
      description: "A family of elephants roaming freely in Yala.",
      imageUrl: "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVsZXBoYW50c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Sunset Over Yala",
      description: "A breathtaking sunset view during an evening safari.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1669750818169-b598e1de3a1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U3Vuc2V0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      title: "Birds of Yala",
      description: "Colorful birdlife in Yala National Park.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1724864863815-1469c8b74711?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmlyZHN8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-0 bg-black">
      <h2 className="text-2xl sm:text-3xl md:text-2xl font-black text-white text-center mb-12">
        Yala Safari Photo Gallery
      </h2>
      <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Side: Three Stacked Images */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {photos.slice(0, 3).map((photo) => (
            <div
              key={photo.id}
              className="group relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative w-full h-[200px] md:h-[250px]">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg md:text-xl font-bold mb-1">{photo.title}</h3>
                  <p className="text-white text-sm md:text-base line-clamp-2">{photo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: One Full-Size Image */}
        <div className="md:col-span-3 relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="relative w-full h-[400px] md:h-[780px]">
            <Image
              src={photos[3].imageUrl}
              alt={photos[3].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-8">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{photos[3].title}</h3>
              <p className="text-white text-base md:text-lg line-clamp-2">{photos[3].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}