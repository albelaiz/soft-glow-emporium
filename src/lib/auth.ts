import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_FLAG = "lux_admin_authed";
const ADMIN_CANONICAL = "/admin/login";
const ADMIN_PASSWORD = "luxury-admin"; // Basic password for now

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthed(localStorage.getItem(ADMIN_FLAG) === "true");
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_FLAG, "true");
      setIsAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_FLAG);
    setIsAuthed(false);
    navigate("/admin/login", { replace: true });
  };

  return { isAuthed, login, logout };
}

export function setAdminMeta() {
  // Basic SEO setup for admin pages
  document.title = "Admin Login | Luxury Cosmetics";
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      "content",
      "Secure admin login for managing luxury cosmetics products."
    );
  } else {
    const m = document.createElement("meta");
    m.name = "description";
    m.content = "Secure admin login for managing luxury cosmetics products.";
    document.head.appendChild(m);
  }
  const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (canonical) {
    canonical.href = window.location.origin + ADMIN_CANONICAL;
  } else {
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = window.location.origin + ADMIN_CANONICAL;
    document.head.appendChild(link);
  }
}
