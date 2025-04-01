import Ad from "../model/Ads";

export async function createAd() {
    const newAd = new Ad({
      title: "Kot do adopcji",
      description: "Piękny kotek szuka domu!",
      userId: "67dda7f48d65f3d7a176d29b",  
      images: [
        { url: "https://example.com/image1.jpg", description: "Kot na kanapie" },
        { url: "https://example.com/image2.jpg" }
      ]
    });
  
    await newAd.save();
    console.log("Ogłoszenie dodane:", newAd);
  }