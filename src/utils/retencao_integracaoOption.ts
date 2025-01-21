import callSvg from "@/assets/phone-svg.svg";
import emailSvg from "@/assets/email-svg.svg";
import humanCenter from "@/assets/human-call-svg.svg";
import integracaoSvg from "@/assets/link-svg.svg";
import makeSvg from "@/assets/make-svg.svg";
import smsSvg from "@/assets/sms-svg.svg";
import whatsAppSvg from "@/assets/whatsapp-svg.svg";


export const retencao_integracaoOption = [
    { type: "call", label: "Ligação", icon: callSvg },
    { type: "email", label: "E-mail", icon: emailSvg },
    { type: "humanCall", label: "Atendimento Humano", icon: humanCenter },
    { type: "integracao", label: "Integração", icon: integracaoSvg },
    { type: "sms", label: "SMS", icon: smsSvg },
    { type: "makeCRM", label: "MakeCRM", icon: makeSvg },
    { type: "whatsApp", label: "WhatsApp", icon: whatsAppSvg },
  ];



//      call: Call,
//     email: Email,
//     humanCall: HumanCall,
//     integracao: Integracao,
//     makeCRM: MakeCRM,
//     sms: SMS,
//     whatsApp: WhatsApp,