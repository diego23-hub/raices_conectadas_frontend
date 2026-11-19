import { useEffect } from 'react';

const fijarMeta = (nombre, contenido) => {
  let el = document.querySelector(`meta[name="${nombre}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', nombre);
    document.head.appendChild(el);
  }
  el.setAttribute('content', contenido);
};

export default function useMetadatos({ title, description, keywords }) {
  useEffect(() => {
    document.title = title;
    fijarMeta('description', description);
    fijarMeta('keywords', keywords);
  }, [title, description, keywords]);
}