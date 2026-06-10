export const BRAND = {
  name: "Christine Collections",
  tagline: "Dress Your Story",
  whatsapp: "+254700000000",
  branches: [
    { id: "nairobi" as const, name: "Nairobi Boutique", address: "Westlands, Nairobi", hours: "Mon–Sat • 10am–7pm" },
    { id: "makueni" as const, name: "Makueni Boutique", address: "Wote Town, Makueni", hours: "Mon–Sat • 9am–6pm" },
  ],
};

export const formatKsh = (n: number | string | null | undefined): string => {
  const v = typeof n === "string" ? parseFloat(n) : n ?? 0;
  return "KSh " + (v || 0).toLocaleString("en-KE", { maximumFractionDigits: 0 });
};

/** Normalize 07XX / +2547XX / 2547XX to 2547XXXXXXXX (E.164 without +). */
export const sanitizePhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return "254" + digits.slice(1);
  if (digits.startsWith("7") || digits.startsWith("1")) return "254" + digits;
  return digits;
};

export const isValidKenyaPhone = (raw: string): boolean => {
  const s = sanitizePhone(raw);
  return /^254[71]\d{8}$/.test(s);
};

export const whatsappLink = (text = "") =>
  `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
