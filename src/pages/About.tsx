
import { MainLayout } from "@/components/layout/MainLayout";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About MangaVerse</h1>
        
        <section className="mb-8">
          <p className="text-lg mb-4">
            MangaVerse is a platform dedicated to manga enthusiasts, offering a vast collection of manga
            titles from various genres, authors, and languages. Our mission is to make manga accessible
            to readers around the world.
          </p>
          <p className="text-lg mb-4">
            Founded in 2023, MangaVerse has grown rapidly to become one of the preferred destinations for
            manga readers, hosting thousands of titles and supporting multiple languages.
          </p>
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At MangaVerse, we believe that manga is a powerful medium for storytelling and cultural expression.
            Our mission is to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Make manga accessible to readers around the world</li>
            <li>Support manga creators and the manga industry</li>
            <li>Foster a community of manga enthusiasts</li>
            <li>Promote cultural understanding through manga</li>
            <li>Provide a platform for discovering new and diverse manga</li>
          </ul>
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Yuki Tanaka",
                role: "Founder & CEO",
                description: "Manga enthusiast and technology entrepreneur with a vision to bring manga to readers worldwide."
              },
              {
                name: "Alex Chen",
                role: "Chief Technology Officer",
                description: "Leads our development team to create the best manga reading experience."
              },
              {
                name: "Sophia Rodriguez",
                role: "Content Director",
                description: "Oversees our content library and partnerships with publishers and creators."
              }
            ].map((member, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <Separator className="my-8" />
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="mb-4">
            MangaVerse is more than just a platform - it's a community of manga lovers. Join us on our journey
            to build the best manga reading experience.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2023-2025 MangaVerse. All rights reserved.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
