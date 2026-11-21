export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function sectionHref(id: string, pathname: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export function whatsappHref(number: string) {
  const digits = number.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export function displayHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
