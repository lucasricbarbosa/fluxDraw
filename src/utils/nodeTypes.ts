import { BracketRight } from "@/components/nodes/brackets/bracketRight";
import { BracketLeft } from "@/components/nodes/brackets/bracketLeft";
import { Circle } from "@/components/nodes/circle";
import { Column } from "@/components/nodes/column";
import { LandingPage } from "@/components/nodes/engajamento/landingPage";
import { LandingPageMake } from "@/components/nodes/engajamento/landingPageMake";
import { SalesPage } from "@/components/nodes/engajamento/salesPage";
import { Funnel } from "@/components/nodes/funnel";
import { Image } from "@/components/nodes/image";
import { Call } from "@/components/nodes/retencao-integracao/call";
import { Email } from "@/components/nodes/retencao-integracao/email";
import { HumanCall } from "@/components/nodes/retencao-integracao/humanCall";
import { Integracao } from "@/components/nodes/retencao-integracao/integracao";
import { MakeCRM } from "@/components/nodes/retencao-integracao/makeCRM";
import { SMS } from "@/components/nodes/retencao-integracao/sms";
import { WhatsApp } from "@/components/nodes/retencao-integracao/whatsApp";
import { Square } from "@/components/nodes/square";
import { StickyNote } from "@/components/nodes/stickyNote";
import { Text } from "@/components/nodes/text";
import { Google } from "@/components/nodes/trafego/google";
import { Instagram } from "@/components/nodes/trafego/instagram";
import { Kwai } from "@/components/nodes/trafego/kwai";
import { Linkedin } from "@/components/nodes/trafego/linkedin";
import { Meta } from "@/components/nodes/trafego/meta";
import { Pinterest } from "@/components/nodes/trafego/pinterest";
import { TikTok } from "@/components/nodes/trafego/tiktok";
import { Website } from "@/components/nodes/trafego/website";
import { XNetwork } from "@/components/nodes/trafego/x";
import { YouTube } from "@/components/nodes/trafego/youtube";
import { Diamond } from "@/components/nodes/triangle";
import { BracketBottom } from "@/components/nodes/brackets/bracketBottom";
import { BracketTop } from "@/components/nodes/brackets/bracketTop";

export const NODE_TYPES = {
    square: Square,
    funnel: Funnel,
    image: Image,
    circle: Circle,
    text: Text,
    diamond: Diamond,
    stickyNote: StickyNote,
    column: Column,
    meta: Meta,
    google: Google,
    instagram: Instagram,
    kwai: Kwai,
    linkedin: Linkedin,
    pinterest: Pinterest,
    tiktok: TikTok,
    website: Website,
    x: XNetwork,
    youtube: YouTube,

    bracketLeft: BracketLeft,
    bracketRight: BracketRight,
    bracketBottom: BracketBottom,
    bracketTop: BracketTop,
    
    landingPageMake: LandingPageMake,
    landingPage: LandingPage,
    salesPage: SalesPage,

    call: Call,
    email: Email,
    humanCall: HumanCall,
    integracao: Integracao,
    makeCRM: MakeCRM,
    sms: SMS,
    whatsApp: WhatsApp,
  };