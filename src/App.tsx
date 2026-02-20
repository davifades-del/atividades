import React, { useState, useEffect, useRef } from 'react';
import { Check, Star, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLElement>(null); // Ref para a seção de oferta
  const images = [
    "img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png",
    "img/6.png", "img/7.png", "img/8.png", "img/9.png", "img/10.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.children[currentSlide]?.clientWidth || 0;
      const scrollLeft = currentSlide * (slideWidth + 24); // 24px is the gap (space-x-6)
      carouselRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  const scrollToOffer = () => {
    offerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <header className="bg-[#eef4f8] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1e293b] leading-tight mb-10">
            <span className="block text-5xl sm:text-6xl md:text-7xl mb-2">+5000</span>
            Atividades Educativas e<br className="hidden sm:block" /> Divertidas Para Aprender<br className="hidden sm:block" /> Brincando!
          </h1>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 aspect-video max-w-3xl mx-auto">
            <img 
              src="img/11.png" 
              alt="Criança aprendendo e brincando" 
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-2xl mx-auto space-y-6 mb-10">
            <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed">
              Sem Celular e Sem Telas! Estimule a coordenação motora e a<br className="hidden sm:block" /> criatividade do seu filho hoje mesmo.
            </p>
            <p className="text-sm sm:text-base text-slate-500">
              O combo definitivo para apoiar a alfabetização de forma leve e divertida. Educação prática<br className="hidden sm:block" /> e saudável para o dia a dia.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToOffer}
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            QUERO AGORA
            <ChevronRight className="ml-2 w-6 h-6" />
          </motion.button>
        </div>
      </header>

      {/* What you get */}
      <section className="py-16 bg-indigo-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">O Que Você Recebe</h2>
            <p className="text-lg text-slate-600">Tudo que você precisa para o desenvolvimento saudável do seu pequeno.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Blocks */}
            {[
              { icon: '📚', text: '+ 5000 Atividades Educativas e Divertidas Para Aprender Brincando — Sem Celular e Sem Telas!' },
              { icon: '✅', text: 'Atividades de Alfabetização' },
              { icon: '✅', text: 'Atividades de Caligrafia' },
              { icon: '✅', text: 'Atividades de Coordenação Motora' },
              { icon: '✅', text: 'Atividades de Consciência Fonológica' },
              { icon: '✅', text: 'Atividades de Silabação / Famílias Silábicas' },
              { icon: '✨', text: 'Atividades de Matemática (Adição, Subtração e Contagem)' },
              { icon: '✨', text: 'E muito mais!' },
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex items-start space-x-4"
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <p className="text-lg font-medium text-slate-800">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Um pouco do que você vai encontrar</h2>
        </div>
        <div ref={carouselRef} className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar px-4 sm:px-6 lg:px-8 space-x-6 max-w-7xl mx-auto">
          {images.map((slug, i) => (
            <div key={i} className="snap-center shrink-0 w-72 sm:w-96 rounded-2xl overflow-hidden shadow-md">
              <img 
                // Alteração 2: src apontando direto para o caminho da sua pasta local
                src={slug} 
                alt={`Atividade ${i + 1}`}
                className="w-full h-96 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Summary Block */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl text-left">
            <ul className="space-y-4 text-lg sm:text-xl font-medium leading-relaxed">
              <li className="flex items-start"><span className="mr-3 shrink-0">📚</span> <span>+ 5000 Atividades Educativas e Divertidas Para Aprender Brincando — Sem Celular e Sem Telas!</span></li>
              <li className="flex items-start"><span className="mr-3 shrink-0">✅</span> <span>Estimula coordenação motora</span></li>
              <li className="flex items-start"><span className="mr-3 shrink-0">✅</span> <span>Desenvolve criatividade</span></li>
              <li className="flex items-start"><span className="mr-3 shrink-0">✅</span> <span>Apoia a alfabetização de forma leve</span></li>
              <li className="flex items-start"><span className="mr-3 shrink-0">✅</span> <span>Atividades lúdicas e envolventes</span></li>
              <li className="flex items-start"><span className="mr-3 shrink-0">✅</span> <span>Ideal para crianças aprenderem longe das telas</span></li>
              <li className="flex items-start"><span className="mr-3 shrink-0">✨</span> <span>Educação divertida, prática e saudável para o dia a dia.</span></li>
            </ul>
          </div>
          <div className="mt-12">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToOffer}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500 transition-colors"
            >
              QUERO GARANTIR MEU ACESSO
              <ChevronRight className="ml-2 w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">O que as mães estão dizendo</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { name: "Mariana S.", text: "Meu filho passava horas no tablet. Agora ele pede para fazer as atividades! Mudou nossa rotina.", img: "1" },
              { name: "Juliana F.", text: "Material incrível! Muito bem feito e realmente ajuda na alfabetização. Recomendo de olhos fechados.", img: "2" },
              { name: "Camila R.", text: "A melhor compra que fiz esse ano. A criatividade da minha filha voou depois que começamos.", img: "3" },
              { name: "Amanda T.", text: "Prático demais. É só imprimir e a diversão tá garantida. Salvou meus finais de semana!", img: "4" },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
                <img 
                  src={`https://picsum.photos/seed/face${t.img}/100/100`} 
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 italic mb-2">"{t.text}"</p>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Offer */}
      <section ref={offerRef} className="py-20 bg-indigo-600 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8">Aproveite a Oferta Especial</h2>
          
          <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl mb-8 border-4 border-yellow-400">
            <div className="mb-8">
              <p className="text-lg text-slate-500 line-through mb-2">De R$ 97,00 por apenas</p>
              <div className="text-6xl font-black text-indigo-600 mb-2">R$ 16,90</div>
              <p className="text-sm font-bold text-green-600 uppercase tracking-wider">Pagamento Único • Acesso Vitalício</p>
            </div>

            <ul className="space-y-3 text-left text-base sm:text-lg font-medium text-slate-700 mb-8">
              <li className="flex items-start"><span className="mr-2 shrink-0">📚</span> <span>+ 5000 Atividades Educativas e Divertidas Para Aprender Brincando — Sem Celular e Sem Telas!</span></li>
              <li className="flex items-start"><span className="mr-2 shrink-0">✅</span> <span>Atividades de Caligrafia</span></li>
              <li className="flex items-start"><span className="mr-2 shrink-0">✅</span> <span>Atividades de Coordenação Motora</span></li>
              <li className="flex items-start"><span className="mr-2 shrink-0">✅</span> <span>Atividades de Consciência Fonológica</span></li>
              <li className="flex items-start"><span className="mr-2 shrink-0">✅</span> <span>Atividades de Silabação / Famílias Silábicas</span></li>
              <li className="flex items-start"><span className="mr-2 shrink-0">✅</span> <span>Atividades de Matemática (Adição, Subtração e Contagem)</span></li>
              <li className="flex items-start"><span className="mr-2 shrink-0">✨</span> <span>Atividades Inclusivas (Focadas em Autismo/TEA e TDAH) E MUITO MAIS!</span></li>
            </ul>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'https://cartas-de-paulo.mycartpanda.com/checkout/205919420:1'}
              className="w-full inline-flex items-center justify-center px-8 py-5 text-xl font-black text-white bg-green-500 rounded-2xl shadow-[0_8px_0_rgb(21,128,61)] hover:bg-green-400 hover:translate-y-1 hover:shadow-[0_4px_0_rgb(21,128,61)] transition-all"
            >
              QUERO COMPRAR AGORA POR R$ 16,90
            </motion.button>
            <p className="mt-4 text-xs text-slate-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 mr-1" /> Compra 100% Segura
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[ 
              {
                q: "Como vou receber o material?",
                a: "O acesso é 100% digital. Após a confirmação do pagamento, você receberá um e-mail com o link para baixar e imprimir o conteúdo no seu tempo. O material fica salvo no seu email."
              },
              {
                q: "O material trabalha a Inclusão?",
                a: "Sim. As atividades são desenvolvidas com linguagem clara e elementos visuais que facilitam o aprendizado, sendo adaptáveis para diferentes necessidades pedagógicas."
              },
              {
                q: "Se eu não gostar do produto, posso cancelar?",
                a: "Sim. Você tem uma garantia de 7 dias feita pela plataforma Cartpanda, uma das maiores plataformas de livros online do Brasil. Se o material não atender às suas expectativas, basta solicitar o reembolso integral dentro desse prazo direto da plataforma."
              },
              {
                q: "São quantas atividades?",
                a: "O material completo conta com 5000 atividades diversificadas e prontas para aplicação."
              },
              {
                q: "Qual a idade indicada?",
                a: "O material é focado principalmente em crianças de 3 a 8 anos"
              },
              {
                q: "Crianças acima de 10 anos podem realizar essas atividades?",
                a: "Sim. Embora o foco seja o ensino infantil/fundamental, elas são excelentes para reforço escolar ou para crianças com dificuldades de aprendizado que precisem retomar conceitos básicos."
              },
              {
                q: "Como posso entrar em contato com vocês?",
                a: "Você pode falar com o nosso suporte através do e-mail profdayanebrandao@hotmail.com ou pelo nosso WhatsApp de atendimento oficial (42999215552)."
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
      
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg bg-white shadow-sm">
      <button
        className="flex justify-between items-center w-full p-5 text-lg font-medium text-left text-slate-800 hover:bg-slate-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronRight className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-5 pt-0 text-slate-600 border-t border-slate-100">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};
