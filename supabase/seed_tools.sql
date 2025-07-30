-- Crear tabla "ia_tools"
create table if not exists ia_tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  purpose text,
  pricing text,
  features text[],
  official_url text,
  learning_url text
);
create index if not exists ia_tools_category_idx on ia_tools (category);

-- Insertar datos iniciales
insert into ia_tools (name, category, purpose, pricing, features, official_url, learning_url)
values
('GitHub Copilot', 'Generación de código', 'Asistencia para escribir código más rápido con IA', '$10/mes', ARRAY['Autocompletado de código', 'Soporte multi-lenguaje'], 'https://github.com/features/copilot', 'https://docs.github.com/en/copilot'),

('Codeium', 'Generación de código', 'IA gratuita para autocompletar código', 'Gratis', ARRAY['Autocompletado en tiempo real', 'Extensión para múltiples IDEs'], 'https://codeium.com', 'https://docs.codeium.com/'),

('SlidesAI', 'Presentaciones', 'Generar presentaciones a partir de texto', 'Desde $10/mes', ARRAY['Exportación a Google Slides', 'Varios estilos'], 'https://www.slidesai.io', 'https://www.youtube.com/watch?v=rZH_0aW7cNk'),

('Resume.io', 'Perfil profesional', 'Generador de CVs modernos y elegantes', 'Gratis / $2.95 por descarga', ARRAY['Plantillas', 'Editor intuitivo'], 'https://resume.io', 'https://support.resume.io/'),

('Kickresume', 'Perfil profesional', 'Creador de CVs con asistencia de IA', 'Desde $5.99/mes', ARRAY['Plantillas IA', 'Editor automático'], 'https://www.kickresume.com', 'https://blog.kickresume.com');

