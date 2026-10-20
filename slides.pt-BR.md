# Mesma música, três sistemas
# Bianca Cheng — palestra HeartMula · Festival Futuros Possíveis · Casa Firjan
#
# Versão em português (pt-BR). Aberta por index.pt-BR.html.
# Fatos atualizados para bater com o código atual de bia-music-composer
# (MERT no lugar do WavLM, 64 tokens de prefixo, termo melódico na loss, 16 pares).

---
type: hero
photo: ./bianca-singing.png
photo-alt: Bianca Cheng cantando ao vivo com a banda, luzes quentes penduradas acima
eyebrow: Música, design e máquinas
title: |
  Ensinando a IA<br />a fazer música<br /><em>do meu jeito</em>
meta-left: Bianca&nbsp;Cheng
meta-right: Futuros&nbsp;Possíveis&nbsp;· Casa&nbsp;Firjan
---
type: center
eyebrow: São Paulo
quote: |
  Eu nasci<br />em <em>São&nbsp;Paulo.</em>
muted: Uma cidade que nunca para — e a primeira trilha sonora da minha&nbsp;vida.
photo-bg: ./media/bio-sao-paulo.jpg
photo-bg-alt: Vista de São Paulo ao entardecer, com o Pico do Jaraguá ao fundo
photo-bg-style: full
photo-bg-pos: 50% 62%
---
type: stack
eyebrow: Cultura
heading: Três culturas na mesma&nbsp;mesa.
lede: Mãe chinesa, pai italiano, infância no&nbsp;Brasil.
body: |
  Cresci entre línguas, comidas e músicas diferentes. Hoje trabalho em sete idiomas —
  e acho que foi aí que aprendi a ouvir as coisas de mais de um&nbsp;jeito.
photo-bg: ./media/bio-infancia.jpg
photo-bg-alt: Bianca bebê, sorrindo, comendo um pedaço de pão numa cadeirinha
photo-bg-style: side
photo-bg-pos: 50% 30%
---
type: stack
eyebrow: MIT · Arte e ciência
heading: Matemática, ciência… e&nbsp;arte.
body: |
  Na escola, eu gostava mesmo era de matemática e ciência — e isso me levou a estudar
  engenharia no MIT.

  Lá encontrei um lugar onde o meu amor por tecnologia e por arte podia
  coexistir: trabalhei no <strong>Tangible Media Group</strong> do
  <strong>Hiroshi Ishii</strong>, no MIT Media Lab — onde a ideia é dar forma física à
  informação, para que a gente possa tocá-la. Esse trabalho com o Hiroshi foi exposto no
  <strong>Ars&nbsp;Electronica</strong>.
photo-bg: ./media/bio-mit-media-lab.jpg
photo-bg-alt: Prédio do MIT Media Lab iluminado ao entardecer
photo-bg-style: full
photo-bg-pos: 50% 45%
---
type: pipeline-step
eyebrow: Apple · Arte e ciência
title: O trackpad háptico do&nbsp;MacBook.
sub: |
  Ainda no MIT, com o iPhone recém-lançado, recebi uma proposta para o grupo de
  prototipagem de software da Apple. Lá inventei o trackpad háptico do MacBook — de novo,
  unindo o meu sentido do toque ao mundo digital. Onze patentes nos Estados&nbsp;Unidos.
image: ./media/bio-apple-patentes.jpg
image-alt: Figuras de patentes da Apple — superfície sensível ao toque, intensidade de contato e uma interface musical
caption: Figuras de patentes · Apple
---
type: center
eyebrow: Hoje
quote: |
  Arte<br />e&nbsp;<em>empreendedorismo.</em>
photo-bg: ./media/bio-hoje.jpg
photo-bg-alt: Bianca envolta num tecido listrado que se desfaz em partículas
photo-bg-style: full
photo-bg-pos: 60% 40%
---
type: bullets
eyebrow: Hoje
heading: Muitos projetos, uma&nbsp;prática.
heading-style: display-sm
lede: Tudo o que faço é sobre a costura entre ferramenta e&nbsp;instrumento.
bullets:
  - <strong>Bloom Blanket</strong> — mantas de caxemira inspiradas em origami; o crowdfunding mais financiado da Espanha, mais de 2.000 mantas feitas à&nbsp;mão.
  - <strong>DZCO</strong> — o meu estúdio — áudio espacial, design de interação e ferramentas de IA para&nbsp;músicos.
  - <strong>Matter &amp; Form</strong> — cofundadora; lidero a camada de interface humana para agentes de&nbsp;IA.
  - <strong>AO</strong> — quarteto de neo-soul em Barcelona. Eu canto e toco&nbsp;teclado.
  - <strong>THIS IS BOSSA</strong> — duo de bossa nova autoral, com o violonista Esteban&nbsp;Matuke.
---
type: center
eyebrow: Música e tecnologia
quote: |
  Música<br />e <em>tecnologia.</em>
muted: O fio que liga tudo o que eu&nbsp;faço.
photo-bg: ./media/bio-musica-tecnologia.jpg
photo-bg-alt: Retrato gerado por IA de duas figuras com trajes e cocares laranja
photo-bg-style: full
photo-bg-pos: 50% 35%
---
type: media-video-pair
eyebrow: Um pouco de contexto
title: Duas eras de mim.
sub: |
  Da bossa nova (<em>THIS IS BOSSA</em>) ao neo-soul (<em>AO</em>) —
  a jornada que o modelo está tentando aprender.
sub-tight: true
layout: split
videos:
  - src: ./media/bossa-fugaz.mp4
    tag: Antes
    caption: THIS IS BOSSA · Fugaz
  - src: ./media/ao-moments.mp4
    tag: Agora
    tag-class: ao
    caption: AO · Moments
---
type: center
eyebrow: A pergunta que começou tudo
quote: |
  Uma máquina<br />consegue aprender<br />a soar <em>como eu?</em>
photo-bg: ./media/bia-live-blue.jpg
photo-bg-alt: Bianca ao vivo, mãos no microfone, luz azul
photo-bg-style: right
photo-bg-pos: 50% 35%
---
type: center
eyebrow: Parte 1 · Mesma música, três sistemas
quote: |
  O que acontece quando<br />eu ensino uma máquina<br />a fazer <em>a minha</em>&nbsp;música?
---
type: bullets
eyebrow: O experimento
heading: Mesma música, três sistemas.
heading-style: display-sm
lede: Uma canção minha, <em>Chuva</em>. Três maneiras de ensinar uma máquina a tocá-la do meu jeito.
bullets:
  - <strong>HeartMula</strong> — o meu próprio pipeline — fine-tuning do HeartMuLa-3B nos meus pares demo → arranjo.
  - <strong>ACE-Step 1.5</strong> — um modelo aberto, em duas versões — só com uma referência de estilo, e com um LoRA treinado nas minhas 16 músicas.
  - <strong>Suno</strong> — a ferramenta comercial que milhões de pessoas usam — e com quem vou cantar um dueto, ao vivo.
---
type: media-video
eyebrow: Jornada da composição · 01
title: Começou como um esboço.
sub: |
  Uma música chamada <em>Chuva</em> — sobre o primeiro dia de chuva no fim do verão,
  o dia em que uma das minhas melhores amigas mudou de Barcelona.
video: ./media/chuva-sketch.mov
caption-tag: Esboço
caption-text: Memo de voz · piano · Barcelona, 2023
layout: split
---
type: media-audio
eyebrow: A música · a entrada
title: A demo que os três recebem.
sub: |
  Dei a ele a demo de Chuva — com arranjo completo, cantada em português.
  <em>Bm7(9) · Em6 · "dia de chuva e acabou o verão."</em>
sub-tight: true
audio: ./media/chuva.wav
caption-tag: Chuva
caption-text: Todos os instrumentos e vozes — eu.
bg-image: ./media/chuva-sheet-music.jpg
bg-image-alt: Cifra de Chuva escrita à mão em papel pautado, com a letra em português
wave-style: song
wave-gradient: mixed
---
type: stack
section-class: section--ao section--ao--photo
photo: ./media/ao-band-wide.jpg
photo-alt: AO tocando ao vivo, banda completa no palco com luzes penduradas acima
heading: O que eu estava realmente pedindo.
lede: Não imitação. Evolução.
body: |
  Eu não estava pedindo ao modelo que me imitasse. Estava pedindo que me fizesse <em>evoluir</em>.

  Que pegasse Chuva — escrita em 2023, quando eu ainda era sobretudo bossa nova e MPB —
  e a puxasse para o neo-soul que escrevo hoje com o <strong>AO</strong>,
  minha banda em Barcelona.
muted: Não "soe como eu". Mais assim — <em>acompanhe o meu passo.</em>
---
type: stats
heading: O corpus sou eu
bg-image: ./media/voice-memos.jpg
bg-image-alt: Gravador do macOS mostrando títulos de músicas como Voar, Nada tudo, Lutar
stats:
  - num: "47"
    label: músicas
  - num: "12"
    label: anos
  - num: "312"
    label: memos de voz
  - num: "1"
    label: pianista que eu ainda não consigo replicar
muted: |
  Discos finalizados, demos pela metade, melodias cantaroladas em banheiros de aeroporto.
  Tudo o que já fiz, devolvido a um sistema que tentava se tornar eu.
---
type: center
eyebrow: Sistema 1 / 3
quote: |
  HeartMula.<br /><em>O meu próprio modelo.</em>
muted: Fine-tuning de um modelo aberto de 3 bilhões de parâmetros, nos meus pares demo → arranjo.
photo-bg: ./media/ao-pink-wall.jpg
photo-bg-alt: AO diante de um muro rosa, com teclado, microfone, baquetas e baixo
photo-bg-style: full
photo-bg-pos: 50% 62%
---
type: bullets
eyebrow: Sistema 1 · o projeto
heading: HeartMula
heading-style: display-sm
lede: Um experimento de criação musical colaborativa com IA, treinado no meu próprio catálogo.
bullets:
  - Não uma ferramenta que despeja música <em>em cima</em> de mim.
  - Uma parceira que improvisa <em>comigo</em>.
  - Um espelho — às vezes um estranho, às vezes exatamente certo.
---
type: media-audio
eyebrow: HeartMula · dia zero
title: Sem treino. Intocado.
sub: A primeira tentativa do modelo base — <em>antes de ter ouvido uma única nota minha.</em>
sub-tight: true
audio: ./media/first-output.wav
caption-tag: v0
caption-text: first-output.wav · antes do fine-tuning
style: raw
wave-style: noise
wave-gradient: lavender
tag-class: cool
---
type: model-stack
eyebrow: A stack
heading: Seis modelos, um ajustado.
groups:
  - label: Projeto HeartMuLa
    cards:
      - num: "01"
        name: HeartMuLa-oss-3B
        role: Modelo de linguagem musical
        detail: 3 bilhões de parâmetros · checkpoint happy-new-year (fev/2026) · base congelada, adaptador LoRA treina
        status: Adaptado · LoRA r16
        featured: true
      - num: "02"
        name: HeartCodec
        role: Codec de áudio neural
        detail: 12,5 Hz · áudio ↔ tokens
        status: Congelado
      - num: "03"
        name: HeartMuLaGen
        role: Tokenizer e assets de geração
        detail: Utilitários compartilhados
        status: Congelado
  - label: Auxiliares
    cards:
      - num: "04"
        name: MERT-v1-95M
        role: Encoder de áudio musical
        detail: Pré-treinado em música (substituiu o WavLM) · alimenta o módulo de condicionamento
        status: Congelado
      - num: "05"
        name: LAION CLAP
        role: Tags zero-shot
        detail: Gênero · instrumento · clima · andamento
        status: Congelado
      - num: "06"
        name: Whisper-large-v3
        role: Transcrição de letras
        detail: Detecção automática de idioma
        status: Congelado
---
type: pipeline-step
eyebrow: Pipeline · 01 / 05
title: Parear os dados.
sub: |
  WAVs de entrada (demos, esboços) pareados com WAVs-alvo (arranjos finalizados) pelo nome do arquivo.
  O modelo aprende o <em>movimento</em> entre eles — não só o catálogo.
image: ./media/pipeline-01-pair.jpg
image-alt: Finder mostrando a pasta data/paired/ com as subpastas inputs, outputs, lyrics e tags
caption: data/paired/ · pareado por nome de arquivo
---
type: pipeline-step
eyebrow: Pipeline · 02 / 05
title: Anotar automaticamente.
sub: |
  <strong>LAION CLAP</strong> gera tags zero-shot (gênero, instrumento, clima, andamento).
  <strong>Whisper-large-v3</strong> transcreve as letras. Zero rótulos manuais.
aside: |
  <strong>CLAP</strong> é o <strong>CLIP</strong> do áudio — sons e palavras vivem no
  mesmo espaço vetorial, então <em>"isso é um Rhodes?"</em> vira uma checagem de
  similaridade de cosseno. O <strong>HTSAT</strong> (Hierarchical Token-Semantic Audio
  Transformer) é o encoder de áudio por baixo.
image: ./media/pipeline-02-annotate.jpg
image-alt: VS Code editando annotate.py com a lógica de detecção de idioma do Whisper
caption: annotate.py · CLAP + Whisper
---
type: pipeline-step
eyebrow: Pipeline · 03 / 05
title: Condicionar o backbone.
sub: |
  Features por frame do <strong>MERT</strong> → agrupadas em <strong>64 tokens de prefixo</strong> →
  projetadas para a dimensão do backbone → no treino, prefixadas à sequência;
  na geração, somadas como viés global via forward hook.
aside: |
  Confissão: fiz esta ponte no vibe-coding, com IA — o
  <strong>AudioConditioningModule</strong> que liga o encoder ao backbone do HeartMuLa
  não teria saído da minha cabeça do zero. Comecei com o <strong>WavLM</strong>
  (feito para fala) e troquei pelo <strong>MERT</strong>, treinado em música.
image: ./media/pipeline-03-condition.jpg
image-alt: Painel do Claude explicando a arquitetura do AudioConditioningModule
caption: AudioConditioningModule · hook do MERT
---
type: pipeline-step
eyebrow: Pipeline · 04 / 05
title: Treinar com LoRA.
sub: |
  <strong>LoRA rank 16</strong> nas projeções de atenção do backbone global do
  HeartMuLa-3B. Os 3B de pesos base ficam congelados. Além da entropia cruzada,
  um <strong>termo melódico</strong> na loss aproxima a representação da demo
  da do arranjo final.
aside: |
  <strong>LoRA</strong> = Low-Rank Adaptation. Em vez de retreinar os 3 bilhões de
  parâmetros, você treina pequenas matrizes adaptadoras <em>B × A</em> que ajustam o
  comportamento do modelo. Cerca de <strong>10M parâmetros treináveis</strong> em rank 16 —
  umas <strong>300× menos</strong> que um fine-tuning completo; cabe numa única GPU e gera
  um adaptador de <strong>~20 MB</strong> que dá pra trocar como um plugin.
  É essa contagem pequena que torna viável treinar com <strong>poucos exemplos</strong> —
  <strong>16 pares</strong> de músicas já bastam para começar.
image: ./media/pipeline-04-train.jpg
image-alt: VS Code revisando finetune_audio2audio_direct.py para otimização de desempenho
caption: finetune_audio2audio.py · LoRA rank 16 · peso melódico 0,1
---
type: pipeline-step
eyebrow: Pipeline · 05 / 05
title: Gerar.
sub: |
  Aplica o adaptador LoRA, instala o hook de condicionamento, entrega uma entrada nova.
  Decodifica <strong>30 segundos</strong> de áudio.
image: ./media/pipeline-05-generate.jpg
image-alt: VS Code e painel do Claude trabalhando no pipeline de inferência generate_audio2audio.py
caption: generate_audio2audio.py · adaptador + hook
---
# TODO: Lições 01–02 são resultados do Sistema 1 (HeartMula).
type: lesson
eyebrow: Lição 01
heading: A IA é um espelho
lede: O modelo não inventou meus hábitos. Ele os revelou.
body: |
  Cada nota de conforto que eu uso demais. Cada acorde menor com nona que eu escolho às 2 da manhã.
  O modelo me devolveu uma versão polida das minhas escolhas inconscientes —
  lisonjeira, depois nem tanto, depois lisonjeira de novo.
audio:
  src: ./media/chuva-gen1.wav
  tag: Geração 01
  caption: Meus reflexos, cantados de volta pra mim.
callout: Ouvir meus próprios hábitos cantados de volta <em>mudou</em> o que eu escrevi depois.
---
type: lesson
eyebrow: Lição 02
heading: A IA é parceira de dueto
lede: Os melhores momentos não foram gerações. Foram diálogos.
body: |
  Eu tocava oito compassos. O modelo respondia. Eu discordava.
  A gente ia e voltava até a música virar algo que nenhum de nós teria escrito sozinho.

  Troque "modelo" por "baterista com quem eu saio em turnê" e o fluxo é idêntico.
audio:
  src: ./media/chuva-gen2.wav
  tag: Geração 02
  caption: O take que eu não vi chegando.
photo-bg: ./media/ao-rehearsal-bass.jpg
photo-bg-alt: Ensaio do AO, baixo em primeiro plano e Bianca cantando ao fundo
photo-bg-style: side
photo-bg-pos: 30% 40%
---
type: stack
eyebrow: Nove meses depois
heading: Por que mudar de modelo?
lede: Em música com IA, nove meses são uma geração inteira.
body: |
  Quando comecei o HeartMula, o modelo aberto que escolhi cantava canções inteiras —
  mas não aceitava um áudio de referência. Então eu construí essa ponte à mão:
  GPU na nuvem, erros de memória, um módulo de condicionamento feito no vibe-coding.

  Hoje, o <strong>ACE-Step 1.5</strong> faz isso de fábrica — e roda no meu MacBook.
  A pergunta continua a mesma. Só a ferramenta mudou.
cards:
  - num: "01"
    title: HeartMula · há 9 meses
    body: Pipeline próprio no Google Cloud. A referência de áudio ainda estava na lista de pendências do modelo base — tive que construí-la.
  - num: "02"
    title: ACE-Step 1.5 · hoje
    body: Canção completa, com voz e letra em português. Referência, remix e treino de LoRA prontos na interface — local, num laptop.
  - num: "03"
    title: O que não mudou
    body: O catálogo. As mesmas 16 músicas, a mesma Chuva. É isso que torna a comparação justa.
---
type: center
eyebrow: Sistema 2 / 3
quote: |
  ACE-Step 1.5.<br /><em>Duas versões.</em>
muted: Um modelo aberto de canções completas, com voz e letra (licença MIT, roda num MacBook M1). Primeiro sem treino nenhum — depois com o meu catálogo.
photo-bg: ./media/ao-bmurals.jpg
photo-bg-alt: AO sentado no chão do B-Murals ao entardecer
photo-bg-style: full
photo-bg-pos: 50% 70%
---
type: pipeline-step
eyebrow: Sistema 2A · só referência
title: A demo, uma referência, uma descrição.
sub: |
  A <strong>demo de Chuva</strong> como fonte, <em>Moments</em> do AO como <strong>referência</strong>,
  a letra em português e uma legenda descrevendo o som.
image: ./media/ace-01-ref.jpg
image-alt: Interface do ACE-Step 1.5 com a demo de Chuva como fonte, Moments como referência, legenda neo-soul e a letra de Chuva
caption: ACE-Step 1.5 · Custom · turbo 2B · MacBook
---
type: media-audio
eyebrow: Sistema 2A · resultado
title: Chuva, sem treino.
sub: O modelo nunca ouviu o meu catálogo — só esta demo e uma música do AO.
sub-tight: true
audio: ./media/chuva-ace-ref.mp3
caption-tag: 2A
caption-text: Chuva · ACE-Step 1.5 · só referência
wave-style: song
wave-gradient: mixed
---
type: center
eyebrow: Sistema 2B
quote: |
  ACE-Step 1.5<br />+ <em>o meu catálogo.</em>
muted: Um LoRA treinado em 16 músicas minhas, numa GPU L4 no Google Cloud.
photo-bg: ./media/ao-mural.jpg
photo-bg-alt: AO de pé diante de um grande mural pintado
photo-bg-style: full
photo-bg-pos: 50% 82%
---
type: bullets
eyebrow: Sistema 2B · o trabalho
heading: Do meu catálogo a um LoRA.
heading-style: display-sm
lede: Um modelo aberto de canções completas, a interface web dele, e as minhas 16 músicas.
bullets:
  - <strong>Instalar</strong> — ACE-Step 1.5 no MacBook, com o backend MLX para Apple Silicon.
  - <strong>Montar o dataset</strong> — as 16 músicas finalizadas do HeartMula — áudio, letra com [Verse]/[Chorus] e uma legenda que começa com a palavra-gatilho <em>bia-style</em>.
  - <strong>Não deixar instrumental</strong> — a opção “All Instrumental” vem ligada; desligada, o modelo aprende também a minha voz e as letras.
  - <strong>Treinar o LoRA</strong> — na aba LoRA Training do próprio ACE-Step — escanear, pré-processar, treinar.
  - <strong>Gerar</strong> — LoRA carregado e <em>bia-style</em> na legenda → neo-soul, em português, com rap.
---
type: pipeline-step
eyebrow: Sistema 2B · o dataset
title: O Dataset Builder do ACE-Step.
sub: |
  Escanear as 16 músicas, conferir letra e legenda, pré-processar, treinar.
  Atenção ao <strong>All Instrumental</strong> — ligado, o LoRA ignoraria as letras e a minha voz.
image: ./media/ace-02-lora.jpg
image-alt: Aba LoRA Training do ACE-Step 1.5, no Dataset Builder, com os campos de dataset e a opção All Instrumental
caption: ACE-Step 1.5 · LoRA Training · Dataset Builder
---
type: media-audio
eyebrow: Sistema 2B · resultado
title: Chuva, com o meu catálogo.
sub: |
  Neo-soul, em português, com rap — o ACE-Step 1.5 com o LoRA <em>bia-style</em>,
  treinado nas minhas 16 músicas.
sub-tight: true
audio: ./media/bia-style-final.mp3
caption-tag: 2B
caption-text: Chuva · ACE-Step 1.5 · LoRA bia-style · 3:30
bg-image: ./media/ao-band-wide.jpg
bg-image-alt: AO tocando ao vivo, banda completa no palco com luzes penduradas acima
wave-style: song
wave-gradient: mixed
---
type: center
eyebrow: Sistema 3 / 3
quote: |
  Suno.<br /><em>A ferramenta de todo mundo.</em>
muted: Sem código, sem treino, sem GPU — um prompt e uma letra.
photo-bg: ./media/ao-band-wide.jpg
photo-bg-alt: AO tocando ao vivo, banda completa no palco
photo-bg-style: full
photo-bg-pos: 50% 45%
---
# TODO: completar com o que você usou no Suno (versão, prompt de estilo, letra, persona/upload de áudio?) e um screenshot → media/suno-01.jpg
type: stack
eyebrow: Sistema 3 · como
heading: Um prompt, uma letra.
lede: O Suno não conhece o meu catálogo. Só sabe o que eu escrevo para ele.
body: |
  [Como gerei esta versão de Chuva no Suno — o prompt de estilo, a letra, quantas tentativas
  até chegar nesta.]
muted: Suno · [versão do modelo]
---
# TODO: exportar a faixa do Suno → media/suno-duet.mp3
type: media-audio
eyebrow: Sistema 3 · ao vivo
title: Um dueto com a máquina.
sub: O Suno toca. Eu canto por cima — <em>agora, aqui.</em>
sub-tight: true
audio: ./media/suno-duet.mp3
caption-tag: Dueto
caption-text: Chuva · Suno + Bianca, ao vivo
wave-style: song
wave-gradient: mixed
photo-bg: ./media/bia-live-bfv.jpg
photo-bg-alt: Bianca cantando ao vivo, cabeça para trás, olhos fechados
photo-bg-style: full
photo-bg-pos: 62% 30%
---
# TODO: completar o card do Suno depois do dueto
type: stack
eyebrow: Lado a lado
heading: Mesma música. Três respostas.
lede: O que cada sistema ouviu em Chuva — e o que deixou para trás.
cards:
  - num: "01"
    title: HeartMula
    body: Bem cativante — mas falta riqueza, nos instrumentos e na voz.
  - num: "02"
    title: ACE-Step
    body: Só com referência, muita intimidade! Mas nada da minha garra. Com o LoRA, erra o timbre exato da minha voz.
  - num: "03"
    title: Suno
    body: "[o que acertou · o que perdeu]"
---
type: center
eyebrow: A sua vez
quote: |
  Qual delas<br />soa mais <em>como eu?</em>
muted: Levantem a mão — 1, 2 ou 3.
---
type: lesson
eyebrow: Lição 03
heading: Voz não é output
lede: Voz é a edição.
body: |
  O modelo produz mil loops convincentes com sabor de Bianca em um minuto.
  Nenhum deles é meu até eu escolher um e jogar fora os outros 999.
callout: Gerar é barato. <em>Curar é o que faz a artista.</em>
photo-bg: ./media/bia-live-garage.jpg
photo-bg-alt: Bianca cantando ao vivo com o AO em Barcelona
photo-bg-style: side
photo-bg-pos: 88% 30%
---
# TODO: rever o callout depois de ouvir os três sistemas — o teto continua o mesmo?
type: lesson
theme: ao
photo: ./media/ao-band-energy.jpg
photo-alt: Bianca se apresentando com o AO, mãos para o alto no meio da música, a banda ao redor
eyebrow: Lição 04
heading: Tem um teto que eu ainda não quebrei.
lede: O modelo pega timbre, clima, até um pouco do fraseado.
body: |
  O que ele ainda não capta é a profundidade melódica e harmônica que o
  <strong>Pablo Puentes</strong>, tecladista do AO, traz para a banda.
  Progressões ricas. A nota que me surpreende. A linha que prepara um
  momento três compassos depois.
callout: |
  Primeira tentativa de atacar isso: troquei o encoder de fala (WavLM) pelo
  <strong>MERT</strong>, treinado em música, e acrescentei um <strong>termo melódico</strong>
  à loss — com peso de só <em>0,1</em>. Ainda é pouco. Aumentar esse número é o próximo experimento.
---
type: center
eyebrow: Parte 2 · Para além da geração
quote: |
  E se a máquina<br />não fizer a música,<br />mas <em>tocar comigo?</em>
---
type: bullets
eyebrow: A luva
heading: Uma luva que entende como eu danço.
heading-style: display-sm
lede: Um instrumento que eu visto. Construído com uma equipe em San Francisco.
bullets:
  - <strong>Sensores</strong> — de movimento e de flexão, mais rastreamento da mão.
  - <strong>Machine learning</strong> — um modelo treinado nos meus gestos de dança, reconhecendo-os em tempo real.
  - <strong>Saída</strong> — cada gesto acende os LEDs da luva e manda MIDI para o som e a luz.
  - <strong>No palco</strong> — a interface vira o cenário — o público vê o modelo reconhecendo cada gesto.
photo-bg: ./media/bia-live-blue.jpg
photo-bg-alt: Bianca ao vivo, mãos estendidas, luz azul
photo-bg-style: side
photo-bg-pos: 62% 35%
---
# TODO: escrever com as suas palavras como é tocar com a luva; vídeo → media/glove-performance.mp4
type: media-video
eyebrow: A luva · ao vivo
title: Como é tocar com o corpo.
sub: |
  [Como é se apresentar com a luva — o que muda na voz, no corpo, na relação com a banda
  e com o público.]
video: ./media/glove-performance.mp4
caption-tag: Ao vivo
caption-text: "[onde · quando]"
layout: split
---
type: media-video
eyebrow: Imagem em tempo real
title: A música pinta a tela.
sub: |
  Um vídeo ao vivo entra, quadro a quadro, e sai transformado pelo
  <strong>Stable Diffusion</strong> numa animação guiada por prompts — em tempo real.
  Já usei em shows ao vivo em Barcelona e em&nbsp;Paris.
youtube: 1joOZe2UyBA
caption-tag: Stable Diffusion
caption-text: VJ Stream Diffusion · Barcelona e Paris
layout: split
---
type: media-video
eyebrow: Taste the&nbsp;music
title: Provar a&nbsp;música.
sub: |
  O gelo conduz eletricidade. Com <strong>Ableton Live</strong> e <strong>Arduino</strong>,
  cada instrumento da música vira um sinal elétrico — a própria forma de onda —
  enviado para dentro do picolé. Você não ouve a música — <em>prova</em> cada&nbsp;instrumento.
youtube: sItFOYjvQEs
portrait: true
caption-tag: Taste the&nbsp;music
caption-text: Music Popsicle · Ableton Live + Arduino
layout: split
---
type: center
eyebrow: A pergunta maior
quote: |
  E se a minha <em>voz</em><br />nunca foi sobre o som,<br />mas sobre o meu <em>gosto musical?</em>
quote-class: serif
photo-bg: ./media/bia-mural.jpg
photo-bg-alt: Bianca diante de um mural colorido em Barcelona
photo-bg-style: full
photo-bg-pos: 50% 28%
---
type: bullets
heading: O que vem por aí para o HeartMula
bullets-class: roomy
bullets:
  - <strong>Ao vivo, em tempo real</strong> — Magenta RealTime 2 num MacBook, tocado pelas minhas teclas e pela luva.
  - <strong>Toolkit aberto</strong> — empacotar o pipeline de treino para o catálogo de outros artistas.
  - <strong>Mais músicas</strong> — o modelo precisa de material novo. Eu também.
  - <strong>Um disco</strong> — coproduzido comigo mesma. Os créditos ficam filosóficos.
  - <strong>Subir a régua melódica</strong> — um peso melódico maior na loss, mais surpresas na progressão de acordes.
---
type: open-source
eyebrow: É open source
pretitle: Faça um fork. Treine no seu catálogo.
url: github.com/bia/bia-music-composer
caption: 📷 &nbsp; Fotografe este slide.
---
type: thank-you
eyebrow: Obrigada
heading: Vamos conversar.
muted: Perguntas, colaborações, o seu próprio catálogo — tudo é bem-vindo.
contact: bianca cheng <span class="bullet">·</span> heartmula <span class="bullet">·</span> get.bianca@gmail.com
qrs:
  - src: ./media/qr-instagram.svg
    label: Instagram
    handle: "@biancachenggg"
  - src: ./media/qr-linkedin.svg
    label: LinkedIn
    handle: in/biancacheng
photo-bg: ./media/ao-pink-wall.jpg
photo-bg-alt: AO diante de um muro rosa
photo-bg-style: full
photo-bg-pos: 50% 62%
---
type: pipeline-step
eyebrow: Processo · 01 / 04
title: A GPU disse não.
sub: Hora após hora de erros de CUDA out-of-memory.
image: ./media/process-01-cuda-oom.jpg
image-alt: VS Code mostrando um erro de CUDA out-of-memory durante o treino
caption: finetune_audio2audio.py · OOM
---
type: pipeline-step
eyebrow: Processo · 02 / 04
title: Treinando, finalmente.
sub: Depois de muito trabalho de bastidor, o modelo começou a aprender.
image: ./media/process-02-training.jpg
image-alt: Logs do GCP Compute Engine enquanto a VM heartmula-train carrega os shards do checkpoint
caption: heartmula-train · GCP Compute
---
type: pipeline-step
eyebrow: Processo · 03 / 04
title: Ensinando português.
sub: WhisperX transcrevendo a letra de Chuva. O modelo precisava saber o que estava ouvindo.
image: ./media/process-03-portuguese.jpg
image-alt: VS Code em pair programming com o Claude no pipeline de anotação do finetune.py
caption: annotate.py · WhisperX
---
type: stack
eyebrow: Um efeito colateral delicioso
heading: O Whisper alucinou.
lede: |
  Dei a ele um trecho puramente instrumental — sem voz nenhuma — e o Whisper-large-v3
  transcreveu, com toda a confiança... uma letra.
audio:
  src: ./media/lyrics_input.wav
  tag: Entrada
  caption: lyrics_input.wav · puramente instrumental
transcript: |
  [Verse]
  E aí E aí Legenda por Fábio Jr Laboratório Fantasma
body: |
  Treinado em milhões de horas de YouTube, o Whisper já viu incontáveis vídeos que começam
  com alguém dizendo <em>"E aí"</em> e terminam com um crédito de legenda.
  Quando não há nada para transcrever, ele recorre a esses clichês — uma espiada
  perfeita no dataset mental do modelo.
---
type: pipeline-step
eyebrow: Processo · 04 / 04
title: Treino concluído.
sub: Primeira execução bem-sucedida. As losses de avaliação caíram onde deviam.
image: ./media/process-04-training-success.jpg
image-alt: Painel do Claude mostrando 'Training completed and successful' com o resumo das épocas de avaliação
caption: v1 · 4 épocas
