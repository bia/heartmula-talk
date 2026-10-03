# Ensinando a IA a fazer música do meu jeito
# Bianca Cheng — palestra HeartMula · Festival Futuros Possíveis · Casa Firjan
#
# Versão em português (pt-BR). Aberta por index.pt-BR.html.
# Fatos atualizados para bater com o código atual de bia-music-composer
# (MERT no lugar do WavLM, 64 tokens de prefixo, termo melódico na loss, 16 pares).

---
type: hero
photo: ./bianca-singing.png
photo-alt: Bianca Cheng cantando ao vivo com a banda, luzes quentes penduradas acima
eyebrow: Uma palestra em 31 faixas
title: |
  Ensinando a IA<br />a fazer música<br /><em>do meu jeito</em>
meta-left: Bianca Cheng
meta-right: Futuros Possíveis · Casa Firjan
---
type: stack
eyebrow: Quem sou eu?
heading: Bianca Cheng
heading-style: display
lede: Nasci em São Paulo — mãe chinesa, pai italiano.<br />Poliglota em sete idiomas.
body: |
  MIT Media Lab → Apple (onze patentes) → exposições no Ars Electronica e no Met →
  hoje em Barcelona, à frente do <strong>AO</strong>, um quarteto de neo-soul com raízes
  no jazz, no funk, na psicodelia e nas tradições brasileiras e galegas.
muted: Atualmente em algum lugar entre uma cabine de gravação e o VS Code.
cards:
  - num: "01"
    title: Musicista
    body: Compositora e artista. Doze anos de demos, memos de voz, takes de madrugada.
  - num: "02"
    title: Designer
    body: Dou forma a como os produtos são sentidos. Obcecada pela costura entre ferramenta e instrumento.
  - num: "03"
    title: Tecnóloga
    body: Cientista da computação, desenvolvedora de aplicações. Não sou engenheira de ML — as ferramentas de IA preencheram essa lacuna.
---
type: center
eyebrow: A pergunta que começou tudo
quote: |
  Uma máquina<br />consegue aprender<br />a soar <em>como eu?</em>
---
type: bullets
eyebrow: O projeto
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
type: stack
heading: Como funciona de verdade
lede: |
  Não comecei do zero. Fiz um fork do projeto open source de ML do
  <strong>Christian</strong> — feito para <em>educação</em>, não para música — e usei
  como andaime para entender GCP e infraestrutura de treino.
body: |
  Em cima disso, construí um pipeline de fine-tuning em torno da suíte de modelos
  musicais de pesos abertos <strong>HeartMuLa</strong> (Apache 2.0), com um backbone de
  <strong>3 bilhões de parâmetros</strong> adaptado via <strong>LoRA</strong> em pares de áudio.
aside: |
  Um "<strong>modelo de linguagem musical</strong>" é um transformer — a mesma arquitetura
  do GPT — mas prevendo <em>tokens de áudio</em> em vez de texto. O HeartCodec
  discretiza a forma de onda em <strong>12,5 tokens por segundo</strong>; o HeartMuLa-3B
  prevê, de forma autorregressiva, o próximo trecho de som — como o GPT prevê a próxima palavra.
muted: Seis modelos. Um recebe fine-tuning. Cinco etapas de pipeline.
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
type: center
eyebrow: Vamos testar
quote: |
  Numa música<br /><em>minha.</em>
muted: Hora de dar ao modelo uma composição de verdade e ver o que volta.
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
eyebrow: Jornada da composição · 02
title: Usando meu próprio modelo.
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
---
type: lesson
eyebrow: Lição 03
heading: Voz não é output
lede: Voz é a edição.
body: |
  O modelo produz mil loops convincentes com sabor de Bianca em um minuto.
  Nenhum deles é meu até eu escolher um e jogar fora os outros 999.
callout: Gerar é barato. <em>Curar é o que faz a artista.</em>
---
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
eyebrow: A pergunta maior
quote: |
  E se a minha <em>voz</em><br />nunca foi sobre o som,<br />mas sobre o meu <em>gosto musical?</em>
quote-class: serif
---
type: bullets
heading: O que vem por aí para o HeartMula
bullets-class: roomy
bullets:
  - <strong>Performance ao vivo</strong> — levar o modelo ao palco como um terceiro instrumento.
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
