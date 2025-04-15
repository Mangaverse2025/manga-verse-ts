
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { AtSign, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Show success toast
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        
        <p className="text-lg mb-8">
          We'd love to hear from you! Whether you have a question about our platform, need help with your account,
          or want to suggest a feature, we're here to listen and assist.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <AtSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-3">Our friendly team is here to help.</p>
            <a href="mailto:support@mangaverse.com" className="text-primary">support@mangaverse.com</a>
          </div>
          
          <div className="border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Office</h3>
            <p className="text-muted-foreground mb-3">Come say hello at our headquarters.</p>
            <address className="not-italic">
              123 Manga Street<br />
              Tokyo, Japan 100-0001
            </address>
          </div>
          
          <div className="border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Phone</h3>
            <p className="text-muted-foreground mb-3">Mon-Fri from 9AM to 5PM.</p>
            <a href="tel:+123456789" className="text-primary">+1 (234) 567-890</a>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <p className="text-muted-foreground mb-4">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AtSign className="h-5 w-5 text-muted-foreground" />
                <span>support@mangaverse.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+1 (234) 567-890</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="How can we help you?" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your message..." 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full flex gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
