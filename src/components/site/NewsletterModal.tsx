import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LS_KEY = "newsletterDismissed";

const NewsletterModal = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const seen = localStorage.getItem(LS_KEY);
    const t = setTimeout(() => {
      if (!seen) setOpen(true);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    localStorage.setItem(LS_KEY, "1");
    toast({ title: "You're in!", description: "Welcome to the glow list ✨" });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) localStorage.setItem(LS_KEY, "1"); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Join the Glow List</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Exclusive drops, early access, and 10% off your first order.
        </p>
        <form onSubmit={onSubscribe} className="mt-4 flex gap-2">
          <Input type="email" placeholder="your@email.com" required />
          <Button type="submit" variant="gold">Subscribe</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
