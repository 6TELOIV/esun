import Link from "next/link";
import { TextSpinner } from "./_components/text-spinner";
import TradingCardRain from "./_components/trading-card-rain";

const cardRainImages = `bonus-luck.jpg
colossal-dreadmaw.jpg
curse-of-royal.webp
dark-ritual.jpg
dragon.webp
grand-horn-of-heaven.webp
jerma.jpg
legendary-ocean.webp
lightning-bolt.jpg
misty-rainforest.jpg
otto.jpg
pot-of-greed.jpg
prismatic-lens.jpg
protojammer.jpg
sol-ring.jpg
wolf-legacy-key.webp`
  .split("\n")
  .map((c) => `/card-rain/${c}`);

export default function Home() {
  return (
    <>
      <header className="sticky top-0 w-full font-comfortaa h-16 bg-background border-border border-b">
        <div className="h-full container mx-auto px-4 flex items-center">
          <Link href="/" className="font-black text-xl">
            esun
          </Link>
          <nav></nav>
        </div>
      </header>
      <main>
        <section className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-[2fr,3fr] xl:grid-cols-[1fr,2fr] items-center justify-items-center">
          <hgroup className="relative min-h-[calc(100vh-4rem)] lg:min-h-0 w-full h-full flex items-center justify-center lg:bg-primary p-8">
            <TradingCardRain className="lg:hidden" images={cardRainImages} />
            <div className="prose dark:prose-invert lg:prose-invert lg:dark:prose-neutral prose-xl md:prose-2xl prose-h1:mb-0">
              <h1>esun</h1>
              <p>
                <span className="text-muted-foreground">
                  \&apos;e sun\{" "}
                  <a
                    className="no-underline hover:underline text-inherit"
                    href="https://nimi.li/esun"
                    target="_blank"
                  >
                    [Toki Pona]
                  </a>
                  <br />
                  1.
                </span>{" "}
                exchange, trade, barter
                <br />
                <em>
                  esun{" "}
                  <span className="text-muted-foreground">
                    is putting trading back into TCGs.
                  </span>
                </em>
              </p>
            </div>
          </hgroup>
          <div className="relative hidden lg:flex w-full h-full items-center justify-center p-8">
            <TradingCardRain images={cardRainImages} />
            <div className="w-[25ch] prose dark:prose-invert prose-p:my-2 md:prose-p:my-4 xl:prose-p:my-8 text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl">
              <p className="font-light">Complete your</p>
              <p className="font-bold font-comfortaa">
                <TextSpinner
                  games={[
                    "Magic the Gathering",
                    "Yugioh",
                    "Grotto Beasts",
                    "Pokemon",
                    "Weiß Schwarz",
                  ]}
                  items={["Deck", "Playset", "Collection", "Cube"]}
                />
              </p>
              <p className="font-light">with ease</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
