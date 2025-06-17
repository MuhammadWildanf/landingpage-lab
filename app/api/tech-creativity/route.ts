import { NextResponse } from 'next/server';

export async function GET() {
  // Contoh data, bisa diganti dengan data dari database
  const data = {
    categories: [
      { id: 1, name: "Immersive Installations", description: "We design spaces that fully engage the senses—visually, audibly, and emotionally. Think large-scale projection, responsive environments, and multi-layered storytelling that people can walk into." },
      { id: 2, name: "Interactive Experiences", description: "We create interactive experiences that invite audiences to participate, play, and connect in new ways." },
      { id: 3, name: "Extended Reality (AR/VR/XR)", description: "We blend realities to create immersive AR, VR, and XR experiences that push the boundaries of perception." },
      { id: 4, name: "Artificial Intelligence & Generative Systems", description: "We experiment with AI and generative systems to create intelligent, adaptive, and surprising digital works." },
      { id: 5, name: "Virtual Production", description: "We use virtual production techniques to bring creative visions to life in real-time environments." },
      { id: 6, name: "Custom Software & Hardware Development", description: "We build custom software and hardware solutions tailored to unique creative and technical challenges." },
      { id: 7, name: "Motion Capture & Real-Time Visualization", description: "We use motion capture and real-time visualization to create dynamic, interactive performances and installations." }
    ],
    carouselItems: [
      {
        id: 1,
        categoryId: 1,
        imageSrc: "/assets/images/projects/frestea.jpg",
        category: "Study Case",
        title: "Frestea Freshbreak",
        location: "Senayan Dome, Jakarta",
        description: "Interactive installation for Frestea's product launch."
      },
      {
        id: 2,
        categoryId: 1,
        imageSrc: "/assets/images/projects/example2.jpg",
        category: "Study Case",
        title: "Project Immersive 2",
        location: "Jakarta",
        description: "Another immersive installation project."
      },
      {
        id: 3,
        categoryId: 2,
        imageSrc: "/assets/images/projects/interactive1.jpg",
        category: "Study Case",
        title: "Interactive Wall",
        location: "Bandung",
        description: "Interactive wall for public engagement."
      },
      {
        id: 4,
        categoryId: 3,
        imageSrc: "/assets/images/projects/xr1.jpg",
        category: "Study Case",
        title: "XR Experience",
        location: "Surabaya",
        description: "Extended reality experience for event."
      }
      // Tambahkan data lain sesuai kebutuhan
    ]
  };

  return NextResponse.json(data);
} 