import frogSkip from "@/assets/frog-skip.png";
import loud from "@/assets/loud.png";
import luppusMark from "@/assets/luppus-mark.png";
import magnifier from "@/assets/magnifier.png";
import mutePerson from "@/assets/mute-person.png";
import runner from "@/assets/runner.png";
import turtle from "@/assets/turtle.png";
import walker from "@/assets/walker.png";

type IconProps = { className?: string };

/**
 * Pictogramas rasterizados do player.
 *
 * Adicione os PNGs em `public/pictograms` usando exatamente os nomes abaixo.
 * Como os arquivos são públicos, não é necessário alterar este componente
 * quando os assets finais forem entregues.
 */
const pictograms = {
  turtle,
  walker,
  runner,
  frog: frogSkip,
  car: luppusMark,
  loud,
  mute: mutePerson,
  magnifier,
} as const;

function Pictogram({ name, className }: IconProps & { name: keyof typeof pictograms }) {
  return <img src={pictograms[name]} alt="" aria-hidden="true" className={className} draggable={false} />;
}

export function TurtleIcon(props: IconProps) {
  return <Pictogram name="turtle" {...props} />;
}

export function WalkerIcon(props: IconProps) {
  return <Pictogram name="walker" {...props} />;
}

export function RunnerIcon(props: IconProps) {
  return <Pictogram name="runner" {...props} />;
}

export function FrogIcon(props: IconProps) {
  return <Pictogram name="frog" {...props} />;
}

export function CarIcon(props: IconProps) {
  return <Pictogram name="car" {...props} />;
}

export function LoudIcon(props: IconProps) {
  return <Pictogram name="loud" {...props} />;
}

export function MuteIcon(props: IconProps) {
  return <Pictogram name="mute" {...props} />;
}

export function MagnifierIcon(props: IconProps) {
  return <Pictogram name="magnifier" {...props} />;
}
