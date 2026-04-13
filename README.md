# Sistema de Gestión de Usuarios (UserNexus)

Este es un dashboard moderno y premium para la gestión de usuarios (CRUD) desarrollado con **Vue 3**, **TypeScript** y **Vite**.

## 🚀 Características Principales

- **Gestión Completa (CRUD):** Creación, lectura, actualización y eliminación de usuarios.
- **Migración a TypeScript:** Código robusto y tipado para minimizar errores y mejorar la experiencia de desarrollo.
- **Interfaz Premium:** Diseño limpio basado en el concepto "UserNexus", con tipografía Inter, sombras sutiles y transiciones suaves.
- **Diseño Responsive:**
  - **Escritorio:** Tabla detallada con acciones al pasar el mouse (hover).
  - **Móvil:** Vista de tarjetas (cards) optimizada para dispositivos táctiles.
- **Búsqueda en Tiempo Real:** Filtrado instantáneo por nombre, usuario o correo electrónico.
- **Sistema de Feedback:** Notificaciones globales (Toasts) para confirmaciones de acciones.
- **Confirmación de Acciones:** Diálogo de confirmación personalizado para evitar eliminaciones accidentales.

## 🛠️ Tecnologías Utilizadas

- **Framework:** Vue 3 (Composition API)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Herramientas:** Vite, vue-tsc

## 📂 Estructura del Proyecto

- `src/components/layout/`: Componentes estructurales (Header, Footer).
- `src/components/ui/`: Biblioteca de componentes atómicos (BaseButton, BaseToast, BaseConfirm).
- `src/components/`: Componentes de funcionalidad principal (UserTable, UserModal).
- `src/composables/`: Lógica de negocio y gestión de estado (useUsers, useToasts).
- `src/services/`: Comunicación con la API externa.
- `src/types/`: Definiciones de interfaces y contratos de datos.

## 🛠️ Instalación y Desarrollo

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Verificación de tipos (TypeScript):**
   ```bash
   npm run type-check
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

