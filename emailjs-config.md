# Configuración de EmailJS para Chanyman Greengarden

## Pasos para configurar el envío de emails:

### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Crea una cuenta gratuita
- Confirma tu email

### 2. Configurar el servicio
- En el dashboard, ve a "Email Services"
- Haz clic en "Add New Service"
- Selecciona tu proveedor de email (Gmail, Outlook, etc.)
- Configura con tus credenciales
- Anota el **Service ID** generado

### 3. Crear el template
- Ve a "Email Templates"
- Haz clic en "Create New Template"
- Usa este template de ejemplo:

```html
Asunto: Nueva consulta de invernadero - {{from_name}}

De: {{from_name}}
Teléfono: {{from_phone}}

Mensaje:
{{message}}

---
Enviado desde: Chanyman Greengarden Website
```

- Variables disponibles:
  - `{{from_name}}` - Nombre del cliente
  - `{{from_phone}}` - Teléfono del cliente
  - `{{message}}` - Mensaje del cliente
  - `{{to_name}}` - "Chanyman Greengarden"

- Anota el **Template ID** generado

### 4. Obtener Public Key
- Ve a "Account" > "General"
- Copia tu **Public Key**

### 5. Actualizar el código
Reemplaza estas variables en `src/app/page.tsx`:

```typescript
const EMAILJS_SERVICE_ID = "tu_service_id_aqui";
const EMAILJS_TEMPLATE_ID = "tu_template_id_aqui";
const EMAILJS_PUBLIC_KEY = "tu_public_key_aqui";
```

### 6. Configurar email de destino
- En el template de EmailJS, configura el email donde quieres recibir las consultas
- Puedes usar múltiples destinatarios separados por comas

### 7. Probar el formulario
- Completa el formulario en la web
- Verifica que llegue el email
- Revisa la carpeta de spam si no llega

## Límites del plan gratuito:
- 200 emails por mes
- Para más volumen, considera upgradar a plan pago

## Troubleshooting:
- Si no llegan emails, verifica las credenciales del servicio
- Asegúrate de que el email origen esté verificado
- Revisa la consola del navegador para errores de JavaScript
