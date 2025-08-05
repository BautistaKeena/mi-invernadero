"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import ScrollingCarousel from "@/components/ScrollingCarousel";
import { Home as GreenhouseIcon, Shield, Sun, Droplets, Loader2, CheckCircle, AlertCircle, Check, Wrench, Truck, Building2, Settings, Ruler, Home as HomeIcon, Image, Clock, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

// Componente de partículas flotantes (polen y semillas)
const FloatingParticles = ({ count = 15 }: { count?: number }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    delay: number;
    duration: number;
    left: number;
    type: 'pollen' | 'seed';
  }>>([]);

  useEffect(() => {
    setParticles(Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2-6px
      delay: Math.random() * 15, // 0-15s delay
      duration: Math.random() * 20 + 10, // 10-30s duration
      left: Math.random() * 100, // 0-100% left position
      type: Math.random() > 0.6 ? 'pollen' : 'seed' // 60% seeds, 40% pollen
    })));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute opacity-40 ${particle.type === 'pollen' ? 'bg-yellow-300/60' : 'bg-green-natural/50'
            } rounded-full animate-float-particle`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Componente de botón flotante de WhatsApp
const WhatsAppButton = () => {
  const phoneNumber = "5491165850112"; // Número de teléfono (cambiar por el real de Chanyman Greengarden)
  const message = "¡Hola! Me interesa conocer más sobre los invernaderos artesanales de Chanyman Greengarden.";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 group whatsapp-pulse hover:animate-none sm:bottom-8 sm:right-8"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      {/* WhatsApp Icon */}
      <svg
        className="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
      </svg>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        ¡Contáctanos por WhatsApp!
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </motion.button>
  );
};

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    mensaje: "",
  });

  const [formStatus, setFormStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  // Configuración de EmailJS - IMPORTANTE: Reemplazar con tus datos reales
  // Consulta el archivo emailjs-config.md para instrucciones detalladas
  const EMAILJS_SERVICE_ID = "service_g2p3pmk"; // Tu Service ID de EmailJS
  const EMAILJS_TEMPLATE_ID = "template_1fbcq05"; // Tu Template ID de EmailJS
  const EMAILJS_PUBLIC_KEY = "3zFm2u6RWRowBTyeg"; // Tu Public Key de EmailJS

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      // Validación básica
      if (!formData.nombre.trim()) {
        throw new Error("Por favor, ingresa tu nombre.");
      }
      if (!formData.telefono.trim()) {
        throw new Error("Por favor, ingresa tu teléfono.");
      }
      if (!formData.mensaje.trim()) {
        throw new Error("Por favor, escribe un mensaje.");
      }

      // Validación de teléfono básica
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.telefono)) {
        throw new Error("Por favor, ingresa un número de teléfono válido.");
      }

      // Preparar datos para EmailJS
      const templateParams = {
        from_name: formData.nombre,
        from_phone: formData.telefono,
        message: formData.mensaje,
        to_name: "Chanyman Greengarden",
        reply_to: formData.telefono,
      };

      // Enviar email usando EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setFormStatus({ loading: false, success: true, error: null });
        setFormData({ nombre: "", telefono: "", mensaje: "" });

        // Limpiar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setFormStatus({ loading: false, success: false, error: null });
        }, 5000);
      }
    } catch (error: unknown) {
      console.error("Error al enviar el formulario:", error);
      const errorMessage = error instanceof Error ? error.message : "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.";
      setFormStatus({
        loading: false,
        success: false,
        error: errorMessage
      });

      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: null });
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Particles Effect */}
      <FloatingParticles count={12} />

      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6 md:p-[25px] my-[0px] py-[9px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-natural rounded-xl flex items-center justify-center relative">
              <GreenhouseIcon className="h-6 w-6 text-white" />
              <div className="absolute -bottom-1 -right-1 bg-white text-green-natural text-xs font-bold px-1 py-0.5 rounded text-[8px]">
                CG
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-montserrat font-bold text-white">
                Chanyman Greengarden
              </h1>
              <p className="text-sm text-muted-foreground">Cultiva tus sueños</p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://m.media-amazon.com/images/I/910qWdhPaDL.jpg"
            alt="Invernadero profesional"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60 my-[0px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center md:py-[46px] my-[97px]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 md:my-[0px] md:py-[0px]"
          >
            <div className="space-y-6 md:my-[92px] py-[0px]">
              <h2 className="lg:text-6xl font-montserrat font-bold text-white text-left text-[43px] mx-[0px] px-[0px]">
                Invernaderos
                <br />
                <span className="text-green-natural">Artesanales</span>
              </h2>
              <p className="text-muted-foreground md:my-[0px] md:py-[0px] text-left text-[15px] px-[0px]">
                Estructura de hierro resistente con placas de policarbonato de
                alta calidad. Techo a dos aguas, puerta frontal y ventanas
                laterales para una ventilación perfecta.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 md:my-[0px] md:py-[0px]">
              {[
                { icon: Shield, text: "Estructura resistente" },
                { icon: Sun, text: "Protección UV" },
                { icon: Droplets, text: "Ventilación perfecta" },
                { icon: GreenhouseIcon, text: "Diseño funcional" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-green-natural/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-green-natural" />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 md:px-[30px]"
            >
              <Button
                size="lg"
                className="bg-green-natural hover:bg-green-natural/90 text-white px-8 py-4 text-lg font-semibold"
                onClick={() =>
                  document.getElementById("contacto")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Solicitar Cotización
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-natural text-green-natural hover:bg-green-natural hover:text-white px-8 py-4 text-lg font-semibold"
                onClick={() =>
                  document.getElementById("contacto")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Quiero Uno
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://i.imgur.com/ygCZXWv.jpeg"
                alt="Chanyman Greengarden - Estructura de hierro con policarbonato"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Floating Feature Card */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="bg-card border border-green-natural/20 p-6 shadow-xl rounded-[20px] cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-green-natural/20 hover:scale-105 hover:bg-gradient-to-br hover:from-card hover:to-green-natural/5 hover:border-green-natural/40"
                onClick={() =>
                  document.getElementById("proceso-artesanal")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
              <div className="text-center">
                <div className="font-bold text-green-natural text-[20px] py-[0px]">100%</div>
                <div className="text-muted-foreground text-[12px]">Artesanal</div>
              </div>
              </motion.div>
            </div>


          </motion.div>
        </div>
      </section>

      {/* Artisanal Process Section */}
      <section id="proceso-artesanal" className="py-20 bg-gradient-to-br from-background to-card/30 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl lg:text-5xl font-montserrat font-bold text-white mb-6">
              Proceso{" "}
              <span className="text-green-natural">Artesanal</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cada invernadero de Chanyman Greengarden es único, creado con dedicación
              y atención a cada detalle. Conoce nuestro proceso de fabricación artesanal.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Diseño Personalizado",
                description: "Creamos un diseño único según tus necesidades y espacio disponible.",
                image: "https://i.imgur.com/Iucyws4.png"
              },
              {
                step: "02",
                title: "Corte de Hierro",
                description: "Cortamos y preparamos la estructura de hierro con precisión artesanal.",
                image: "https://i.imgur.com/pNLxFd4.png"
              },
              {
                step: "03",
                title: "Soldadura Experta",
                description: "Soldamos cada junta con técnica profesional para máxima durabilidad.",
                image: "https://i.imgur.com/j9ZSZbf.jpeg"
              },
              {
                step: "04",
                title: "Instalación Final",
                description: "Instalamos las placas de policarbonato y realizamos los acabados finales.",
                image: "https://m.media-amazon.com/images/I/910qWdhPaDL.jpg"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden bg-card border border-green-natural/20 hover:border-green-natural/40 transition-all duration-300">
                  {/* Background Image */}
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                    <img
                      src={process.image}
                      alt={process.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-end px-[18px] py-[38px]">
                    <div className="text-green-natural font-montserrat font-bold text-lg mb-2">
                      {process.step}
                    </div>
                    <h4 className="text-white font-semibold text-xl mb-3 group-hover:text-green-natural transition-colors">
                      {process.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {process.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quality Promise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-green-natural/10 border border-green-natural/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="text-2xl mb-4">🌱</div>
              <h4 className="font-montserrat font-bold text-white mb-4 text-[19px]">
                Garantía de Calidad Artesanal
              </h4>
              <p className="text-muted-foreground text-[13px] mx-[0px] p-[0px]">
                Cada invernadero viene con garantía de materiales y mano de obra.
                Nuestro compromiso es entregar un producto que perdure por años,
                creado con la pasión y experiencia de verdaderos artesanos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Models Comparison Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-card/30 to-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-montserrat font-bold text-white mb-6 text-center px-4">
              Elegí el modelo{" "}
              <span className="text-green-natural">perfecto</span>{" "}
              para tu jardín
            </h3>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch relative">

            {/* Left Column - Standard Greenhouse */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-card/80 border-2 border-green-natural/30 rounded-3xl p-4 md:p-6 lg:p-8 relative overflow-hidden backdrop-blur-sm">
                {/* Hand-drawn style border effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-green-natural/20 transform rotate-1"></div>
                <div className="absolute inset-0 rounded-3xl border border-green-natural/10 transform -rotate-1 px-[0px]"></div>

                {/* Title */}
                <div className="relative z-10">
                  <h4 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-4 md:mb-6 text-center">
                    Invernadero <span className="text-green-natural">Estándar</span>
                  </h4>

                  {/* Image Cover */}
                  <div className="mb-6 md:mb-8 relative">
                    <div className="h-48 md:h-56 lg:h-64 rounded-2xl border-2 border-green-natural/40 relative overflow-hidden">
                      <img
                        src="https://i.imgur.com/uwyysqy.png"
                        alt="Invernadero Estándar - Chanyman Greengarden"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  </div>

                  {/* Photo Carousel Placeholder */}
                  <div className="mb-6 md:mb-8">
                    <h5 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Galería de fotos</h5>
                    <ScrollingCarousel
                      images={["https://i.imgur.com/nDzMftc.jpeg","https://i.imgur.com/AOUzKZb.jpeg","https://i.imgur.com/jPy4WET.jpeg","https://i.imgur.com/AcH74od.jpeg","https://i.imgur.com/BGFZ9eF.jpeg","https://i.imgur.com/jEBSMY5.jpeg"]}
                      className="mt-2"
                    />
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <Check className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Medidas fijas: 180 cm x 205 cm x 235 cm</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <Wrench className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Armado simple en casa</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <Truck className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Envío inmediato (disponible en stock)</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <Building2 className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Puerta centrada y ventanas plegables</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <Settings className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Material: hierro + policarbonato</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-green-natural hover:bg-green-natural/90 text-white font-semibold py-3 md:py-4 text-base md:text-lg rounded-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() =>
                      document.getElementById("contacto")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Lo quiero ahora
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Soft Divider Line */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-green-natural/40 to-transparent z-10"></div>

            {/* Right Column - Custom Greenhouse */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-card/80 border-2 border-green-natural/30 rounded-3xl p-4 md:p-6 lg:p-8 relative overflow-hidden backdrop-blur-sm">
                {/* Hand-drawn style border effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-green-natural/20 transform -rotate-1"></div>
                <div className="absolute inset-0 rounded-3xl border border-green-natural/10 transform rotate-1"></div>

                {/* Title */}
                <div className="relative z-10">
                  <h4 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-4 md:mb-6 text-center">
                    Invernadero <span className="text-green-natural">Personalizado</span>
                  </h4>

                  {/* Image Cover */}
                  <div className="mb-6 md:mb-8 relative">
                    <div className="h-48 md:h-56 lg:h-64 rounded-2xl border-2 border-green-natural/40 relative overflow-hidden">
                      <img
                        src="https://i.imgur.com/1jtBCr3.jpeg"
                        alt="Invernadero Personalizado - Chanyman Greengarden"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-natural/30 via-transparent to-transparent" />
                      {/* Custom badge */}
                      <div className="absolute top-3 right-3 bg-green-natural/90 text-white text-xs px-2 py-1 rounded-full font-semibold">
                       o
                      </div>
                    </div>
                  </div>

                  {/* Photo Carousel Placeholder */}
                  <div className="mb-6 md:mb-8">
                    <h5 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Galería de proyectos</h5>
                    <ScrollingCarousel
                      images={["https://i.imgur.com/JPu4hOu.jpeg","https://i.imgur.com/lUaaAiQ.jpeg","https://i.imgur.com/eKZzICE.jpeg","https://i.imgur.com/7wxKwXw.jpeg","https://i.imgur.com/dWy8TQU.jpeg"]}
                      className="mt-2"
                    />
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <Ruler className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Hecho a medida para tu espacio</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <HomeIcon className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Elegís las dimensiones exactas</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <Image className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Opciones de puertas, ventanas y altura</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <Clock className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Mayor tiempo de preparación</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
                      <MessageCircle className="text-green-natural w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>Cotización a medida incluida</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full border-green-natural text-green-natural hover:bg-green-natural hover:text-white font-semibold py-3 md:py-4 text-base md:text-lg rounded-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() =>
                      document.getElementById("contacto")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Cotizar mi invernadero
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-card/50 relative overflow-hidden">

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="font-montserrat font-bold text-white mb-4 text-[33px]">
              ¿Listo para tu{" "}
              <span className="text-green-natural">Invernadero?</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-[15px]">
              Contactanos para recibir una cotización personalizada. Cada
              invernadero es único y está hecho con la máxima atención al
              detalle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-green-natural/20 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-white font-medium">
                        Nombre completo
                      </Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        placeholder="Tu nombre"
                        required
                        className="bg-background border-green-natural/30 focus:border-green-natural text-white placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-white font-medium">
                        Teléfono
                      </Label>
                      <Input
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                        placeholder="Tu número de teléfono"
                        required
                        className="bg-background border-green-natural/30 focus:border-green-natural text-white placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-white font-medium">
                      Mensaje
                    </Label>
                    <Textarea
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      placeholder="Cuéntanos sobre tu proyecto, dimensiones deseadas, ubicación, etc."
                      rows={4}
                      required
                      className="bg-background border-green-natural/30 focus:border-green-natural text-white placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={formStatus.loading}
                    className="w-full bg-green-natural hover:bg-green-natural/90 disabled:bg-green-natural/50 text-white py-4 text-lg font-semibold transition-all duration-300"
                  >
                    {formStatus.loading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      "Enviar Consulta"
                    )}
                  </Button>

                  {/* Status Messages */}
                  {formStatus.success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>¡Mensaje enviado exitosamente! Te contactaremos pronto.</span>
                    </motion.div>
                  )}

                  {formStatus.error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{formStatus.error}</span>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* TikTok Section */}
      <section className="py-16 bg-gradient-to-br from-background to-card/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Large TikTok Icon */}
            <motion.a
              href="https://www.tiktok.com/@chanyman7"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/30 mb-6"
              aria-label="Mira nuestros trabajos en TikTok"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </motion.a>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white font-medium"
            >
              Mira nuestros trabajos en TikTok
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-green-natural/20 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-green-natural rounded-lg flex items-center justify-center relative">
                <GreenhouseIcon className="h-5 w-5 text-white" />
                <div className="absolute -bottom-0.5 -right-0.5 bg-white text-green-natural text-xs font-bold px-1 py-0.5 rounded text-[7px]">
                  CG
                </div>
              </div>
              <div>
                <div className="font-montserrat font-bold text-white">
                  Chanyman Greengarden
                </div>
                <div className="text-sm text-muted-foreground">
                  Cultiva tus sueños
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              © 2025 Chanyman Greengarden. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
